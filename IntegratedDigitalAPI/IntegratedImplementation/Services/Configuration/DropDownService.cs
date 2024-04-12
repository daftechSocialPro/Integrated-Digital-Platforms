using AutoMapper.QueryableExtensions;
using DocumentFormat.OpenXml.Wordprocessing;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.Inventory;
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
            var loanRequestList = await _dbContext.MeasurmentUnits.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = $"{x.Name} ({x.AmharicName})",
            }).ToListAsync();

            return loanRequestList;
        }

        public async Task<List<SelectListDto>> GetEmployeeSelectList()
        {
            var employeesList = await _dbContext.Employees.Where(x => x.EmploymentStatus == EmploymentStatus.ACTIVE).Include(x=>x.EmployeeDetail).ThenInclude(x=>x.Department).AsNoTracking().Select(x => new SelectListDto
            {
                Id=x.Id,
                Name = $"{x.FirstName} {x.MiddleName} {x.LastName}" + (x.EmployeeDetail.OrderByDescending(x => x.CreatedDate).Any() ? x.EmployeeDetail.OrderByDescending(x => x.CreatedDate).FirstOrDefault().Department.DepartmentName : "")
            }).ToListAsync();

            return employeesList;
        }
        public async Task<List<SelectListDto>> GetStrategicPlans()
        {
            var strategicPlans = await _dbContext.StrategicPlans.Where(x=>x.Rowstatus==RowStatus.ACTIVE).OrderBy(x=>x.Name).Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return strategicPlans;
        }
        public async Task<List<SelectListDto>> GetIndicatorsByStrategicPlanId(Guid strategicPlanId)
        {
            var strategicPlanIndicators = await _dbContext.Indicators.Where(x => x.StrategicPlanId == strategicPlanId).Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return strategicPlanIndicators;
        }
        public async Task<List<SelectListDto>> GetProjectFundSources()
        {
            var projectFunds = await _dbContext.ProjectFundSources.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return projectFunds;
        }

        public async Task<List<SelectListDto>> GetProjectDropDowns()
        {
            var projectFunds = await _dbContext.Projects.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = $"{x.ProjectNumber}/{x.ProjectName}"
            }).ToListAsync();

            return projectFunds;
        }

        public async Task<List<SelectListDto>> GetProjectFundSourcesForActivity(Guid projectId)
        {
            var projectFunds = await _dbContext.Project_Funds.Include(x=>x.ProjectSourceFund).Where(x=>x.ProjectId==projectId).AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.ProjectSourceFund.Id,
                Name = x.ProjectSourceFund.Name
            }).ToListAsync();

            return projectFunds;
        }

        public async Task<List<SelectListDto>> GetBenefitDropDowns()
        {
            var strategicPlans = await _dbContext.BenefitLists.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name
            }).ToListAsync();

            return strategicPlans;
        }

        public async Task<List<BankSelectList>> GetBankDropDowns()
        {
            return await _dbContext.BankLists.Select(x => new BankSelectList
                         {
                            Id = x.Id,
                            Name = x.BankName,
                            BankDigit = x.BankDigitNumber  
                         }).ToListAsync();
        }

        public async Task<List<SelectListDto>> GetShiftDropDown()
        {
            var shiftList = await _dbContext.ShiftLists.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.ShiftName
            }).ToListAsync();
            return shiftList;
        }

        public async Task<List<SelectListDto>> GetPurchaseRequestByItem(string itemId)
        {
            var requests = await _dbContext.PurchaseRequestLists.AsNoTracking()
                                 .Where(x => x.ItemId.Equals(Guid.Parse(itemId)))
                                 .Select(x => new SelectListDto
                                 {
                                     Id= x.Id,
                                     Name = x.ItemRequestNo
                                 }).ToListAsync();
            return requests;
        }

        public async Task<List<SelectListDto>> GetPurchaseRequestByDropDown()
        {
            var requests = await _dbContext.PurchaseRequestLists.AsNoTracking()
                                 
                                 .Select(x => new SelectListDto
                                 {
                                     Id = x.Id,
                                     Name = x.ItemRequestNo
                                 }).ToListAsync();
            return requests;
        }

        public async Task<List<SelectListDto>> GetStoreRequestDropDown()
        {
            var requests = await _dbContext.StoreRequests.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.StoreRequestNumber
            }).ToListAsync();
            return requests;
        }

        public async Task<List<SelectListDto>> GetVendorDropDown()
        {
            var vendors = await _dbContext.Vendors.AsNoTracking()
                .Select(x => new SelectListDto
                {
                    Id = x.Id,
                    Name = x.Name
                }).ToListAsync();
            return vendors;
        }

        public async Task<List<SelectListDto>> GetVendorDropDownByrequestId(Guid purchaseRequestId)
        {
            var vendors = await _dbContext.PerformaDetails.Where(x => x.PurchaseRequestListId == purchaseRequestId).Include(x => x.Vendor).AsNoTracking()
                .Select(x => new SelectListDto
                {
                    Id = x.Vendor.Id,
                    Name = x.Vendor.Name
                }).ToListAsync();
            return vendors;
        }

        public async Task<List<SelectListDto>> GetFiscalYears()
        {

            var fiscalYears = await _dbContext.BudgetYears.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = $"{x.Year.ToString()} ({x.Rowstatus.ToString()})"
            }).ToListAsync();

            return fiscalYears;
        }
        public async Task<List<SelectListDto>> GetMeasurementListByType(MeasurementType measurementType)
        {
            var measurements = await _dbContext.MeasurmentUnits.AsNoTracking()
                                       .Where(x => x.MeasurementType.Equals(measurementType))
                                       .Select(x => new SelectListDto
                                       {
                                           Id = x.Id,
                                           Name = x.Name,
                                       }).ToListAsync();
            return measurements;
        }

        public async Task<List<ItemDropDownDto>> GetItemDropDown()
        {
            var items = await _dbContext.Items.Include(x => x.Category).AsNoTracking()
                       .Include(x => x.Category).
                       Select(x => new ItemDropDownDto
                       {
                           Id = x.Id,
                           IsExpirable = x.IsExpirable,
                           MeasurementType = (int)x.MeasurementType,
                           Name = x.Name,
                           IsAsset = x.Category.CategoryType == CategoryType.ASSET ? true: false,
                       }).ToListAsync();
            return items;
        }

        public async Task<List<ItemDropDownDto>> GetItemByRequest(string StoreRequestId)
        {
            var items = await _dbContext.StoreRequestLists.Include(x => x.Item.Category).Include(x => x.StoreRequest).AsNoTracking()
                       .Where(x => x.StoreRequestId == Guid.Parse(StoreRequestId)).
                       Select(x => new ItemDropDownDto
                       {
                           Id = x.ItemId,
                           IsExpirable = x.Item.IsExpirable,
                           IsAsset = x.Item.Category.CategoryType == CategoryType.ASSET ? true : false,
                           MeasurementType = (int)x.Item.MeasurementType,
                           Name = x.Item.Name
                       }).ToListAsync();
            return items;
        }

        public async Task<List<SelectListDto>> GetAccountTypeDropDown()
        {

            var accountTypesSelectList = await _dbContext.AccountTypes.AsNoTracking().Select(x => new SelectListDto
            {
                Name = x.Type,
                Id = x.Id,
            }).ToListAsync();
            return accountTypesSelectList;
        }

        public async Task<List<SelectListDto>> GetAccountingPeriodDropDown()
        {
            var accountingPeriodSelectList = await _dbContext.PeriodDetails.Include(x => x.AccountingPeriod)
                .Where(x => x.AccountingPeriod.Rowstatus == RowStatus.ACTIVE).AsNoTracking().OrderBy(x => x.PeriodNo).Select(x => new SelectListDto
            {
                Name = $"{x.PeriodNo} ({x.PeriodStart.ToString("dd/MM/yyyy")} - {x.PeriodEnd.ToString("dd/MM/yyyy")})",
                Id = x.Id,
            }).ToListAsync();
            return accountingPeriodSelectList;
        }

        public async Task<List<SelectListDto>> GetChartOfAccountsDropDown()
        {
            var chartOfAccountsList = await _dbContext.ChartOfAccounts.Where(x => x.Rowstatus == RowStatus.ACTIVE).AsNoTracking().Select(x => new SelectListDto
            {
                Name =$"{x.Description} ({x.AccountNo})" ,
                Id = x.Id

            }).ToListAsync();
            return chartOfAccountsList;
        }

        public async Task<List<SelectListDto>> GetTrainingList()
        {
            var trainingList = await _dbContext.Trainings.AsNoTracking().Select(x => new SelectListDto
            {
                Name = x.Title,
                Id = x.Id

            }).ToListAsync();
            return trainingList;
        }

    }
}
