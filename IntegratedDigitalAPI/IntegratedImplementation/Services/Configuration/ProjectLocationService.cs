using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Configuration
{
    public class ProjectLocationService : IProjectLocationService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;
        public ProjectLocationService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddProjectLocation(ProjectLocationPostDto projectLocationPost)
        {

            var id = Guid.NewGuid();
        
            ProjectLocation projectLocation = new ProjectLocation
            {
                Id = id,
                Name = projectLocationPost.Name,           
                CreatedById = projectLocationPost.CreatedById,
                CreatedDate = DateTime.Now,
              

            };

            await _dbContext.ProjectLocations.AddAsync(projectLocation);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<ProjectLocationGetDto>> GetProjectLocation()
        {
            var project = await _dbContext.ProjectLocations.AsNoTracking().
                ProjectTo<ProjectLocationGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return project;
        }



        public async Task<ResponseMessage> UpdateProjectLocation(ProjectLocationGetDto projectLocationPut)
        {
            var currentCompanyProfile = await _dbContext.ProjectLocations.FirstOrDefaultAsync(x => x.Id.Equals(projectLocationPut.Id));

           
            if (currentCompanyProfile != null)
               
            {

                currentCompanyProfile.Name = projectLocationPut.Name;
           

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentCompanyProfile, Success = true, Message = "Company Profile Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Company Profile" };
        }

        public async Task<ResponseMessage> DeleteProjectLocation(Guid projectLocationId)
        {

            try
            {
                var currentEmployeeHistory = await _dbContext.ProjectLocations.FindAsync(projectLocationId);

                if (currentEmployeeHistory != null)
                {

                    _dbContext.Remove(currentEmployeeHistory);
                    await _dbContext.SaveChangesAsync();
                    return new ResponseMessage { Message = "Successfully Deleted", Success = true };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find Project Locations!!!" };
            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message =ex.InnerException.Message };
            }
        }

    }
}
