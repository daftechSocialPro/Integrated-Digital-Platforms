using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.PM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.PM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.PM
{
    public class StrategicPlanService:IStrategicPlanService
    {
        private readonly ApplicationDbContext _dbContext;

        public StrategicPlanService (ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddStrategicPlan(StrategicPlanPostDto strategicPlansPost)
        {
            // Validate that StrategicPeriod exists
            var strategicPeriod = await _dbContext.StrategicPeriods.FirstOrDefaultAsync(x => x.Id == strategicPlansPost.StrategicPeriodId);
            if (strategicPeriod == null)
            {
                return new ResponseMessage
                {
                    Message = "Strategic Period not found",
                    Success = false
                };
            }

            StrategicPlan strategicPlan = new StrategicPlan
            {
                Id = Guid.NewGuid(),
                Name = strategicPlansPost.Name,
                Description = strategicPlansPost.Description,
                StrategicPeriodId = strategicPlansPost.StrategicPeriodId,
                CreatedById = strategicPlansPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.StrategicPlans.AddAsync(strategicPlan);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<StrategicPlanGetDto>> GetStrategicPlanList()
        {
            var departmentList = await _dbContext.StrategicPlans
                .Include(x => x.StrategicPeriod)
                .AsNoTracking()
                .OrderBy(x=>x.Name)
                .Select(x => new StrategicPlanGetDto
                {
                    Id = x.Id,
                    Name = x.Name,
                    Description = x.Description,
                    StrategicPeriodId = x.StrategicPeriodId,
                    StrategicPeriodName = x.StrategicPeriod.Name,
                    RowStatus = x.Rowstatus== RowStatus.ACTIVE?true:false,
                }).ToListAsync();

            return departmentList;
        }

        public async Task<ResponseMessage> UpdateStrategicPlan(StrategicPlanGetDto strategicPlansGet)
        {
            var currentStrategicPlan = await _dbContext.StrategicPlans.FirstOrDefaultAsync(x => x.Id.Equals(strategicPlansGet.Id));

            if (currentStrategicPlan != null)
            {
                // Validate that StrategicPeriod exists
                var strategicPeriod = await _dbContext.StrategicPeriods.FirstOrDefaultAsync(x => x.Id == strategicPlansGet.StrategicPeriodId);
                if (strategicPeriod == null)
                {
                    return new ResponseMessage { Success = false, Message = "Strategic Period not found" };
                }

                currentStrategicPlan.Name = strategicPlansGet.Name;
                currentStrategicPlan.Description = strategicPlansGet.Description;
                currentStrategicPlan.StrategicPeriodId = strategicPlansGet.StrategicPeriodId;
                currentStrategicPlan.Rowstatus = strategicPlansGet.RowStatus? RowStatus.ACTIVE :RowStatus.INACTIVE;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentStrategicPlan, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Strategic Plan" };
        }

        public async Task<List<ActivityGroup>> GetStrategicPlanReport(Guid strategicPlanId)
        {
            var activityViewDtos = await _dbContext.Activities
                .Where(x => x.StrategicPlanId == strategicPlanId)
                .Include(x => x.ActivityParent.Task.Project)
                .Include(x => x.Task.Project)
                .Include(x => x.ActivityLocations).ThenInclude(x => x.Region)
                .Include(x => x.ProjectSourceFund)
                .OrderBy(x => x.CreatedDate)
                .Select(e => new ActivityViewDto
                {
                    Id = e.Id,
                    Name = e.ActivityDescription,
                    PlannedBudget = e.PlanedBudget,
                    ActivityType = e.ActivityType.ToString(),
                    IsTraining = e.IsTraining,
                    TaskName = e.TaskId != null ? e.Task.TaskDescription : e.ActivityParent.Task.TaskDescription,
                    ProjectName = e.TaskId != null ? e.Task.Project.ProjectName : e.ActivityParent.Task.Project.ProjectName,
                    ActivityNumber = e.ActivityNumber,
                    Begining = e.Begining,
                    Target = e.Goal,
                    UnitOfMeasurment = e.Indicator,
                    OverAllPerformance = 0,
                    StartDate = e.ShouldStat.ToString(),
                    ProjectSource = e.ProjectSourceFund.Name,
                    EndDate = e.ShouldEnd.ToString(),
                    Members = e.ProjectTeamId == null
                        ? _dbContext.EmployeesAssignedForActivities
                            .Include(x => x.Employee)
                            .Where(x => x.ActivityId == e.Id)
                            .Select(y => new SelectListDto
                            {
                                Id = y.Employee.Id,
                                Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                Photo = y.Employee.ImagePath,
                                EmployeeId = y.EmployeeId.ToString(),
                            }).ToList()
                        : _dbContext.ProjectTeamEmployees
                            .Where(x => x.ProjectTeamId == e.ProjectTeamId)
                            .Include(x => x.Employee)
                            .Select(y => new SelectListDto
                            {
                                Id = y.Employee.Id,
                                Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                Photo = y.Employee.ImagePath,
                                EmployeeId = y.EmployeeId.ToString(),
                            }).ToList(),
                    MonthPerformance = _dbContext.ActivityTargetDivisions
                        .Where(x => x.ActivityId == e.Id)
                        .OrderBy(x => x.Order)
                        .Select(y => new MonthPerformanceViewDto
                        {
                            Id = y.Id,
                            Order = y.Order,
                            Planned = y.Target,
                            Actual = _dbContext.ActivityProgresses
                                .Where(x => x.QuarterId == y.Id)
                                .Sum(x => x.ActualWorked),
                            PlannedBudget = y.TargetBudget,
                            Percentage = y.Target != 0 ?
                                (float)(_dbContext.ActivityProgresses
                                    .Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED)
                                    .Sum(x => x.ActualWorked) / y.Target) * 100 : 0
                        }).ToList(),
                    OverAllProgress = _dbContext.ActivityProgresses
                        .Where(x => x.ActivityId == e.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED)
                        .Sum(x => x.ActualWorked) * 100 / e.Goal,
                    OfficeWork = e.OfficeWork,
                    FieldWork = e.FieldWork,
                    StrategicPlan = e.StrategicPlanId,
                    StrategicPlanIndicator = e.StrategicPlanIndicatorId,
                    IsPercentage = e.IsPercentage,
                    ProjectSourceId = e.ProjectSourceFundId,
                    ActivityLocations = e.ActivityLocations.ToList(),
                    ProgressStatus =  e.isStarted ? "IN PROGRESS" : (e.isCancelled? "CANCELLED" : (e.isCompleted? "COMPLETED": "NOT STARTED"))





                    //_dbContext.ActivityProgresses
                    //                .Where(x => x.ActivityId == e.Id)
                    //                .Select(x => x.progressStatus)
                    //                .AsQueryable()
                    //                .Any(status => status == ProgressStatus.FINALIZE) ? "FINISHED" : _dbContext.ActivityProgresses
                    //                .Where(x => x.ActivityId == e.Id)
                    //                .Select(x => x.progressStatus)
                    //                .Count() == 0 ? "NOT STARTED":
                    //                _dbContext.ActivityProgresses
                    //                .Where(x => x.ActivityId == e.Id)
                    //                .Select(x => x.progressStatus)
                    //                .All(status => status == ProgressStatus.SIMPLEPROGRESS) ? "IN PROGRESS" :
                    //                "NOT STARTED"
                }).ToListAsync();

            var activityGroups = activityViewDtos.GroupBy(dto => dto.TaskName)
                .Select(group => new ActivityGroup
                {
                    TaskName = group.Key,
                    ActivityViewDtos = group.ToList()
                }).ToList();

            return activityGroups;
        }

        public async Task<List<ActivityViewDto>> GetActivitiesFromProject(Guid projectId)
        {
            var activityViewDtos = await _dbContext.Activities.Include(x=>x.ActivityParent.Task)
            .Where(x => x.PlanId == projectId||x.Task.ProjectId==projectId||x.ActivityParent.Task.ProjectId==projectId)
            .Include(x => x.ActivityParent.Task.Project)
            .Include(x => x.Task.Project)
            .Include(x => x.ActivityLocations).ThenInclude(x => x.Region)
            .Include(x => x.ProjectSourceFund)
            .OrderBy(x => x.CreatedDate)
            .Select(e => new ActivityViewDto
            {
                Id = e.Id,
                Name = e.ActivityDescription,
                PlannedBudget = e.PlanedBudget,
                ActivityType = e.ActivityType.ToString(),
                IsTraining = e.IsTraining,
                TaskName = e.TaskId != null ? e.Task.TaskDescription : e.ActivityParent.Task.TaskDescription,
                ProjectName = e.TaskId != null ? e.Task.Project.ProjectName : e.ActivityParent.Task.Project.ProjectName,
                ActivityNumber = e.ActivityNumber,
                Begining = e.Begining,
                Target = e.Goal,
                UnitOfMeasurment = e.Indicator,
                OverAllPerformance = 0,
                StartDate = e.ShouldStat.ToString(),
                ProjectSource = e.ProjectSourceFund.Name,
                EndDate = e.ShouldEnd.ToString(),
                Members = e.ProjectTeamId == null
                    ? _dbContext.EmployeesAssignedForActivities
                        .Include(x => x.Employee)
                        .Where(x => x.ActivityId == e.Id)
                        .Select(y => new SelectListDto
                        {
                            Id = y.Employee.Id,
                            Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                            Photo = y.Employee.ImagePath,
                            EmployeeId = y.EmployeeId.ToString(),
                        }).ToList()
                    : _dbContext.ProjectTeamEmployees
                        .Where(x => x.ProjectTeamId == e.ProjectTeamId)
                        .Include(x => x.Employee)
                        .Select(y => new SelectListDto
                        {
                            Id = y.Employee.Id,
                            Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                            Photo = y.Employee.ImagePath,
                            EmployeeId = y.EmployeeId.ToString(),
                        }).ToList(),
                MonthPerformance = _dbContext.ActivityTargetDivisions
                    .Where(x => x.ActivityId == e.Id)
                    .OrderBy(x => x.Order)
                    .Select(y => new MonthPerformanceViewDto
                    {
                        Id = y.Id,
                        Order = y.Order,
                        Planned = y.Target,
                        Actual = _dbContext.ActivityProgresses
                            .Where(x => x.QuarterId == y.Id)
                            .Sum(x => x.ActualWorked),
                        UsedBudget = _dbContext.ActivityProgresses
                            .Where(x => x.QuarterId == y.Id)
                            .Sum(x => x.ActualBudget),
                        PlannedBudget = y.TargetBudget,
                        Percentage = y.Target != 0 ?
                            (float)(_dbContext.ActivityProgresses
                                .Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED)
                                .Sum(x => x.ActualWorked) / y.Target) * 100 : 0
                    }).ToList(),
                OverAllProgress = _dbContext.ActivityProgresses
                    .Where(x => x.ActivityId == e.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED)
                    .Sum(x => x.ActualWorked) * 100 / e.Goal,
                OfficeWork = e.OfficeWork,
                FieldWork = e.FieldWork,
                StrategicPlan = e.StrategicPlanId,
                StrategicPlanIndicator = e.StrategicPlanIndicatorId,
                IsPercentage = e.IsPercentage,
                ProjectSourceId = e.ProjectSourceFundId,
                ActivityLocations = e.ActivityLocations.ToList(),

                ProgressStatus = e.isStarted ? "IN PROGRESS" : (e.isCancelled ? "CANCELLED" : (e.isCompleted ? "COMPLETED" : "NOT STARTED"))
                //ProgressStatus = _dbContext.ActivityProgresses
                //                .Where(x => x.ActivityId == e.Id)
                //                .Select(x => x.progressStatus)
                //                .AsQueryable()
                //                .Any(status => status == ProgressStatus.FINALIZE) ? "FINISHED" : _dbContext.ActivityProgresses
                //                .Where(x => x.ActivityId == e.Id)
                //                .Select(x => x.progressStatus)
                //                .Count() == 0 ? "NOT STARTED" :
                //                _dbContext.ActivityProgresses
                //                .Where(x => x.ActivityId == e.Id)
                //                .Select(x => x.progressStatus)
                //                .All(status => status == ProgressStatus.SIMPLEPROGRESS) ? "IN PROGRESS" :
                //                "NOT STARTED"
            }).ToListAsync();

            return activityViewDtos;

        }

        public async Task<ResponseMessage> DeleteStrategicPlan(Guid Id)
        {
            try
            {
                var strategicDirection = await _dbContext.StrategicPlans.FirstOrDefaultAsync(x => x.Id == Id);
                if(strategicDirection == null)
                {
                    return new ResponseMessage { Success = false, Message = "Strategic plan could not be found" };
                }

                
                var projects = await _dbContext.Activities.Where(x => x.StrategicPlanId == Id).Select(x => x.ActivityDescription).ToListAsync();

                if (projects.Any())
                {
                    return new ResponseMessage { Success = false, Message = $" the following activites:- \n {string.Join("\n", projects)} use the strategic plan please check them and try again!!"  };
                }
                var strategicIndicator = await _dbContext.Indicators.Where(x => x.StrategicPlanId == Id).ExecuteDeleteAsync();

                _dbContext.StrategicPlans.Remove(strategicDirection);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Deleted Successfully!!" };
            }
            catch (Exception ex)
            {
                return new ResponseMessage { Success = false, Message = ex.Message };
            }
        }
    }
}
