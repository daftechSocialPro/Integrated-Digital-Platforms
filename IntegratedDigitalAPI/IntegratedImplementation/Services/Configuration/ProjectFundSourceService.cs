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
    public class ProjectFundSourceService : IProjectFundSourceService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;
        public ProjectFundSourceService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddProjectFundSource(ProjectFundSourcePostDto projectFundSourcePost)
        {

            var id = Guid.NewGuid();
        
            ProjectFundSource projectFundSource = new ProjectFundSource
            {
                Id = id,
                Name = projectFundSourcePost.Name,           
                CreatedById = projectFundSourcePost.CreatedById,
                CreatedDate = DateTime.Now,
              

            };

            await _dbContext.ProjectFundSources.AddAsync(projectFundSource);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<ProjectFundSourceGetDto>> GetProjectFundSource()
        {
            var project = await _dbContext.ProjectFundSources.AsNoTracking().
                ProjectTo<ProjectFundSourceGetDto>(_mapper.ConfigurationProvider).ToListAsync();

            return project;
        }



        public async Task<ResponseMessage> UpdateProjectFundSource(ProjectFundSourceGetDto projectFundSourcePut)
        {
            var currentCompanyProfile = await _dbContext.ProjectFundSources.FirstOrDefaultAsync(x => x.Id.Equals(projectFundSourcePut.Id));

           
            if (currentCompanyProfile != null)
               
            {

                currentCompanyProfile.Name = projectFundSourcePut.Name;
           

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentCompanyProfile, Success = true, Message = "Company Profile Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Project Fund Source" };
        }

        public async Task<ResponseMessage> DeleteProjectFundSource(Guid projectFundSourceId)
        {

            try
            {
                var currentEmployeeHistory = await _dbContext.ProjectFundSources.FindAsync(projectFundSourceId);

                if (currentEmployeeHistory != null)
                {

                    _dbContext.Remove(currentEmployeeHistory);
                    await _dbContext.SaveChangesAsync();
                    return new ResponseMessage { Message = "Successfully Deleted", Success = true };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find Project Fund Source!!!" };
            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message =ex.InnerException.Message };
            }
        }

    }
}
