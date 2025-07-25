﻿using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.PM;
using Microsoft.EntityFrameworkCore;

using System.Net.Sockets;
using System.Numerics;
using System.Threading.Tasks;
using static IntegratedDigitalAPI.Services.PM.ProgressReport.ProgressReportService;

namespace IntegratedDigitalAPI.Services.PM
{
    public class TaskService : ITaskService
    {

        private readonly ApplicationDbContext _dBContext;
        public TaskService(ApplicationDbContext context)
        {
            _dBContext = context;
        }

        public async Task<int> CreateTask(TaskDto task)
        {

            var task1 = new Tasks
            {
                Id = Guid.NewGuid(),
                TaskDescription = task.TaskDescription,
                PlanedBudget = task.PlannedBudget,
                HasActivityParent = task.HasActvity,
                CreatedDate = DateTime.Now,
                ProjectId = task.PlanId,
                ShouldStartPeriod = task.StartDate,
                ShouldEnd = task.EndDate

            };
            await _dBContext.AddAsync(task1);
            await _dBContext.SaveChangesAsync();
            return 1;

        }

        public async Task<int> AddTaskMemo(TaskMemoRequestDto taskMemo)
        {
            var taskMemo1 = new TaskMemo
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                EmployeeId = taskMemo.EmployeeId,
                Description = taskMemo.Description,
            };
            if (taskMemo.RequestFrom == "PLAN")
            {
                taskMemo1.PlanId = taskMemo.TaskId;
            }
            else
            {
                taskMemo1.TaskId = taskMemo.TaskId;
            }
            await _dBContext.AddAsync(taskMemo1);
            await _dBContext.SaveChangesAsync();
            return 1;
        }

