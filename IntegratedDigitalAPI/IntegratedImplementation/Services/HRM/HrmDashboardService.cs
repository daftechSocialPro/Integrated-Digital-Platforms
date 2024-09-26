using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;

namespace IntegratedImplementation.Services.HRM
{
    public class HrmDashboardService : IHrmDashboardService
    {
        private readonly ApplicationDbContext _dbContext;
        public HrmDashboardService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<HrmDashboardDto> GetHrmDashboard()
        {
            HrmDashboardDto dashboardData = new HrmDashboardDto();
            var today = DateTime.Now;

            var employees = await _dbContext.Employees.AsNoTracking().ToListAsync();

            var activeEmployees = employees.Where(x => x.EmploymentStatus == EnumList.EmploymentStatus.ACTIVE).Count();
            var terminatedEmployees = employees.Where(x => x.EmploymentStatus == EnumList.EmploymentStatus.TERMINATED).Count();
            var resignedEmployees = employees.Where(x => x.EmploymentStatus == EnumList.EmploymentStatus.RESIGNED).Count();
            var maleEmployees = employees.Where(x => x.Gender == EnumList.Gender.MALE).Count();
            var femaleEmployees = employees.Where(x => x.Gender == EnumList.Gender.FEMALE).Count();

            var activeVacancies = await _dbContext.VacancyLists.Where(x => x.VaccancyStartDate.Date <= today.Date && x.VaccancyEndDate.Date >= today.Date).ToListAsync();

            var activeVacanciesCount = activeVacancies.Count();
            var applicantsCount = 0;
            foreach (var vac in activeVacancies)
            {
                var applicants = await _dbContext.ApplicantVacancies.Where(x => x.VacancyId == vac.Id).CountAsync();
                applicantsCount += applicants;
            }

            var tentoday = today.AddDays(-10);
            var aboutToBeTerminatedEmployees = employees.Where(x => x.EmploymentStatus == EnumList.EmploymentStatus.ACTIVE && (x.ContractEndDate >= tentoday && x.ContractEndDate <= today))
                .Select(x => new soonTerminateDto
                {
                    EmployeeName = $"{x.FirstName} {x.MiddleName} {x.LastName}",
                    EmploymentDate = x.EmploymentDate,
                    EmploymentType = x.EmploymentType.ToString(),
                    RemainingDays = x.ContractEndDate.HasValue
                                    ? x.ContractEndDate.Value.Subtract(tentoday).Days
                                    : 0

                }).ToList();

            dashboardData.ActiveEmployees = activeEmployees;
            dashboardData.TerminatedEmployees = terminatedEmployees;
            dashboardData.ResignedEmployees = resignedEmployees;
            dashboardData.MaleEmployees = maleEmployees;
            dashboardData.FemaleEmployees = femaleEmployees;
            dashboardData.ActiveVacancies = activeVacanciesCount;
            dashboardData.Applicants = applicantsCount;
            dashboardData.soonTerminate = aboutToBeTerminatedEmployees;

            return dashboardData;
        }
    }
}
