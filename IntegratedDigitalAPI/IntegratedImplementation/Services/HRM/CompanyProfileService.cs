using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class CompanyProfileService : ICompanyProfileService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;
        public CompanyProfileService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddCompanyProfile(CompanyProfilePostDto companyProfilePost)
        {

            var id = Guid.NewGuid();
            var path = "";

            if (companyProfilePost.ImagePath != null)
                path = _generalConfig.UploadFiles(companyProfilePost.ImagePath, id.ToString(), "CompanyProfile").Result.ToString();

            CompanyProfile profile = new CompanyProfile
            {
                Id = id,
                CompanyName = companyProfilePost.CompanyName,
                PhoneNumber = companyProfilePost.PhoneNumber,
                Email = companyProfilePost.Email,
                Logo = path,
                Address = companyProfilePost.Address,
                CreatedById = companyProfilePost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.CompanyProfiles.AddAsync(profile);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = profile,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<CompanyProfileGetDto> GetCompanyProfile()
        {
            var companyProfile = await _dbContext.CompanyProfiles.AsNoTracking().
                ProjectTo<CompanyProfileGetDto>(_mapper.ConfigurationProvider).FirstOrDefaultAsync();

            return companyProfile;
        }



        public async Task<ResponseMessage> UpdateCompanyProfile(  CompanyProfilePostDto updateCompanyProfile)
        {
            var currentCompanyProfile = await _dbContext.CompanyProfiles.FirstOrDefaultAsync(x => x.Id.Equals(updateCompanyProfile.Id));

            var path = "";

            if (currentCompanyProfile != null)

                if (updateCompanyProfile.ImagePath != null)
                    path = _generalConfig.UploadFiles(updateCompanyProfile.ImagePath, currentCompanyProfile.Id.ToString(), "CompanyProfile").Result.ToString();

            {

                currentCompanyProfile.CompanyName = updateCompanyProfile.CompanyName;
                currentCompanyProfile.Description = updateCompanyProfile.Description;
                currentCompanyProfile.PhoneNumber = updateCompanyProfile.PhoneNumber;
                currentCompanyProfile.Email = updateCompanyProfile.Email;
                currentCompanyProfile.Logo = path;
                currentCompanyProfile.Address = updateCompanyProfile.Address;
                ;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentCompanyProfile, Success = true, Message = "Company Profile Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Company Profile" };
        }
    }
}