        public async Task<TaskVIewDto> GetSingleTask(Guid taskId, int? year)
        {

            var task = await _dBContext.Tasks.FirstOrDefaultAsync(x => x.Id == taskId);

            if (task != null)
            {

                var taskMembers = (from t in _dBContext.TaskMembers.Include(x => x.Employee).Where(x => x.TaskId == task.Id)
                                   select new SelectListDto
                                   {
                                       Id = t.Id,
                                       Name = $"{t.Employee.FirstName} {t.Employee.LastName}",
                                       Photo = t.Employee.ImagePath,
                                       EmployeeId = t.EmployeeId.ToString()
                                   }).ToList();



                var taskMemos = (from t in _dBContext.TaskMemos.Include(x => x.Employee).Where(x => x.TaskId == taskId)
                                 select new TaskMemoDto
                                 {
                                     Employee = new SelectListDto
                                     {
                                         Id = t.EmployeeId,
                                         Name = $"{t.Employee.FirstName} {t.Employee.LastName}",
                                         Photo = t.Employee.ImagePath,
                                     },
                                     DateTime = t.CreatedDate,
                                     Description = t.Description

                                 }).ToList();


                var activityProgress = _dBContext.ActivityProgresses;

                var activityViewDtos = new List<ActivityViewDto>();

                if (task.HasActivityParent)
                {
                    activityViewDtos = (from a in _dBContext.ActivitiesParents.Where(x => x.TaskId == taskId)
                                        join e in _dBContext.Activities.
                                        Include(x=>x.ActivityLocations).ThenInclude(x=>x.Region).                                        
                                        Include(x=>x.ProjectSourceFund)                                      
                                        on a.Id equals e.ActivityParentId
                                        where year > 0 ? a.ShouldStartPeriod.Value.Year == year || a.ShouldEnd.Value.Year == year : true
                                        // join ae in _dBContext.EmployeesAssignedForActivities.Include(x=>x.Employee) on e.Id equals ae.ActivityId
                                        select new ActivityViewDto
                                        {
                                            Id = e.Id,
                                            Name = e.ActivityDescription,
                                            PlannedBudget = e.PlanedBudget,
                                            ActivityType = e.ActivityType.ToString(),
                                           IsTraining = e.IsTraining,
                                         
                                            ActivityNumber = e.ActivityNumber,
                                            Begining = e.Begining,
                                            Target = e.Goal,
                                            UnitOfMeasurment = e.Indicator,
                                            OverAllPerformance = 0,
                                            StartDate = e.ShouldStat.ToString(),
                                            ProjectSource = e.ProjectSourceFund.Name,
                                            EndDate = e.ShouldEnd.ToString(),
                                            Members = e.ProjectTeamId==null? _dBContext.EmployeesAssignedForActivities.Include(x => x.Employee).Where(x => x.ActivityId == e.Id).Select(y => new SelectListDto
                                            {
                                                Id = y.Employee.Id,
                                                Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                                Photo = y.Employee.ImagePath,
                                                EmployeeId = y.EmployeeId.ToString(),

                                            }).ToList():_dBContext.ProjectTeamEmployees.Where(x=>x.ProjectTeamId == e.ProjectTeamId).Include(x=>x.Employee)
                                            .Select(y => new SelectListDto
                                            {
                                                Id = y.Employee.Id,
                                                Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                                Photo = y.Employee.ImagePath,
                                                EmployeeId = y.EmployeeId.ToString(),

                                            }).ToList(),
                                            MonthPerformance = _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == e.Id).OrderBy(x => x.Order).Select(y => new MonthPerformanceViewDto
                                            {
                                                Id = y.Id,
                                                Year = y.Year,
                                                Order = y.Order,
                                                Planned = y.Target,
                                                Actual = activityProgress.Where(x => x.QuarterId == y.Id).Sum(x => x.ActualWorked),
                                                PlannedBudget = y.TargetBudget,
                                                Percentage = y.Target != 0 ? (activityProgress.Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) / y.Target) * 100 : 0

                                            }).ToList(),
                                            OverAllProgress = activityProgress.Where(x => x.ActivityId == e.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) * 100 / e.Goal,
                                            OfficeWork = e.OfficeWork,
                                            FieldWork = e.FieldWork,
                                            StrategicPlan = e.StrategicPlanId,
                                            StrategicPlanIndicator = e.StrategicPlanIndicatorId,
                                            IsPercentage = e.IsPercentage,
                                          
                                          
                                            ProjectSourceId = e.ProjectSourceFundId,

                                            ActivityLocations = e.ActivityLocations.ToList(),
                                            IsCancelled = e.isCancelled,
                                            CreatedDate = e.CreatedDate


                                        }
                                  ).OrderBy(x=>x.CreatedDate).ToList();
                }
                else
                {
                    activityViewDtos = (from e in _dBContext.Activities.OrderBy(x=>x.CreatedDate).
                                          Include(x => x.ActivityLocations).ThenInclude(x => x.Region)
                                        where e.TaskId == task.Id && (year > 0 ? (e.ShouldStat.Year == year || e.ShouldEnd.Year == year): true )                                        
                                        // join ae in _dBContext.EmployeesAssignedForActivities.Include(x=>x.Employee) on e.Id equals ae.ActivityId
                                        select new ActivityViewDto
                                        {
                                            Id = e.Id,
                                            Name = e.ActivityDescription,
                                            PlannedBudget = e.PlanedBudget,
                                            ActivityType = e.ActivityType.ToString(),
                                            IsTraining = e.IsTraining,                                            
                                            ActivityNumber =e.ActivityNumber,
                                            Begining = e.Begining,
                                            Target = e.Goal,
                                            UnitOfMeasurment = e.Indicator,
                                            OverAllPerformance = 0,
                                            StartDate = e.ShouldStat.ToString(),
                                            EndDate = e.ShouldEnd.ToString(),
                                            Members = e.ProjectTeamId == null ? _dBContext.EmployeesAssignedForActivities.Include(x => x.Employee).Where(x => x.ActivityId == e.Id).Select(y => new SelectListDto
                                            {
                                                Id = y.Employee.Id,
                                                Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                                Photo = y.Employee.ImagePath,
                                                EmployeeId = y.EmployeeId.ToString(),

                                            }).ToList() : _dBContext.ProjectTeamEmployees.Where(x => x.ProjectTeamId == e.ProjectTeamId).Include(x => x.Employee)
                                            .Select(y => new SelectListDto
                                            {
                                                Id = y.Employee.Id,
                                                Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                                Photo = y.Employee.ImagePath,
                                                EmployeeId = y.EmployeeId.ToString(),

                                            }).ToList(),
                                            MonthPerformance = _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == e.Id).OrderBy(x => x.Order).Select(y => new MonthPerformanceViewDto
                                            {
                                                Id = y.Id,
                                                Year = y.Year,
                                                Order = y.Order,
                                                Planned = y.Target,
                                                PlannedBudget = y.TargetBudget,
                                                Actual = activityProgress.Where(x => x.QuarterId == y.Id).Sum(x => x.ActualWorked),
                                                Percentage = y.Target != 0 ? (activityProgress.Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) / y.Target) * 100 : 0

                                            }).ToList(),
                                            OverAllProgress = activityProgress.Where(x => x.ActivityId == e.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) * 100 / e.Goal,
                                            OfficeWork = e.OfficeWork,
                                            FieldWork = e.FieldWork,
                                            StrategicPlan = e.StrategicPlanId,
                                            StrategicPlanIndicator = e.StrategicPlanIndicatorId,
                                            IsPercentage = e.IsPercentage,
                                            ActivityLocations = e.ActivityLocations.ToList(),
                                            CreatedDate = e.CreatedDate


                                        }
                                          ).OrderBy(x=>x.CreatedDate).ToList();
                }

                return new TaskVIewDto
                {

                    Id = task.Id,
                    TaskName = task.TaskDescription,
                    TaskMembers = taskMembers,
                    TaskMemos = taskMemos,
                    PlannedBudget = task.PlanedBudget,
                    RemainingBudget = task.PlanedBudget - activityViewDtos.Sum(x => x.PlannedBudget),
                    ActivityViewDtos = activityViewDtos,
                    TaskWeight = activityViewDtos.Sum(x => x.Weight),
                    RemianingWeight = 100 - activityViewDtos.Sum(x => x.Weight),
                    NumberofActivities = _dBContext.Activities.Include(x => x.ActivityParent).Count(x => x.TaskId == task.Id || x.ActivityParent.TaskId == task.Id)
                };
            }
            else
            {
                var plan = await _dBContext.Projects.FirstOrDefaultAsync(x => x.Id == taskId);

                if (plan != null)
                {
                    var taskMembers = (from t in _dBContext.TaskMembers.Include(x => x.Employee).Where(x => x.PlanId == plan.Id)
                                       select new SelectListDto
                                       {
                                           Id = t.Id,
                                           Name = $"{t.Employee.FirstName} {t.Employee.LastName}",
                                           Photo = t.Employee.ImagePath,
                                           EmployeeId = t.EmployeeId.ToString()
                                       }).ToList();



                    var taskMemos = (from t in _dBContext.TaskMemos.Include(x => x.Employee).Where(x => x.PlanId == plan.Id)
                                     select new TaskMemoDto
                                     {
                                         Employee = new SelectListDto
                                         {
                                             Id = t.EmployeeId,
                                             Name = $"{t.Employee.FirstName} {t.Employee.LastName}",
                                             Photo = t.Employee.ImagePath
                                         },
                                         DateTime = t.CreatedDate,
                                         Description = t.Description

                                     }).ToList();


                    var activityProgress = _dBContext.ActivityProgresses;

                    var activityViewDtos = (from e in _dBContext.Activities.OrderBy(x=>x.CreatedDate).
                                            Include(x => x.ActivityLocations).ThenInclude(x => x.Region)
                                            where e.PlanId == plan.Id && (year > 0 ? (e.ShouldStat.Year == year || e.ShouldEnd.Year == year) : true)
                                            // join ae in _dBContext.EmployeesAssignedForActivities.Include(x=>x.Employee) on e.Id equals ae.ActivityId
                                            select new ActivityViewDto
                                            {
                                                Id = e.Id,
                                                Name = e.ActivityDescription,
                                                PlannedBudget = e.PlanedBudget,
                                                ActivityType = e.ActivityType.ToString(),
                                               
                                                ActivityNumber= e.ActivityNumber,
                                                IsTraining = e.IsTraining,
                                                Begining = e.Begining,
                                                Target = e.Goal,
                                                UnitOfMeasurment = e.Indicator,
                                                OverAllPerformance = 0,
                                                StartDate = e.ShouldStat.ToString(),
                                                EndDate = e.ShouldEnd.ToString(),
                                                Members = _dBContext.EmployeesAssignedForActivities.Include(x => x.Employee).Where(x => x.ActivityId == e.Id).Select(y => new SelectListDto
                                                {
                                                    Id = y.Employee.Id,
                                                    Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                                                    Photo = y.Employee.ImagePath,
                                                    EmployeeId = y.EmployeeId.ToString(),

                                                }).ToList(),
                                                MonthPerformance = _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == e.Id).OrderBy(x => x.Order).Select(y => new MonthPerformanceViewDto
                                                {
                                                    Id = y.Id,
                                                    Year = y.Year,
                                                    Order = y.Order,
                                                    Planned = y.Target,
                                                    Actual = activityProgress.Where(x => x.QuarterId == y.Id).Sum(x => x.ActualWorked),
                                                    Percentage = y.Target != 0 ? (activityProgress.Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) / y.Target) * 100 : 0

                                                }).ToList(),
                                                OverAllProgress = activityProgress.Where(x => x.ActivityId == e.Id && x.IsApprovedByDirector == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByFinance == EnumList.ApprovalStatus.APPROVED && x.IsApprovedByManager == EnumList.ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) * 100 / e.Goal,
                                                OfficeWork = e.OfficeWork,
                                                FieldWork = e.FieldWork,
                                                StrategicPlan = e.StrategicPlanId,
                                                StrategicPlanIndicator = e.StrategicPlanIndicatorId,
                                                IsPercentage = e.IsPercentage,
                                                ActivityLocations = e.ActivityLocations.ToList(),
                                                CreatedDate = e.CreatedDate



                                            }
                                            ).OrderBy(x=>x.CreatedDate).ToList();

                    return new TaskVIewDto
                    {

                        Id = plan.Id,
                        TaskName = plan.ProjectName,
                        TaskMembers = taskMembers,
                        TaskMemos = taskMemos,
                        PlannedBudget = plan.PlannedBudget,
                        RemainingBudget = plan.PlannedBudget - activityViewDtos.Sum(x => x.PlannedBudget),
                        ActivityViewDtos = activityViewDtos,
                        TaskWeight = activityViewDtos.Sum(x => x.Weight),
                        RemianingWeight = 100 - activityViewDtos.Sum(x => x.Weight),
                        NumberofActivities = activityViewDtos.Count()
                    };
                }

            }
            return new TaskVIewDto();

        }
        public async Task<int> AddTaskMemebers(TaskMembersDto taskMembers)
        {
            if (taskMembers.RequestFrom == "PLAN")
            {
                foreach (var e in taskMembers.Employee)
                {
                    var taskMemebers1 = new TaskMembers
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        EmployeeId = e.Id,
                        PlanId = taskMembers.TaskId
                    };
                    await _dBContext.AddAsync(taskMemebers1);
                    await _dBContext.SaveChangesAsync();
                }
            }
            else
            {
                foreach (var e in taskMembers.Employee)
                {
                    var taskMemebers1 = new TaskMembers
                    {
                        Id = Guid.NewGuid(),
                        CreatedDate = DateTime.Now,
                        EmployeeId = e.Id,
                        TaskId = taskMembers.TaskId
                    };
                    await _dBContext.AddAsync(taskMemebers1);
                    await _dBContext.SaveChangesAsync();
                }
            }
         
            return 1;
        }
        public async Task<List<SelectListDto>> GetEmployeesNoTaskMembersSelectList(Guid taskId)
        {
            var taskMembers = _dBContext.TaskMembers.Where(x =>
            (x.TaskId != Guid.Empty && x.TaskId == taskId) ||
            (x.PlanId != Guid.Empty && x.PlanId == taskId) ||
            (x.ActivityParentId != Guid.Empty && x.ActivityParentId == taskId)
            ).Select(x => x.EmployeeId).ToList();

            var EmployeeSelectList = await (from e in _dBContext.Employees
                                            where !(taskMembers.Contains(e.Id))
                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = $"{e.FirstName} {e.LastName}"
                                            }).ToListAsync();

            return EmployeeSelectList;
        }

        public async Task<List<SelectListDto>> GetTasksSelectList(Guid PlanId)
        {

            return await _dBContext.Tasks.Where(x => x.ProjectId == PlanId).
                Select(x => new SelectListDto { Id = x.Id, Name = x.TaskDescription }).ToListAsync();
        }


        public async Task<List<SelectListDto>> GetActivitieParentsSelectList(Guid TaskId)
        {
            return await _dBContext.ActivitiesParents.Where(x=>x.TaskId==TaskId).Select(x=> new SelectListDto
            {
                Id= x.Id,
                Name = x.ActivityParentDescription
            }).ToListAsync();
        }

        public async Task<List<SelectListDto>> GetActivitiesSelectList(Guid? planId, Guid? taskId, Guid? actParentId)
        {

            if (planId != null)
            {
                return await _dBContext.Activities.Where(x => x.PlanId == planId)
             .Select(x => new SelectListDto
             {
                 Id = x.Id,
                 Name = x.ActivityDescription
             }).ToListAsync();

            }
            if (taskId != null )
            {
                return await _dBContext.Activities.Where(x => x.TaskId == taskId)
             .Select(x => new SelectListDto
             {
                 Id = x.Id,
                 Name = x.ActivityDescription
             }).ToListAsync();

            }
            return await _dBContext.Activities.Where(x=>x.ActivityParentId == actParentId)
                .Select(x=> new SelectListDto
                {
                    Id = x.Id,
                    Name = x.ActivityDescription
                }).ToListAsync() ;
        }


        public async Task<ResponseMessage> UpdateTask(TaskDto updateTask)
        {
            try
            {
                var task = await _dBContext.Tasks.FindAsync(updateTask.Id);

                if (task != null)
                {
                    task.TaskDescription = updateTask.TaskDescription;
                    task.PlanedBudget = updateTask.PlannedBudget;
                    task.HasActivityParent = updateTask.HasActvity;
                    task.ShouldStartPeriod = updateTask.StartDate;
                    task.ShouldEnd = updateTask.EndDate;

                    await _dBContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Task Updated Successfully"
                    };
                }
                else
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Task Not Found"
                    };

                }
            }
            catch(Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message

                };
            }
            

        }

        public async Task<ResponseMessage> DeleteTask(Guid taskId)
        {
            try
            {
                
                var task = await _dBContext.Tasks.FindAsync(taskId);

                if (task != null)
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




                            }
                        }

                        _dBContext.ActivitiesParents.RemoveRange(activityParents);
                        await _dBContext.SaveChangesAsync();

                    }
                    var actvities2 = await _dBContext.Activities.Where(x => x.ActivityParentId == task.Id).ToListAsync();

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


                            if (activityTargets.Any())
                            {
                                _dBContext.EmployeesAssignedForActivities.RemoveRange(employees);
                                await _dBContext.SaveChangesAsync();
                            }

                            if (activityParents.Any())
                            {
                                _dBContext.ActivitiesParents.RemoveRange(activityParents);
                                await _dBContext.SaveChangesAsync();
                            }


                        }

                        _dBContext.Activities.RemoveRange(actvities2);
                        await _dBContext.SaveChangesAsync();
                    }
                    _dBContext.Tasks.Remove(task);
                    await _dBContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                        Message = "Task Deleted Successfully",
                        Success = true
                    };

                }
                else
                {
                   
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Task Not Found"
                    };

                }
            }
            catch(Exception ex) 
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message

                };
            }
        }

    }
}
