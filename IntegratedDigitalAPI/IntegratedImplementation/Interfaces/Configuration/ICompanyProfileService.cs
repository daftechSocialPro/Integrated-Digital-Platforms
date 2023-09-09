using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface ICompanyProfileService
    {
        Task<CompanyProfileGetDto> GetCompanyProfile();
        Task<ResponseMessage> AddCompanyProfile(CompanyProfilePostDto companyProfilePost);
        Task<ResponseMessage> UpdateCompanyProfile(CompanyProfilePostDto companyProfilePost);
    }
}
