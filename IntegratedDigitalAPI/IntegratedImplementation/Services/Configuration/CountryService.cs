using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Configuration
{
    public class CountryService: ICountryService
    {
        private readonly ApplicationDbContext _dbContext;

        public CountryService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<ResponseMessage> AddCountry(CountryPostDto countryPost)
        {
            Country country  = new Country
            {
                Id = Guid.NewGuid(),                
                CountryName = countryPost.CountryName,
                CountryCode = countryPost.CountryCode,
                Nationality = countryPost.Nationality,
                CreatedById = countryPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.Countries.AddAsync(country);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = country,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<CountryGetDto>> GetCountryList ()
        {
            var countryList = await _dbContext.Countries.AsNoTracking().Select(x => new CountryGetDto
            {
                Id = x.Id,
                CountryName = x.CountryName,
                CountryCode = x.CountryCode,
                Nationality= x.Nationality,
            }).ToListAsync();

            return countryList;
        }

        public async Task<ResponseMessage> UpdateCountry (CountryGetDto countryPost)
        {
            var currentCountry = await _dbContext.Countries.FirstOrDefaultAsync(x => x.Id== countryPost.Id);

            if (currentCountry != null)
            {
                currentCountry.CountryName = countryPost.CountryName;
                currentCountry.CountryCode = countryPost.CountryCode;
                currentCountry.Nationality = countryPost.Nationality;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentCountry, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Country" };
        }

    }
}
