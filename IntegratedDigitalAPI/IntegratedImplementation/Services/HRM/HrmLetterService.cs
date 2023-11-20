using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.HRM
{
    public class HrmLetterService : IHrmLetterService
    {
        private readonly ApplicationDbContext _dbContext;
        public HrmLetterService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ContractLetterDto> GetContractLetter(string historyId)
        {
            var employmentDetail = await _dbContext.EmploymentDetails
                                         .AsNoTracking().Include(x => x.Position)
                                         .Include(x => x.Employee.Zone.Region)
                                        .FirstOrDefaultAsync(x => x.Id == Guid.Parse(historyId) && x.Rowstatus == EnumList.RowStatus.ACTIVE);

            var companyName = await _dbContext.CompanyProfiles.FirstOrDefaultAsync(x => x.Rowstatus == EnumList.RowStatus.ACTIVE);

            if(companyName  == null)
                return new ContractLetterDto();

            if (employmentDetail == null)
                return new ContractLetterDto();

            var imediateSupervisor = await _dbContext.EmployeeSupervisors.Include(x => x.Supervisor).FirstOrDefaultAsync(x => x.EmployeeId == employmentDetail.EmployeeId);
         

            var currentContract = new ContractLetterDto
            {
                ContractStartDate = employmentDetail.StartDate,
                ContractEndDate = employmentDetail.EndDate,
                EmployeeAddress = employmentDetail.Employee.Zone.ZoneName,
                EmployeeName = $"{employmentDetail.Employee.FirstName} {employmentDetail.Employee.MiddleName} {employmentDetail.Employee.LastName}",
                GrossSalary = employmentDetail.Salary,
                EmployeerAddress = companyName.Address,
                EmployerName = companyName.CompanyName,
                GrossSalaryInWord = NumberExtensions.toWords(employmentDetail.Salary),
                JobTitle = employmentDetail.Position.PositionName,
                PhoneNumber = employmentDetail.Employee.PhoneNumber,
                PlaceOfWork = "",
                ReportingTo = imediateSupervisor != null ? $"{imediateSupervisor.Supervisor.FirstName} {imediateSupervisor.Supervisor.MiddleName} {imediateSupervisor.Supervisor.LastName}" : " ",
                SourceOfFund = "",
                TypeOfEmployement = employmentDetail.Employee.EmploymentType.ToString()
            };

            return currentContract;
        }
    }
}
