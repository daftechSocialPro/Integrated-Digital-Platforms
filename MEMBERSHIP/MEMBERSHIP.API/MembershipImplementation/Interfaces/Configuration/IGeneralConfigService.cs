using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipImplementation.Interfaces.Configuration
{
    public interface IGeneralConfigService
    {
        Task<string> GenerateCode(GeneralCodeType GeneralCodeType, string memberType);
        Task<string> UploadFiles(IFormFile formFile, string Name, string FolderName);
        Task<string> GetFiles(string path);
    }
}
