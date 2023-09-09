using AutoMapper;
using AutoMapper.QueryableExtensions;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.Configuration
{
    public class GeneralConfigService :IGeneralConfigService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;

        public GeneralConfigService(ApplicationDbContext dbContext, IMapper mapper)
        {
            _dbContext = dbContext;
            _mapper = mapper;
        }

        public async Task<string> GenerateCode(EnumList.GeneralCodeType GeneralCodeType)
        {
            var curentCode = await _dbContext.GeneralCodes.FirstOrDefaultAsync(x => x.GeneralCodeType == GeneralCodeType);
            if (curentCode != null)
            {
                var generatedCode = $"{curentCode.InitialName}-{curentCode.CurrentNumber.ToString().PadLeft(curentCode.Pad, '0')}";

                curentCode.CurrentNumber += 1;
                await _dbContext.SaveChangesAsync();
                return generatedCode;
            }
            return "";
        }

        public async Task<string> GetFiles(string path)
        {
            byte[] imageArray = await File.ReadAllBytesAsync(path);
            string imageRepresentation = Convert.ToBase64String(imageArray);
            return imageRepresentation.ToString();
        }

        public async Task<string> UploadFiles(IFormFile formFile, string Name, string FolderName)
        {
            var path = Path.Combine("wwwroot", FolderName);
            string pathToSave = Path.Combine(Directory.GetCurrentDirectory(), path);

            if (!Directory.Exists(pathToSave))
                Directory.CreateDirectory(pathToSave);

            if (formFile != null && formFile.Length > 0)
            {
                try
                {
                    string fileExtension = Path.GetExtension(formFile.FileName);
                    string fileName = $"{Name}{fileExtension}";
                    string filePath = Path.Combine(pathToSave, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await formFile.CopyToAsync(stream);
                    }

                    var newPath = Path.Combine(path, fileName);
                    return newPath;
                }
                catch (Exception ex)
                {
                    return ex.Message;
                }
            }

            return "";
        }

<<<<<<< HEAD
=======

        public async Task<List<GeneralCodeDto>> GetGeneralCodes()
        {
            var generalCodeList = await _dbContext.GeneralCodes.AsNoTracking()
                                  .ProjectTo<GeneralCodeDto>(_mapper.ConfigurationProvider)
                                  .ToListAsync();
            return generalCodeList;
        }


>>>>>>> 3f9f6872278de2b8d79a23c218404562d3cfea9f
    }
}
