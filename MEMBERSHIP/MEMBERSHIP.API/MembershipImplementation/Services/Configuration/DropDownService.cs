using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Interfaces.Configuration;
using MembershipInfrustructure.Data;
using MembershipInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipImplementation.Services.Configuration
{
    public class DropDownService : IDropDownService
    {
        private readonly ApplicationDbContext _dbContext;

        public DropDownService(ApplicationDbContext dbContext)
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

        public async Task<List<SelectListDto>> GetRegionDropdownList(string countryType)
        {
            var countryTypee = Enum.Parse<CountryType>(countryType);
            var regionList = await _dbContext.Regions.Where(x => x.CountryType == countryTypee).AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.RegionName,
            }).ToListAsync();

            return regionList;
        }

        public async Task<List<SelectListDto>> GetZoneDropdownList(Guid regionID)
        {
            var ZoneList = await _dbContext.Zones.Where(x => x.RegionId == regionID).AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.ZoneName,

            }).ToListAsync();

            return ZoneList;
        }
        public async Task<List<SelectListDto>> GetEducationalFieldDropDown()
        {
            var EducationalFieldList = await _dbContext.EducationalFields.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.EducationalFieldName
            }).ToListAsync();
            return EducationalFieldList;
        }

        public async Task<List<SelectListDto>> GetEducationalLevelDropDown()
        {
            var EducationalFieldList = await _dbContext.EducationalLevels.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.EducationalLevelName
            }).ToListAsync();
            return EducationalFieldList;
        }


        public async Task<List<SelectListDto>> GetMembershipTypesDropDown(string category)
        {
            var categorry = Enum.Parse<MembershipCategory>(category);
            var membershipTypes = await _dbContext.MembershipTypes.Where(x=>x.MembershipCategory==categorry).AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = $"{x.Name} {x.Money}{x.Currency}/{x.Years}YEAR",
                Amount =x.Money

            }).ToListAsync();
            return membershipTypes;
        }

    }
}
