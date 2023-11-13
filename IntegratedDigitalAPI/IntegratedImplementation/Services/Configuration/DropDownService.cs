using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Configuration
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

        public async Task<List<SelectListDto>> GetRegionDropdownList(Guid countryId)
        {
            var regionList = await _dbContext.Regions.Where(x => x.CountryId == countryId).AsNoTracking().Select(x => new SelectListDto
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

        public async Task<List<SelectListDto>> GetDepartmentDropdownList()
        {
            var departmentList = await _dbContext.Departments.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.DepartmentName,
            }).ToListAsync();

            return departmentList;
        }

        public async Task<List<SelectListDto>> GetPositionDropdownList()
        {
            var positionList = await _dbContext.Positions.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.PositionName,
            }).ToListAsync();

            return positionList;
        }
        public async Task<List<SelectListDto>> GetLeaveTypeDropdownList()
        {
            var LeaveTypeList = await _dbContext.LeaveTypes.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name,
            }).ToListAsync();

            return LeaveTypeList;
        }

        public async Task<List<SelectListDto>> GetGeneralHRMSettingList()
        {

            List<string> enumValues = Enum.GetNames(typeof(GeneralHrmSetting)).ToList();

            var HRMSettingList = await _dbContext.HrmSettings.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.GeneralSetting.ToString(),
            }).ToListAsync();

            

            foreach (string en in enumValues)
            {


                if (HRMSettingList.Any(x => x.Name==en))
                {
                   HRMSettingList.RemoveAll(x=>x.Name==en);
                }
                else
                {
                    HRMSettingList.Add(new SelectListDto
                    {
                        Name=en,
                    });
                }

            }

                return HRMSettingList ;
        }

        public async Task<List<SelectListDto>> GetLoanTypeDropDown()
        {
            var loanRequestList = await _dbContext.LoanSettings.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.LoanName,
            }).ToListAsync();

            return loanRequestList;
        }

        public async Task<List<SelectListDto>> GetUnitofMeasurment()
        {
            var loanRequestList = await _dbContext.UnitOfMeasurment.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = $"{x.Name} ({x.LocalName})",
            }).ToListAsync();

            return loanRequestList;
        }

        public async Task<List<SelectListDto>> GetEmployeeSelectList()
        {
            var employeesList = await _dbContext.Employees.Include(x=>x.EmployeeDetail).ThenInclude(x=>x.Department).AsNoTracking().Select(x => new SelectListDto
            {
                Id=x.Id,
                Name = $"{x.FirstName} {x.MiddleName} {x.LastName}" + (x.EmployeeDetail.OrderByDescending(x => x.CreatedDate).Any() ? x.EmployeeDetail.OrderByDescending(x => x.CreatedDate).FirstOrDefault().Department.DepartmentName : "")
            }).ToListAsync();

            return employeesList;
        }
        public async Task<List<SelectListDto>> GetStrategicPlans()
        {
            var strategicPlans = await _dbContext.StrategicPlans.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return strategicPlans;
        }
        public async Task<List<SelectListDto>> GetProjectFundSources()
        {
            var strategicPlans = await _dbContext.ProjectFundSources.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return strategicPlans;
        }

        


    }
}
