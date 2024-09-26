using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.DTOS.Training;
using IntegratedImplementation.Interfaces.PM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.PM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.PM
{
    public class WeeklyPlanService : IWeeklyPlanService
    {
        private readonly ApplicationDbContext _dbContext;

        public WeeklyPlanService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddWeeklyPlan(WeeklyPlanDto weekplanDto)
        {
            try
            {
                var weeklyPlanDto = new WeeklyReport
                {
                    Id = Guid.NewGuid(),
                    Activity = weekplanDto.Activity,
                    PlaceOfWork = weekplanDto.PlaceOfWork,
                    FromDate = weekplanDto.FromDate,
                    ToDate = weekplanDto.ToDate,
                    EmployeeId = weekplanDto.EmployeeId,

                    CreatedDate = DateTime.Now,

                };

                await _dbContext.WeeklyReports.AddAsync(weeklyPlanDto);
                await _dbContext.SaveChangesAsync();


                return new ResponseMessage
                {
                    Success = true,
                    Message = "Weekly Report Requested Successfully !!!"

                };
            }
            catch (Exception ex)
            {



                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message

                };

            }

        }

        public async Task<List<WeeklyPlanDto>> GetWeeklyPlans(Guid employeeId)
        {


            var weeklyPlans = await _dbContext.WeeklyReports.Include(x => x.Employee)


                .Where(x => x.EmployeeId == employeeId).OrderByDescending(x => x.CreatedDate).Select(x => new WeeklyPlanDto
                {
                    Id = x.Id,
                    Activity = x.Activity,
                    PlaceOfWork = x.PlaceOfWork,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    EmployeeId = x.EmployeeId,
                    EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                    Remark = x.Remark,
                    WeeklyPlanStatus = x.WeeklyPlanStatus.ToString(),
                    ReasonForNotDone = x.ReasonForNotDone,
                    WorkStatus = x.WorkStatus.ToString(),


                }).ToListAsync();

            return weeklyPlans;


        }
        public async Task<List<WeeklyPlanDto>> GetWeeklyPlans()
        {


            var weeklyPlans = await _dbContext.WeeklyReports.Include(x => x.Employee)
                .Where(x => x.WeeklyPlanStatus == WEEKLYPLANSTATUS.APPROVED).OrderByDescending(x => x.CreatedDate)
                .Select(x => new WeeklyPlanDto
                {
                    Id = x.Id,
                    Activity = x.Activity,
                    PlaceOfWork = x.PlaceOfWork,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate,
                    EmployeeId = x.EmployeeId,
                    EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                    Remark = x.Remark,
                    WeeklyPlanStatus = x.WeeklyPlanStatus.ToString(),
                    ReasonForNotDone = x.ReasonForNotDone,
                    WorkStatus = x.WorkStatus.ToString(),


                }).ToListAsync();

            return weeklyPlans;


        }
        public async Task<List<WeeklyPlanDto>> GetWeeklyRequestedPlans()
        {
            var weeklyPlans = await _dbContext.WeeklyReports.Include(x => x.Employee)


              .Where(x => x.WeeklyPlanStatus == WEEKLYPLANSTATUS.REQUESTED).OrderByDescending(x => x.CreatedDate).Select(x => new WeeklyPlanDto
              {
                  Id = x.Id,
                  Activity = x.Activity,
                  PlaceOfWork = x.PlaceOfWork,
                  FromDate = x.FromDate,
                  ToDate = x.ToDate,
                  EmployeeId = x.EmployeeId,
                  EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                  Remark = x.Remark,
                  WeeklyPlanStatus = x.WeeklyPlanStatus.ToString(),
                  ReasonForNotDone = x.ReasonForNotDone,
                  WorkStatus = x.WorkStatus.ToString(),


              }).ToListAsync();

            return weeklyPlans;

        }

        public async Task<ResponseMessage> UpdateStatusWeeklyPlan(string WeeklyPlanStatus, Guid weklyPlanId, string remark)
        {
            var weeklyPlan = await _dbContext.WeeklyReports.FindAsync(weklyPlanId);

            weeklyPlan.WeeklyPlanStatus = Enum.Parse<WEEKLYPLANSTATUS>(WeeklyPlanStatus);
            weeklyPlan.Remark = remark;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Success = true,
                Message = $"Weekly plan status has been {WeeklyPlanStatus}"
            };


        }

        public Task<ResponseMessage> UpdateWorkStatus(string workStatus)
        {
            throw new NotImplementedException();
        }
    }
}
