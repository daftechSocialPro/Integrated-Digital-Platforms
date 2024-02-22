using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedDigitalAPI.Services.PM.Plan;
using IntegratedImplementation.DTOS.Configuration;
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

                    if (plan.ProjectManagerId!=Guid.Empty)
                    {
                        singlePlan.ProjectManagerId = plan.ProjectManagerId;

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

        public async Task<List<PlanViewDto>> GetPlans(Guid? programId)

        {

            var plans = programId != null ? _dBContext.Projects.Where(x=>x.ProjectManagerId==programId).Include(x => x.Department).Include(x => x.ProjectManager).Include(x => x.ProjectFunds) :
                _dBContext.Projects.Include(x => x.Department).Include(x => x.ProjectManager).Include(x => x.ProjectFunds);


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



                          }).ToListAsync();




        }
        public async Task<PlanSingleViewDto> GetSinglePlan(Guid planId)
        {



            var tasks = (from t in _dBContext.Tasks.Include(x=>x.Activities).Where(x => x.ProjectId == planId).OrderBy(x=>x.CreatedDate)
                        select new TaskVIewDto
                        {
                            Id= t.Id,
                            TaskName = t.TaskDescription,
                            TaskWeight = t.Weight,
                           
                            FinishedActivitiesNo= 0,
                            TerminatedActivitiesNo= 0,
                            StartDate= t.ShouldStartPeriod??DateTime.Now,
                            EndDate=t.ShouldEnd??DateTime.Now,
                           
                            HasActivity= t.HasActivityParent,
                            PlannedBudget  = t.PlanedBudget,
                            NumberOfMembers = _dBContext.TaskMembers.Count(x=>x.TaskId == t.Id),
                         
                            RemianingWeight = 100 - _dBContext.Activities.Where(x => x.TaskId == t.Id).Sum(x => x.Weight),
                            RemainingBudget = t.PlanedBudget - _dBContext.Activities.Where(x => x.ActivityParent.TaskId == t.Id).Sum(x => x.PlanedBudget),
                            NumberofActivities = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id),
                            NumberOfFinalized = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.Status == Status.FINALIZED && ( x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id)),
                            NumberOfTerminated = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.Status == Status.TERMINATED &&( x.TaskId == t.Id || x.ActivityParent.TaskId == t.Id))

                        }).ToList();


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
                var projectFunds = await _dBContext.Project_Funds.Where(x => x.ProjectId == planId).ToListAsync();

                if (projectFunds.Any())
                {
                    _dBContext.Project_Funds.RemoveRange(projectFunds);
                    await _dBContext.SaveChangesAsync();
                }

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
            }catch(Exception ex)
            {
                return new ResponseMessage
                {

                    Success = false,
                    Message = ex.Message

                };

            }

                            
                

            }


            }

        public class GetStartEndDate
        {
            public DateTime FromDate { get; set; }

            public DateTime EndDate { get; set; }
        }



    }

