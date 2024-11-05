using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployeePerformanceService: IEmployeePerformanceService
    {
        private readonly ApplicationDbContext _dbContext;
        public EmployeePerformanceService(ApplicationDbContext dbContext) 
        {
            _dbContext = dbContext;
        }

   

        public async Task<ResponseMessage> GetPerformanceTime()
        {
            var performanceSetting = await _dbContext.PerformanceSettings.FirstOrDefaultAsync(x => x.PerformanceIndex == DateTime.Now.Month);
            if (performanceSetting == null)
            {
                return new ResponseMessage { Success = false, Message = "Please set Performance Setting" };
            }

            int TodayDate = DateTime.Now.Day;

            if (TodayDate >= performanceSetting.PerformanceStartDate && TodayDate <= performanceSetting.PerformanceEndDate)
            {
                return new ResponseMessage { Success = true, Data = DateTime.Now.ToString("MMMM, yyyy"), Message = "Success" };
            }

            return new ResponseMessage { Success = false, Message = "Please note that the current month is unavailable for filling employee performance evaluations" };
        }


        public async Task<List<SelectListDto>> GetToBeFilledEmployees(Guid employeeId)
        {
            return await _dbContext.EmployeeSupervisors.Where(x => x.SupervisorId == employeeId).
                          Select(x => new SelectListDto
                          {
                              Id = x.Id,
                              Name = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}"
                          }).ToListAsync();
        }

        public async Task<EmploeePerformanceDto> GetEmployeePerformance(Guid employeeId, int monthIndex)
        {
            var currentPerformance = await _dbContext.EmployeePerformances.Include(x => x.Supervisor).Include(x => x.SecondSupervisor)
                                            .Where(x => x.EmployeeId == employeeId && x.MonthIndex == monthIndex && x.CreatedDate.Year == DateTime.Now.Year)
                                            .Select(y => new EmploeePerformanceDto
                                            {
                                                ApprovedBySecondSupervisor = y.SecondSupervisor == null ? false: true ,
                                                ApproverEmployee = y.Supervisor == null ? "" : $"{y.Supervisor.FirstName} {y.Supervisor.MiddleName} {y.Supervisor.LastName}",
                                            }).FirstOrDefaultAsync();
            if (currentPerformance != null)
                return currentPerformance;

            return new EmploeePerformanceDto();
        }

        public async Task<ResponseMessage> StartEvaluation(Guid employeeId, int monthIndex, string createdById)
        {
            //var currentPerformance = await _dbContext.EmployeePerformances.Include(x => x.Approver)
            //                                .FirstOrDefaultAsync(x => x.EmployeeId == employeeId && x.MonthIndex == monthIndex && x.CreatedDate.Year == DateTime.Now.Year);
            //if (currentPerformance != null)
            //    return new ResponseMessage {Success = false, Message = "Performance Already Exists"};

            //EmployeePerformance performance = new EmployeePerformance()
            //{
            //    Id = Guid.NewGuid(),
            //    CreatedById = createdById,
            //    CreatedDate = DateTime.Now,
            //    EmployeeId = employeeId,
            //    IndividualDevt = PerformanceStatus.PENDING,
            //    PlanStatus = PerformanceStatus.PENDING,
            //    RequiredSupport = PerformanceStatus.PENDING,
            //    ApprovedBySecondSupervisor = false,
            //    MonthIndex = monthIndex,
            //    Rowstatus = RowStatus.ACTIVE,
            //};

            //await _dbContext.EmployeePerformances.AddAsync(performance);
            //await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully", Data = null };
        }

        public async Task<List<EmployeePerformancePlanDto>> EmployeePerformancePlan(Guid performanceId)
        {
            //var performancePlans = await _dbContext.PerformancePlans.Select(x => new EmployeePerformancePlanDto
            //{
            //    PlanId = x.Id,
            //    Target = x.TotalTarget,
            //    PerfomancePlan = x.Name
            //}).ToListAsync();

            //foreach(var items in performancePlans)
            //{
            //    List<EmployeePerformancePlanDetailDto> planDetails = new List<EmployeePerformancePlanDetailDto>();
            //    var performanceDetails = await _dbContext.PerformancePlanDetails.Where(X => X.PerformancePlanId == items.PlanId).ToListAsync();

            //    foreach(var details in performanceDetails)
            //    {
            //        var employee = await _dbContext.EmployeePerformancePlans.Where(x => x.EmployeePerformanceId == performanceId).FirstOrDefaultAsync();


            //        if(employee == null)
            //        {
            //            planDetails.Add(new EmployeePerformancePlanDetailDto 
            //                            {
            //                                PerformacePlan = details.Name,
            //                                PlanDetailId = details.Id,
            //                                Target = details.Target
            //                            });
            //        }
            //        else
            //        {
            //            planDetails.Add(new EmployeePerformancePlanDetailDto
            //            {
            //                PerformacePlan = details.Name,
            //                PlanDetailId = details.Id,
            //                Target = details.Target,
            //                PerformanceIndicators = employee.GivenValue,
            //                Timing = employee.Timing
            //            });
            //        }
            //    }

            //    items.PerfomanceDetail = planDetails;
            //    items.PerformanceIndicators = planDetails.Sum(x => x.PerformanceIndicators);
            //}

            // return performancePlans;
            return new List<EmployeePerformancePlanDto>();
        }
    }
}
