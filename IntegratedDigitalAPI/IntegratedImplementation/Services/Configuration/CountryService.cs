using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.Configuration
{
    public class CountryService: ICountryService
    {
        private readonly ApplicationDbContext _dbContext;

        public CountryService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<SelectListDto>> GetCountryDropdownList()
        {
            var countryList = await _dbContext.Countries.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.CountryName,
            }).ToListAsync();

            return countryList;
        }

    }
}
