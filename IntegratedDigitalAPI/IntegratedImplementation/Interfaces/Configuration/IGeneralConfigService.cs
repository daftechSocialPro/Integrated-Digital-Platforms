using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using IntegratedImplementation.DTOS.Configuration;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IGeneralConfigService
    {
        Task<string> GenerateCode(GeneralCodeType GeneralCodeType);
        Task<string> UploadFiles(IFormFile formFile, string Name, string FolderName);
        Task<string> GetFiles(string path);
        Task<List<GeneralCodeDto>> GetGeneralCodes ();
        string GeneratePassword();
        string GenerateBarcodeAsFormFileAsync(string content,string barcodeContent);
    }
}
