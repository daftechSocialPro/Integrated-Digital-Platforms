using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedDigitalAPI.Services.PM.Plan;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.PM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.PM;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedDigitalAPI.Services.PM
{
    public class PlanService : IPlanService
    {

        private readonly ApplicationDbContext _dBContext;
        public PlanService(ApplicationDbContext context)
        {
            _dBContext = context;
        }

        public async Task<ResponseMessage> CreatePlan(PlanDto plan)
        {
            try
            {
                var Plans = new Project
                {
                    Id = Guid.NewGuid(),

                    HasTask = plan.HasTask,
                    ProjectName = plan.PlanName,
                    PeriodStartAt = plan.StartDate,
                    PeriodEndAt = plan.EndDate,
                    ProjectNumber = plan.ProjectNumber,
                    Goal = plan.Goal,
                    Objective = plan.Objective,
                    PlannedBudget = plan.PlandBudget,
                    DepartmentId = plan.StructureId,
                    ProjectManagerId = plan.ProjectManagerId,
                    FinanceManagerId = plan.FinanceManagerId,
                    CreatedDate = DateTime.Now,
                    CreatedById = plan.CreatedById

                };
                await _dBContext.AddAsync(Plans);
                await _dBContext.SaveChangesAsync();


                foreach (var fund in plan.ProjectFunds)
                {
                    var project_Fund = new Project_Fund
                    {
                        Id = Guid.NewGuid(),
                        ProjectId = Plans.Id,
                        ProjectSourceFundId = fund,
                        Amount = Plans.PlannedBudget / plan.ProjectFunds.Count(),
                        CreatedDate = DateTime.Now,
                        CreatedById = plan.CreatedById
                    };
                    await _dBContext.Project_Funds.AddAsync(project_Fund);
                    await _dBContext.SaveChangesAsync();

                }

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Project Added Successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message.ToString()
                };
            }

        }
        public async Task<ResponseMessage> UpdatePlan(PlanDto plan)
        {
            try
            {
                var singlePlan = await _dBContext.Projects.FindAsync(plan.Id);

                if (singlePlan != null)
                {



                    singlePlan.HasTask = plan.HasTask;
                    singlePlan.ProjectName = plan.PlanName;
                    singlePlan.PeriodStartAt = plan.StartDate;
                    singlePlan.PeriodEndAt = plan.EndDate;
                    singlePlan.ProjectNumber = plan.ProjectNumber;
                    singlePlan.Goal = plan.Goal;
                    singlePlan.Objective = plan.Objective;
                    singlePlan.PlannedBudget = plan.PlandBudget;
                    singlePlan.DepartmentId = plan.StructureId;

                    if (plan.ProjectManagerId != Guid.Empty)
                    {
                        singlePlan.ProjectManagerId = plan.ProjectManagerId;

                    }
                    if (plan.FinanceManagerId != Guid.Empty)
                    {
                        singlePlan.FinanceManagerId = plan.FinanceManagerId;

                    }
                    await _dBContext.SaveChangesAsync();

                }

                if (plan.ProjectFunds.Any())
                {
                    var projectFunds = _dBContext.Project_Funds.Where(x => x.ProjectId == plan.Id).ToList();

                    _dBContext.RemoveRange(projectFunds);
                    await _dBContext.SaveChangesAsync();

                }


                foreach (var fund in plan.ProjectFunds)
                {
                    var project_Fund = new Project_Fund
                    {
                        Id = Guid.NewGuid(),
                        ProjectId = singlePlan.Id,
                        ProjectSourceFundId = fund,
                        Amount = singlePlan.PlannedBudget / plan.ProjectFunds.Count(),
                        CreatedDate = DateTime.Now,
                        CreatedById = plan.CreatedById
                    };
                    await _dBContext.Project_Funds.AddAsync(project_Fund);
                    await _dBContext.SaveChangesAsync();

                }

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Project Updated Successfully"
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message.ToString()
                };
            }

        }


        public async Task<GetStartEndDate> GetDateTime(Guid planId)
        {


            return await _dBContext.Projects.Where(x => x.Id == planId).Select(x => new GetStartEndDate
            {
                FromDate = x.PeriodStartAt,
                EndDate = x.PeriodEndAt

            }).FirstOrDefaultAsync();


        }

        public async Task<List<PlanViewDto>> GetPlans(Guid? programId, int? year)

        {

            var plans = programId != null ? _dBContext.Projects.Where(x => x.ProjectManagerId == programId).Include(x => x.Department).Include(x => x.ProjectManager).Include(x => x.ProjectFunds).AsNoTracking() :
                _dBContext.Projects.Include(x => x.Department).Include(x => x.ProjectManager)
                .Include(x=>x.FinanceManager)
                .Include(x => x.ProjectFunds).AsNoTracking();


            if (year.HasValue&&year!=null&&year!=0)
            {
                plans = plans.Where(x => x.PeriodStartAt.Year <= year && x.PeriodEndAt.Year >= year);
            }

            return await (from p in plans

                          select new PlanViewDto
                          {

                              Id = p.Id,
                              PlanName = p.ProjectName,
                              Goal = p.Goal,
                              Objective = p.Objective,
                              ProjectNumber = p.ProjectNumber,
                              PlandBudget = p.PlannedBudget,
                              StructureName = p.Department.DepartmentName,
                              RemainingBudget = (float)(p.PlannedBudget - p.Tasks.Sum(x => (float)x.ActualBudget)),
                              ProjectManager = $"{p.ProjectManager.FirstName} {p.ProjectManager.MiddleName} {p.ProjectManager.LastName}",
                              FinanceManager = p.FinanceManagerId!=null? $"{p.FinanceManager.FirstName} {p.FinanceManager.MiddleName} {p.FinanceManager.LastName}":"",

                              //Director = _dBContext.Employees.Where(x => x.Position == Models.Common.Position.Director&&x.OrganizationalStructureId== p.StructureId).FirstOrDefault().FullName,                              
                              NumberOfTask = _dBContext.Tasks.Count(x => x.ProjectId == p.Id),
                              NumberOfActivities = _dBContext.Activities.Include(x => x.ActivityParent.Task.Project).Where(x => x.PlanId == p.Id || x.Task.ProjectId == p.Id || x.ActivityParent.Task.ProjectId == p.Id).Count(),
                              NumberOfTaskCompleted = _dBContext.Activities.Include(x => x.ActivityParent.Task.Project).Where(x => x.Status == Status.FINALIZED && (x.PlanId == p.Id || x.Task.ProjectId == p.Id || x.ActivityParent.Task.ProjectId == p.Id)).Count(),
                              HasTask = p.HasTask,
                              ProjectFunds = p.ProjectFunds.Select(x => x.ProjectSourceFund.Name).ToList(),
                              ProjectFundIds = p.ProjectFunds.Select(x => x.ProjectSourceFund.Id.ToString()).ToList(),

                              StartDate = p.PeriodStartAt,
                              EndDate = p.PeriodEndAt,

                              StructureId = p.DepartmentId.ToString(),
                              ProjectManagerId = p.ProjectManagerId.ToString(),
                              FinanceManagerId = p.FinanceManagerId.ToString(),
                              
                              CreatedDate = p.CreatedDate



                          }).OrderByDescending(x => x.CreatedDate).ToListAsync();




        }
        public async Task<PlanSingleViewDto> GetSinglePlan(Guid planId,int? year)
        {
            var tasks = (from t in _dBContext.Tasks.Include(x => x.Activities).Where(x => x.ProjectId == planId).OrderBy(x => x.CreatedDate)
                         where (year.HasValue && year > 0 ? ((t.ShouldStartPeriod.HasValue && t.ShouldStartPeriod.Value.Year == year) || (t.ShouldEnd.HasValue && t.ShouldEnd.Value.Year == year)) : true)
                         select new TaskVIewDto
                         {
                             Id = t.Id,
                             TaskName = t.TaskDescription,
                             TaskWeight = t.Weight,

                             FinishedActivitiesNo = 0,
                             TerminatedActivitiesNo = 0,
                             StartDate = t.ShouldStartPeriod ?? DateTime.Now,
                             EndDate = t.ShouldEnd ?? DateTime.Now,

                             HasActivity = t.HasActivityParent,
                             PlannedBudget = t.PlanedBudget,
                             NumberOfMembers = _dBContext.TaskMembers.Count(x => x.TaskId == t.Id),

                             RemianingWeight = 100 - _dBContext.Activities.Where(x => x.TaskId == t.Id).Sum(x => x.Weight),
                             RemainingBudget = t.PlanedBudget - _dBContext.Activities.Where(x => x.ActivityParent.TaskId == t.Id).Sum(x => x.PlanedBudget),
                             NumberofActivities = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id),
                             NumberOfFinalized = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.Status == Status.FINALIZED && (x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id)),
                             NumberOfTerminated = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.Status == Status.TERMINATED && (x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id)),
                             CreatedDate = t.CreatedDate

                         }).OrderBy(x => x.CreatedDate).ToList();


            float taskBudgetsum = tasks.Sum(x => x.PlannedBudget);
            float taskweightSum = tasks.Sum(x => x.TaskWeight ?? 0);


            return await (from p in _dBContext.Projects.Include(x => x.ProjectFunds).Where(x => x.Id == planId)
                          select new PlanSingleViewDto
                          {
                              Id = p.Id,
                              PlanName = p.ProjectName,
                              Goal = p.Goal,
                              Objective = p.Objective,
                              ProjectNumber = p.ProjectNumber,
                              Donor = string.Join(", ", p.ProjectFunds.Select(x => x.ProjectSourceFund.Name)),

                              PlannedBudget = p.PlannedBudget,
                              RemainingBudget = p.PlannedBudget - taskBudgetsum,
                              RemainingWeight = float.Parse((100.0 - taskweightSum).ToString()),
                              EndDate = p.PeriodEndAt.ToString(),
                              StartDate = p.PeriodStartAt.ToString(),


                              Tasks = tasks

                          }).FirstOrDefaultAsync();






        }

        public async Task<List<SelectListDto>> GetPlansSelectList()
        {


            return await _dBContext.Projects.Select(x => new SelectListDto
            {
                Name = x.ProjectName,
                Id = x.Id
            }).ToListAsync();


        }

        public async Task<ResponseMessage> DeleteProject(Guid planId)
        {
            var plan = await _dBContext.Projects.FindAsync(planId);

            if (plan == null)
            {
                return new ResponseMessage
                {

                    Message = "Plan Not Found!!!",
                    Success = false
                };
            }

            try
            {
                var ProjectSalary = await _dBContext.EmployeeSalaries.AnyAsync(x => x.ProjectId == planId);
                if (ProjectSalary)
                {
                    return new ResponseMessage
                    {

                        Message = "First Correct all employee salaries related to the project!!!",
                        Success = false
                    };
                }

                var projectFunds = await _dBContext.Project_Funds.Where(x => x.ProjectId == planId).ToListAsync();

                if (projectFunds.Any())
                {
                    _dBContext.Project_Funds.RemoveRange(projectFunds);
                    await _dBContext.SaveChangesAsync();
                }

                var storerequest = await _dBContext.StoreRequests.Where(x => x.ProjectId.Equals(planId)).ExecuteUpdateAsync(pro => pro.SetProperty(y => y.ProjectId,(Guid?)null));
                var purchaseRequest = await _dBContext.PurchaseRequests.Where(x => x.ProjectId.Equals(planId)).ExecuteUpdateAsync(pro => pro.SetProperty(y => y.ProjectId,(Guid?)null));
                var paymentRequsition = await _dBContext.PaymetRequisitions.Where(x => x.ProjectId.Equals(planId)).ExecuteUpdateAsync(pro => pro.SetProperty(y => y.ProjectId,(Guid?)null));
                var products = await _dBContext.Products.Where(x => x.ProjectId.Equals(planId)).ExecuteUpdateAsync(pro => pro.SetProperty(y => y.ProjectId,(Guid?)null));
                var training = await _dBContext.Trainings.Where(x => x.ProjectId.Equals(planId)).ExecuteUpdateAsync(pro => pro.SetProperty(y => y.ProjectId,(Guid?)null));

                var tasks = await _dBContext.Tasks.Where(x => x.ProjectId == planId).ToListAsync();

                if (tasks.Any())
                {
                    foreach (var task in tasks)
                    {
                        var taskMemos = await _dBContext.TaskMemos.Where(x => x.TaskId == task.Id).ToListAsync();
                        var taskMembers = await _dBContext.TaskMembers.Where(x => x.TaskId == task.Id).ToListAsync();

                        if (taskMemos.Any())
                        {
                            _dBContext.TaskMemos.RemoveRange(taskMemos);
                            await _dBContext.SaveChangesAsync();
                        }
                        if (taskMembers.Any())
                        {
                            _dBContext.TaskMembers.RemoveRange(taskMembers);
                            await _dBContext.SaveChangesAsync();
                        }

                        var activityParents = await _dBContext.ActivitiesParents.Where(x => x.TaskId == task.Id).ToListAsync();

                        if (activityParents.Any())
                        {
                            foreach (var actP in activityParents)
                            {
                                var actvities = await _dBContext.Activities.Where(x => x.ActivityParentId == actP.Id).ToListAsync();

                                foreach (var act in actvities)
                                {
                                    var actProgress = await _dBContext.ActivityProgresses.Where(x => x.ActivityId == act.Id).ToListAsync();

                                    foreach (var actpro in actProgress)
                                    {
                                        var progAttachments = await _dBContext.ProgressAttachments.Where(x => x.ActivityProgressId == actpro.Id).ToListAsync();
                                        if (progAttachments.Any())
                                        {
                                            _dBContext.ProgressAttachments.RemoveRange(progAttachments);
                                            await _dBContext.SaveChangesAsync();
                                        }

                                    }

                                    if (actProgress.Any())
                                    {
                                        _dBContext.ActivityProgresses.RemoveRange(actProgress);
                                        await _dBContext.SaveChangesAsync();
                                    }

                                    var activityTargets = await _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == act.Id).ToListAsync();


                                    if (activityTargets.Any())
                                    {
                                        _dBContext.ActivityTargetDivisions.RemoveRange(activityTargets);
                                        await _dBContext.SaveChangesAsync();
                                    }


                                    var employees = await _dBContext.EmployeesAssignedForActivities.Where(x => x.ActivityId == act.Id).ToListAsync();


                                    if (activityTargets.Any())
                                    {
                                        _dBContext.EmployeesAssignedForActivities.RemoveRange(employees);
                                        await _dBContext.SaveChangesAsync();
                                    }
                                    var actLocations = await _dBContext.ActivityLocations.Where(x => x.ActivityId == act.Id).ToListAsync();

                                    if (actLocations.Any())
                                    {
                                        _dBContext.ActivityLocations.RemoveRange(actLocations);
                                        await _dBContext.SaveChangesAsync();
                                    }





                                }
                            }

                            _dBContext.ActivitiesParents.RemoveRange(activityParents);
                            await _dBContext.SaveChangesAsync();

                        }
                        var actvities2 = await _dBContext.Activities.Where(x => x.TaskId == task.Id).ToListAsync();

                        if (actvities2.Any())
                        {
                            foreach (var act in actvities2)
                            {
                                var actProgress = await _dBContext.ActivityProgresses.Where(x => x.ActivityId == act.Id).ToListAsync();

                                foreach (var actpro in actProgress)
                                {
                                    var progAttachments = await _dBContext.ProgressAttachments.Where(x => x.ActivityProgressId == actpro.Id).ToListAsync();
                                    if (progAttachments.Any())
                                    {
                                        _dBContext.ProgressAttachments.RemoveRange(progAttachments);
                                        await _dBContext.SaveChangesAsync();
                                    }

                                }

                                if (actProgress.Any())
                                {
                                    _dBContext.ActivityProgresses.RemoveRange(actProgress);
                                    await _dBContext.SaveChangesAsync();
                                }

                                var activityTargets = await _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == act.Id).ToListAsync();


                                if (activityTargets.Any())
                                {
                                    _dBContext.ActivityTargetDivisions.RemoveRange(activityTargets);
                                    await _dBContext.SaveChangesAsync();
                                }


                                var employees = await _dBContext.EmployeesAssignedForActivities.Where(x => x.ActivityId == act.Id).ToListAsync();


                                if (employees.Any())
                                {
                                    _dBContext.EmployeesAssignedForActivities.RemoveRange(employees);
                                    await _dBContext.SaveChangesAsync();
                                }

                                if (activityParents.Any())
                                {
                                    _dBContext.ActivitiesParents.RemoveRange(activityParents);
                                    await _dBContext.SaveChangesAsync();
                                }

                                var actLocations = await _dBContext.ActivityLocations.Where(x => x.ActivityId == act.Id).ToListAsync();

                                if (actLocations.Any())
                                {
                                    _dBContext.ActivityLocations.RemoveRange(actLocations);
                                    await _dBContext.SaveChangesAsync();
                                }


                            }

                            _dBContext.Activities.RemoveRange(actvities2);
                            await _dBContext.SaveChangesAsync();
                        }

                    }
                    _dBContext.Tasks.RemoveRange(tasks);
                    await _dBContext.SaveChangesAsync();


                    _dBContext.Projects.Remove(plan);
                    await _dBContext.SaveChangesAsync();
                }

                else
                {
                    _dBContext.Projects.Remove(plan);
                    await _dBContext.SaveChangesAsync();
                }

                return new ResponseMessage
                {

                    Success = true,
                    Message = "Project Deleted Successfully !!!"

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
        public async Task<PlanPieChartPostDto> GetPlanPieCharts(Guid? planId, Guid? strategicPlanId, int quarter, int? year)
        {


            int currentYear = DateTime.Now.Year;


            if (planId != Guid.Empty)
            {
                var projects = await _dBContext.Projects.Include(x => x.Tasks).Where(x=> year != 0 && x.PeriodStartAt.Year <= year && x.PeriodEndAt.Year >= year).AsNoTracking().ToListAsync();

                if (planId != Guid.Parse("30fc30dc-eb56-4f40-9510-54ad983e759a"))
                {
                    projects = projects.Where(x => x.Id == planId).ToList();
                }

                var statusCount = new Dictionary<string, int>();

                foreach (var project in projects)
                {


                    foreach (var task in project.Tasks)
                    {
                        var activities = _dBContext.ActivitiesParents.Where(x => x.TaskId == task.Id)
                                         .Join(_dBContext.Activities,
                                                  a => a.Id,
                                                  e => e.ActivityParentId,
                                                  (a, e) => e)
                                            .ToList();

                        foreach (var activity in activities)
                        {
                            if (quarter != 0)
                            {
                                var targetQuarterStart = new DateTime(year ?? currentYear, (quarter - 1) * 3 + 1, 1);
                                var targetQuarterEnd = targetQuarterStart.AddMonths(3).AddDays(-1);


                                if (!(activity.ShouldStat <= targetQuarterEnd && activity.ShouldEnd >= targetQuarterStart))
                                {
                                    continue;
                                }

                            }


                            string status;

                            if (activity.isCancelled)
                            {
                                status = "CANCELLED";

                            }
                            else
                            {
                                //var quarterIds = _dBContext.ActivityTargetDivisions
                                //                    .Where(x => x.ActivityId == activity.Id && x.Year == currentYear && (quarter == 1 ? x.Order >= 0 && x.Order <= 2 :
                                //                                                                 quarter == 2 ? x.Order >= 3 && x.Order <= 5 :
                                //                                                                 quarter == 3 ? x.Order >= 6 && x.Order <= 8 :
                                //                                                                 quarter == 4 ? x.Order >= 9 && x.Order <= 11 :
                                //                                                                 x.Order >= 0 && x.Order <= 11)).Select(x => x.Id).ToList();

                                status = activity.isStarted ? "IN PROGRESS" : (activity.isCancelled ? "CANCELLED" : (activity.isCompleted ? "COMPLETED" : "NOT STARTED"));
                                //status = _dBContext.ActivityProgresses
                                //            .Where(x => x.ActivityId == activity.Id && quarterIds.Contains(x.QuarterId))
                                //            .Select(x => x.progressStatus)
                                //            .AsQueryable()
                                //            .Any(status => status == ProgressStatus.FINALIZE) ? "FINISHED" : _dBContext.ActivityProgresses
                                //            .Where(x => x.ActivityId == activity.Id && quarterIds.Contains(x.QuarterId))
                                //            .Select(x => x.progressStatus)
                                //            .Count() == 0 ? "NOT STARTED" :
                                //            _dBContext.ActivityProgresses
                                //            .Where(x => x.ActivityId == activity.Id && quarterIds.Contains(x.QuarterId))
                                //            .Select(x => x.progressStatus)
                                //            .All(status => status == ProgressStatus.SIMPLEPROGRESS) ? "IN PROGRESS" :
                                //             null;

                            }

                            if (statusCount.ContainsKey(status))
                            {
                                statusCount[status] += 1;
                            }
                            else
                            {
                                statusCount.Add(status, 1);
                            }

                        }




                    }

                }
                var chartDataSets = new List<ChartDataSet>();

                foreach (var (status, count) in statusCount)
                {
                    chartDataSets.Add(
                      new ChartDataSet
                      {
                          Label = status,
                          Data = count
                      }
                    );
                }
                return new PlanPieChartPostDto
                {
                    PlanName = planId == Guid.Parse("30fc30dc-eb56-4f40-9510-54ad983e759a") ? "ALL" : projects.Any() ? projects.FirstOrDefault().ProjectName : "",
                    Quarter = quarter,
                    ChartDataSets = chartDataSets


                };
            }
            else
            {


                var strategicPlan = await _dBContext.StrategicPlans.Where(x => x.Id == strategicPlanId).FirstOrDefaultAsync();
                var statusCount = new Dictionary<string, int>();


                var activities = _dBContext.ActivitiesParents
                                 .Join(_dBContext.Activities.Where(x => x.StrategicPlanId == strategicPlanId),
                                          a => a.Id,
                                          e => e.ActivityParentId,
                                          (a, e) => e)
                                    .ToList();

                foreach (var activity in activities)
                {
                    if (quarter != 0)
                    {
                        var targetQuarterStart = new DateTime(year??currentYear, (quarter - 1) * 3 + 1, 1);
                        var targetQuarterEnd = targetQuarterStart.AddMonths(3).AddDays(-1);


                        if (!(activity.ShouldStat <= targetQuarterEnd && activity.ShouldEnd >= targetQuarterStart))
                        {
                            continue;
                        }

                    }


                    string status;

                    if (activity.isCancelled)
                    {
                        status = "CANCELLED";

                    }
                    else
                    {

                        status = activity.isStarted ? "IN PROGRESS" : (activity.isCancelled ? "CANCELLED" : (activity.isCompleted ? "COMPLETED" : "NOT STARTED"));


                    }

                    if (statusCount.ContainsKey(status))
                    {
                        statusCount[status] += 1;
                    }
                    else
                    {
                        statusCount.Add(status, 1);
                    }

                }



                var chartDataSets = new List<ChartDataSet>();

                foreach (var (status, count) in statusCount)
                {
                    chartDataSets.Add(
                      new ChartDataSet
                      {
                          Label = status,
                          Data = count
                      }
                    );
                }
                return new PlanPieChartPostDto
                {
                    PlanName = strategicPlan.Name,
                    Quarter = quarter,
                    ChartDataSets = chartDataSets


                };

            }
        }

        public async Task<PlanBarChartPostDto> GetPlanBarCharts(Guid? planId, Guid? strategicPlanId, int?year)
        {
            int currentYear = DateTime.Now.Year;
            var quarterSums = new Dictionary<int, (double overallProgress, double overallBudgetUtil, double overallPlannedProgress, double overallPlannedBudgetUtil)>();


            if (planId != Guid.Empty)
            {
                var projects = await _dBContext.Projects.Include(x => x.Tasks).Where(x => year != 0 && x.PeriodStartAt.Year <= year && x.PeriodEndAt.Year >= year).AsNoTracking().ToListAsync();

                if (planId != Guid.Parse("30fc30dc-eb56-4f40-9510-54ad983e759a"))
                {
                    projects = projects.Where(x => x.Id == planId).ToList();
                }


                foreach (var project in projects)
                {
                    foreach (var task in project.Tasks)
                    {
                        var activities = await _dBContext.ActivitiesParents
                            .Where(x => x.TaskId == task.Id)
                            .Join(_dBContext.Activities, a => a.Id, e => e.ActivityParentId, (a, e) => e)
                            .ToListAsync();

                        foreach (var activity in activities)
                        {
                            var quarterIds = await _dBContext.ActivityTargetDivisions
                                .Where(x => x.ActivityId == activity.Id && x.Year == currentYear)
                                .OrderBy(x => x.Order)
                                .Select(x => x.Id)
                                .ToListAsync();

                            int index = 1;
                            double overallProgressSum = 0;
                            double overallBudgetUtilSum = 0;
                            double overallPlannedProgressSum = 0;
                            double overallPlannedBudgetUtilSum = 0;

                            foreach (var quarter in quarterIds)
                            {
                                double overallProgress = await _dBContext.ActivityProgresses
                                    .Where(x => x.ActivityId == activity.Id && x.QuarterId == quarter)
                                    .SumAsync(x => x.ActualWorked);

                                double overallPlannedProgress = await _dBContext.ActivityTargetDivisions
                                    .Where(x => x.ActivityId == activity.Id && x.Id == quarter)
                                    .SumAsync(x => x.Target);

                                double overallBudgetUtil = activity.PlanedBudget != 0
                                    ? await _dBContext.ActivityProgresses
                                        .Where(x => x.ActivityId == activity.Id && x.QuarterId == quarter)
                                        .SumAsync(x => x.ActualBudget)
                                    : 0;

                                double overallPlannedBudget = await _dBContext.ActivityTargetDivisions
                                    .Where(x => x.ActivityId == activity.Id && x.Id == quarter)
                                    .SumAsync(x => x.TargetBudget);

                                overallProgressSum += overallProgress;
                                overallBudgetUtilSum += overallBudgetUtil;
                                overallPlannedProgressSum += overallPlannedProgress;
                                overallPlannedBudgetUtilSum += overallPlannedBudget;

                                if (index % 3 == 0)
                                {
                                    int dictIndex = index / 3;
                                    if (quarterSums.ContainsKey(dictIndex))
                                    {
                                        var existingSum = quarterSums[dictIndex];
                                        overallProgressSum += existingSum.overallProgress;
                                        overallBudgetUtilSum += existingSum.overallBudgetUtil;
                                        overallPlannedProgressSum += existingSum.overallPlannedProgress;
                                        overallPlannedBudgetUtilSum += existingSum.overallPlannedBudgetUtil;
                                    }

                                    quarterSums[dictIndex] = (overallProgressSum, overallBudgetUtilSum, overallPlannedProgressSum, overallPlannedBudgetUtilSum);

                                    overallProgressSum = 0;
                                    overallBudgetUtilSum = 0;
                                    overallPlannedProgressSum = 0;
                                    overallPlannedBudgetUtilSum = 0;
                                }
                                index++;
                            }

                            if (index % 3 != 1)
                            {
                                int dictIndex = (index - 1) / 3 + 1;
                                if (quarterSums.ContainsKey(dictIndex))
                                {
                                    var existingSum = quarterSums[dictIndex];
                                    overallProgressSum += existingSum.overallProgress;
                                    overallBudgetUtilSum += existingSum.overallBudgetUtil;
                                    overallPlannedProgressSum += existingSum.overallPlannedProgress;
                                    overallPlannedBudgetUtilSum += existingSum.overallPlannedBudgetUtil;
                                }
                                quarterSums[dictIndex] = (overallProgressSum, overallBudgetUtilSum, overallPlannedProgressSum, overallPlannedBudgetUtilSum);
                            }
                        }
                    }
                }

                var chartDataSets = new List<ChartDataSet2>();
                var chartDataSets1 = new List<ChartDataSet2>();

                foreach (var (status, value) in quarterSums)
                {
                    chartDataSets.Add(new ChartDataSet2
                    {
                        Label = status.ToString(),
                        Data = new DashData
                        {
                            Planned = (float)value.overallPlannedProgress,
                            Actual = (float)value.overallProgress
                        }
                    });

                    chartDataSets1.Add(new ChartDataSet2
                    {
                        Label = status.ToString(),
                        Data = new DashData
                        {
                            Planned = (float)value.overallPlannedBudgetUtil,
                            Actual = (float)value.overallBudgetUtil
                        }
                    });
                }

                return new PlanBarChartPostDto
                {
                    PlanName = planId == Guid.Parse("30fc30dc-eb56-4f40-9510-54ad983e759a") ? "ALL" : projects.Any() ? projects.FirstOrDefault()?.ProjectName ?? "" : "",
                    BudgetChartDataSets = chartDataSets1,
                    ProgressChartDataSets = chartDataSets
                };
            }

            else
            {
                var strategicPlan = await _dBContext.StrategicPlans.Where(x => x.Id == strategicPlanId).FirstOrDefaultAsync();

                var activities = _dBContext.ActivitiesParents
                                 .Join(_dBContext.Activities.Where(x => x.StrategicPlanId == strategicPlanId),
                                          a => a.Id,
                                          e => e.ActivityParentId,
                                          (a, e) => e)
                                    .ToList();

                foreach (var activity in activities)
                {

                    var quarterIds = _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == activity.Id && x.Year == currentYear)
                                    .OrderBy(x => x.Order)
                                    .Select(x => x.Id)
                                    .ToList();
                    int index = 1;

                    double overallProgressSum = 0;
                    double overallBudgetUtilSum = 0;

                    double overallPlannedProgressSum = 0;
                    double overallPlannedBudgetUtilSum = 0;
                    foreach (var quarter in quarterIds)
                    {
                        var OverAllProgress = _dBContext.ActivityProgresses
                        .Where(x => x.ActivityId == activity.Id && x.QuarterId == quarter
                        // && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED
                        )
                        .Sum(x => x.ActualWorked);

                        var overAllPlannedProgress = _dBContext.ActivityTargetDivisions.
                                   Where(x => x.ActivityId == activity.Id && x.Id == quarter).Sum(x => x.Target);



                        var OverAllBudgetUtil = activity.PlanedBudget != 0 ? _dBContext.ActivityProgresses
                        .Where(x => x.ActivityId == activity.Id && x.QuarterId == quarter
                        //&& x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED
                        )
                        .Sum(x => x.ActualBudget) : 0;


                        var overAllPlannedBudget = _dBContext.ActivityTargetDivisions.
    Where(x => x.ActivityId == activity.Id && x.Id == quarter).Sum(x => x.TargetBudget);


                        overallProgressSum += OverAllProgress;
                        overallBudgetUtilSum += OverAllBudgetUtil;

                        overallPlannedProgressSum += overAllPlannedProgress;
                        overallPlannedBudgetUtilSum += overAllPlannedBudget;

                        if (index % 3 == 0)
                        {
                            int dictIndex = index / 3;
                            if (quarterSums.ContainsKey(dictIndex))
                            {
                                var existingSum = quarterSums[dictIndex];
                                //overallProgressSum += existingSum.overallProgress;
                                //overallBudgetUtilSum += existingSum.overallBudgetUtil;
                            }
                            quarterSums[dictIndex] = (overallProgressSum, overallBudgetUtilSum, overallPlannedProgressSum, overallPlannedBudgetUtilSum);
                            overallProgressSum = 0;
                            overallBudgetUtilSum = 0;
                        }
                        index++;
                    }


                }





                var chartDataSets = new List<ChartDataSet2>();

                foreach (var (status, value) in quarterSums)
                {

                    double overallProgress = value.overallProgress;
                    double overAllTarget = value.overallPlannedProgress;

                    chartDataSets.Add(
                      new ChartDataSet2
                      {
                          Label = status.ToString(),
                          Data = new DashData
                          {
                              Actual = (float)overallProgress,

                              Planned = (float)overAllTarget
                          }




                      }
                    );
                }
                var chartDataSets1 = new List<ChartDataSet2>();

                foreach (var (status, value) in quarterSums)
                {

                    double overallBudgetUtil = value.overallBudgetUtil;
                    double OverAllTarget = value.overallPlannedBudgetUtil;

                    chartDataSets1.Add(
                      new ChartDataSet2
                      {
                          Label = status.ToString(),
                          Data = new DashData
                          {
                              Planned = (float)OverAllTarget,
                              Actual = (float)overallBudgetUtil
                          }
                      }
                    );
                }

                return new PlanBarChartPostDto
                {
                    PlanName = strategicPlan.Name,

                    BudgetChartDataSets = chartDataSets1,
                    ProgressChartDataSets = chartDataSets


                };
            }


        }

        public async Task<List<StrageicPlanReportDto>> GetStrategicPlanReport()
        {

            try
            {
                // First, fetch the necessary data without performing any aggregation
                var activities = await _dBContext.Activities
                    .Include(x => x.ActProgress)
                    .Select(x => new
                    {
                        x.StrategicPlanIndicator.StrategicPlan.Id,
                        x.StrategicPlanIndicator.StrategicPlan.Name,
                        ActualProgress = x.ActProgress.Select(ap => ap.ActualWorked).ToList(), // Get the list of actual worked values
                        PlannedProgress = x.Goal - x.Begining, // Calculate planned progress
                        ActualBudget = x.ActProgress.Select(ap => ap.ActualBudget).ToList(), // Get the list of actual budget values
                        PlannedBudget = x.PlanedBudget
                    })
                    .AsNoTracking()
                    .ToListAsync();

                // Now perform the aggregation in-memory
                var groupedActivities = activities
                    .GroupBy(x => new { x.Id, x.Name })
                    .Select(g => new StrageicPlanReportDto
                    {
                        StrategicPlanId = g.Key.Id,
                        StrategicPlanName = g.Key.Name,
                        ActualProgress = g.SelectMany(a => a.ActualProgress).Sum(), // Sum the actual progress values
                        PlannedProgress = g.Sum(a => a.PlannedProgress), // Sum the planned progress values
                        ActualBudget = g.SelectMany(a => a.ActualBudget).Sum(), // Sum the actual budget values
                        PlannedBudget = g.Sum(a => a.PlannedBudget) // Sum the planned budget values
                    })
                    .ToList();

                return groupedActivities;
            
            }
            catch
            {
                return new List<StrageicPlanReportDto>();
            }
        }


    }
    public class GetStartEndDate
    {
        public DateTime FromDate { get; set; }

        public DateTime EndDate { get; set; }
    }



}

