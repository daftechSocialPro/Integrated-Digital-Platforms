using Azure.Core;
using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Models.PM;
using Microsoft.AspNetCore.Hosting.Server;

using Microsoft.EntityFrameworkCore;


using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedDigitalAPI.Services.PM.Activity
{
    public class ActivityService : IActivityService
    {
        private readonly ApplicationDbContext _dBContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IEmailService _emailService;
        public ActivityService(ApplicationDbContext context, IGeneralConfigService generalConfig, IEmailService emailService)
        {
            _dBContext = context;
            _generalConfig = generalConfig;
            _emailService = emailService;
        }

        public async Task<int> AddActivityDetails(ActivityDetailDto activityDetail)
        {


            var actparent = _dBContext.ActivitiesParents.Where(x => x.TaskId == activityDetail.TaskId).FirstOrDefault();


            ActivityParent activityParent = new ActivityParent();

            if (actparent != null)
            {
                activityParent = actparent;
            }
            else {
                activityParent.Id = Guid.NewGuid();
                
                activityParent.CreatedDate = DateTime.Now;
                activityParent.CreatedById = activityDetail.CreatedBy.ToString();
                activityParent.ActivityParentDescription = activityDetail.ActivityDescription;
                activityParent.HasActivity = activityDetail.HasActivity;
                activityParent.TaskId = activityDetail.TaskId;
                await _dBContext.AddAsync(activityParent);
            }

            foreach (var item in activityDetail.ActivityDetails)
            {


                IntegratedInfrustructure.Models.PM.Activity activity = new IntegratedInfrustructure.Models.PM.Activity();
                activity.Id = Guid.NewGuid();
                activity.CreatedDate = DateTime.Now;
                activity.CreatedBy = activityParent.CreatedBy;
                activity.ActivityParentId = activityParent.Id;
                activity.ActivityDescription = item.SubActivityDesctiption;
                activity.ActivityType = item.ActivityType == 0 ? ActivityType.OFFICE_WORK : ActivityType.FIELD_WORK;
                activity.Begining = item.PreviousPerformance;
                if (item.CommiteeId != null)
                {
                    activity.ProjectTeamId = item.CommiteeId;
                }
                activity.FieldWork = item.FieldWork;
                activity.Goal = item.Goal;
                activity.OfficeWork = item.OfficeWork;
                activity.PlanedBudget = item.PlannedBudget;
                activity.UnitOfMeasurementId = item.UnitOfMeasurement;
                
                activity.ShouldStat =  DateTime.Parse(item.StartDate);
                activity.ShouldEnd = DateTime.Parse(item.EndDate);
                activity.StrategicPlanId = item.StrategicPlanId;
                activity.ZoneId = item.ZoneId;
                activity.Woreda = item.Woreda;
                activity.ActivityNumber = item.ActivityNumber;
                activity.Longtude = item.Longtude;
                activity.Latitude = item.Latitude;

                await _dBContext.Activities.AddAsync(activity);
                await _dBContext.SaveChangesAsync();
                if (item.Employees != null)
                {
                    foreach (var employee in item.Employees)
                    {
                        if (!string.IsNullOrEmpty(employee))
                        {
                            EmployeesAssignedForActivities EAFA = new EmployeesAssignedForActivities
                            {
                                CreatedDate = DateTime.Now,
                                CreatedBy = activityParent.CreatedBy,
                              
                                Id = Guid.NewGuid(),

                                ActivityId = activity.Id,
                                EmployeeId = Guid.Parse(employee),
                            };
                            await _dBContext.EmployeesAssignedForActivities.AddAsync(EAFA);
                            await _dBContext.SaveChangesAsync();
                        }
                    }
                }

            }



            var Task = await _dBContext.Tasks.FirstOrDefaultAsync(x => x.Id.Equals(activityDetail.TaskId));
            if (Task != null)
            {
                var plan = _dBContext.Projects.FirstOrDefaultAsync(x => x.Id.Equals(Task.ProjectId)).Result;
                if (plan != null)
                {
                    var ActParent = _dBContext.ActivitiesParents.Find(activityParent.Id);
                    var Activities = _dBContext.Activities.Where(x => x.ActivityParentId == activityParent.Id);
                    if (ActParent != null && Activities != null)
                    {
                        ActParent.ShouldStartPeriod = Activities.Min(x => x.ShouldStat);
                        ActParent.ShouldEnd = Activities.Max(x => x.ShouldEnd);
                        ActParent.Weight = Activities.Sum(x => x.Weight);
                        _dBContext.SaveChanges();
                    }
                    var ActParents = _dBContext.ActivitiesParents.Where(x => x.TaskId == Task.Id).ToList();
                    if (Task != null && ActParents != null)
                    {
                        Task.ShouldStartPeriod = ActParents.Min(x => x.ShouldStartPeriod);
                        Task.ShouldEnd = ActParents.Max(x => x.ShouldEnd);
                        Task.Weight = ActParents.Sum(x => x.Weight);
                        _dBContext.SaveChanges();
                    }
                    var tasks = _dBContext.Tasks.Where(x => x.ProjectId == plan.Id).ToList();
                    //plan.PeriodStartAt = tasks.Min(x => x.ShouldStartPeriod);
                    //plan.PeriodEndAt = tasks.Max(x => x.ShouldEnd);
                    _dBContext.SaveChanges();
                }
            }
            return 1;
        }



        public async Task<int> AddSubActivity(SubActivityDetailDto activityDetail)
        {
            IntegratedInfrustructure.Models.PM.Activity activity = new IntegratedInfrustructure.Models.PM.Activity();
            activity.Id = Guid.NewGuid();
            activity.CreatedDate = DateTime.Now;
            activity.CreatedById = activityDetail.CreatedBy.ToString();
            activity.ActivityDescription = activityDetail.SubActivityDesctiption;
            activity.ActivityType = (ActivityType)activityDetail.ActivityType;
            activity.Begining = activityDetail.PreviousPerformance;
            if (activityDetail.CommiteeId != null)
            {
                activity.ProjectTeamId = activityDetail.CommiteeId;
            }
            activity.FieldWork = activityDetail.FieldWork;
            activity.Goal = activityDetail.Goal;
            activity.OfficeWork = activityDetail.OfficeWork;
            activity.PlanedBudget = activityDetail.PlannedBudget;
            activity.UnitOfMeasurementId = activityDetail.UnitOfMeasurement;
           
            activity.StrategicPlanId = activityDetail.StrategicPlanId;
            activity.ZoneId = activityDetail.ZoneId;
            activity.Woreda = activityDetail.Woreda;
            activity.ActivityNumber = activityDetail.ActivityNumber;

            activity.Longtude = activityDetail.Longtude;
            activity.Latitude = activityDetail.Latitude;

            if (activityDetail.PlanId != null)
            {
                activity.PlanId = activityDetail.PlanId;
            }
            else if(activityDetail.TaskId != null)
            {
                activity.TaskId = activityDetail.TaskId;
            }
            activity.ShouldStat = DateTime.Parse(activityDetail.StartDate);
            activity.ShouldEnd = DateTime.Parse(activityDetail.EndDate);

           
            await _dBContext.Activities.AddAsync(activity);
            await _dBContext.SaveChangesAsync();
            if (activityDetail.Employees != null)
            {
                foreach (var employee in activityDetail.Employees)
                {
                    if (!string.IsNullOrEmpty(employee))
                    {
                        EmployeesAssignedForActivities EAFA = new EmployeesAssignedForActivities
                        {
                            CreatedDate = DateTime.Now,
                            CreatedById = activityDetail.CreatedBy.ToString(),
                          
                            Id = Guid.NewGuid(),

                            ActivityId = activity.Id,
                            EmployeeId = Guid.Parse(employee),
                        };
                        await _dBContext.EmployeesAssignedForActivities.AddAsync(EAFA);
                        await _dBContext.SaveChangesAsync();
                    }
                }
            }



            if (activityDetail.PlanId != Guid.Empty&& activityDetail.PlanId!=null)
            {
                var plan = await _dBContext.Projects.FirstOrDefaultAsync(x => x.Id.Equals(activityDetail.PlanId));
                //if(plan != null)
                //{
                //    plan.PeriodStartAt = activity.ShouldStat;
                //    plan.PeriodEndAt = activity.ShouldEnd;
                //}
            }
            else if (activityDetail.TaskId != Guid.Empty)
            {
                var Task = await _dBContext.Tasks.FirstOrDefaultAsync(x => x.Id.Equals(activityDetail.TaskId));
                if (Task != null)
                {
                    var plan = await _dBContext.Projects.FirstOrDefaultAsync(x => x.Id.Equals(Task.ProjectId));

                    Task.ShouldStartPeriod = activity.ShouldStat;
                    Task.ShouldEnd = activity.ShouldEnd;
                    Task.Weight = activity.Weight;
                    if(plan != null)
                    {
                        var tasks = await _dBContext.Tasks.Where(x => x.ProjectId == plan.Id).ToListAsync();
                        //plan.PeriodStartAt = tasks.Min(x => x.ShouldStartPeriod);
                        //plan.PeriodEndAt = tasks.Max(x => x.ShouldEnd);
                    }
                }
            }
            _dBContext.SaveChanges();
            return 1;
        }


        public async Task<int> AddTargetActivities(ActivityTargetDivisionDto targetDivisions)
        {

            foreach (var target in targetDivisions.TargetDivisionDtos)
            {

                var targetDivision = new ActivityTargetDivision
                {
                    Id = Guid.NewGuid(),
                    CreatedById = targetDivisions.CreatedBy.ToString(),
                    CreatedDate = DateTime.Now,
                    ActivityId = targetDivisions.ActiviyId,
                    Order = target.Order + 1,
                    Target = target.Target,
                    TargetBudget = target.TargetBudget,

                };

                await _dBContext.ActivityTargetDivisions.AddAsync(targetDivision);
                await _dBContext.SaveChangesAsync();
            }





            return 1;

        }

        public async Task<ResponseMessage> AddProgress(AddProgressActivityDto activityProgress)
        {

            try
            {

                var Goal = _dBContext.Activities.Find(activityProgress.ActivityId).Goal- _dBContext.Activities.Find(activityProgress.ActivityId).Begining;
                var progressGoal = _dBContext.ActivityProgresses.Where(x => x.ActivityId == activityProgress.ActivityId && !x.IsDraft).Sum(x => x.ActualWorked);

                if (Goal < (progressGoal + activityProgress.ActualWorked))
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Actual worked greater than Target !!! "
                    };
                }

                var activityProgress2 = new ActivityProgress
                {
                    Id = Guid.NewGuid(),
                    CreatedDate = DateTime.Now,
                    Remark = activityProgress.Remark,
                    //FinanceDocumentPath = activityProgress.FinacncePath,
                    QuarterId = activityProgress.QuarterId,
                    ActualBudget = activityProgress.ActualBudget,
                    ActualWorked = activityProgress.ActualWorked,
                    progressStatus = int.Parse(activityProgress.ProgressStatus) == 0 ? ProgressStatus.SIMPLEPROGRESS : ProgressStatus.FINALIZE,
                    ActivityId = activityProgress.ActivityId,
                    CreatedById = activityProgress.CreatedBy.ToString(),
                    EmployeeValueId = activityProgress.EmployeeValueId,
                    Lat = activityProgress.lat,
                    Lng = activityProgress.lng,
                    IsDraft = Boolean.Parse(activityProgress.IsDraft),
                };

                if (activityProgress.Finacnce != null)
                {
                    var financePath = _generalConfig.UploadFiles(activityProgress.Finacnce, $"{activityProgress.Id.ToString()}-Finance", "PM/Progress").Result.ToString();
                    activityProgress2.FinanceDocumentPath = financePath;
                }


                await _dBContext.ActivityProgresses.AddAsync(activityProgress2);
                await _dBContext.SaveChangesAsync();

                if (activityProgress.Dcouments != null)
                {

                    foreach (var file in activityProgress.Dcouments)
                    {

                        var attachment = new ProgressAttachment()
                        {
                            Id = Guid.NewGuid(),
                            CreatedById = activityProgress.CreatedBy.ToString(),
                            CreatedDate = DateTime.Now,

                            ActivityProgressId = activityProgress2.ActivityId
                        };

                        var documentPath = _generalConfig.UploadFiles(file, $"{attachment.Id.ToString()}-Document", "PM/Progress").Result.ToString();

                        attachment.FilePath = documentPath;

                        await _dBContext.ProgressAttachments.AddAsync(attachment);
                        await _dBContext.SaveChangesAsync();

                    }
                }

           
                var ac = _dBContext.Activities.Find(activityProgress2.ActivityId);
                ac.Status = activityProgress2.progressStatus == ProgressStatus.SIMPLEPROGRESS ? Status.ONPROGRESS : Status.FINALIZED;
                if (ac.ActualStart == null)
                {
                    ac.ActualStart = DateTime.Now;
                }
                if (activityProgress2.progressStatus == ProgressStatus.FINALIZE)
                {
                    ac.ActualEnd = DateTime.Now;
                }
                ac.ActualWorked += activityProgress2.ActualWorked;
                ac.ActualBudget += activityProgress2.ActualBudget;


                await _dBContext.SaveChangesAsync();

                if (!bool.Parse(activityProgress.IsDraft))
                {
                    var employeee = _dBContext.Employees.Find(activityProgress.Id);
                    var employee = new EmployeeList();
                    if (ac.ActivityParentId != null)
                        employee = ac.ActivityParent.Task.Project.ProjectManager;
                    if (ac.TaskId != null)
                        employee = ac.Task.Project.ProjectManager;
                    if (ac.PlanId != null)
                        employee = ac.Plan.ProjectManager;

                    var email = new EmailMetadata
                    (employee.Email, "Activity Progress Approval",
                        $"Dear {employee.FirstName} {employee.MiddleName} {employee.LastName},\n\nEmployee {employeee.FirstName} {employeee.MiddleName} {employeee.LastName} has been report a progress on {ac.ActivityDescription}." +
                        $" Please review the Progress and provide your approval.\n\nThank you.\n\nSincerely,\nEMIA");
                    await _emailService.Send(email);

                }




                return new ResponseMessage
                {
                    Success = true,
                    Message = "Progress Updated Successfully !!!"
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

        public async Task<ResponseMessage> UpdateProgress(AddProgressActivityDto activityProgress)
        {

            try
            {
                





                var actProgress = _dBContext.ActivityProgresses
                    .Include(x=>x.EmployeeValue)
                    .Include(x=>x.Activity)
                    .Where(x=>x.Id==activityProgress.Id).FirstOrDefault();
                if (actProgress!=null)
                {


                    var Goal = actProgress.Activity.Goal- actProgress.Activity.Begining;
                    var progressGoal = _dBContext.ActivityProgresses.Where(x => x.ActivityId == actProgress.ActivityId && !x.IsDraft).Sum(x => x.ActualWorked);

                    if (Goal < (progressGoal + activityProgress.ActualWorked))
                    {
                        return new ResponseMessage
                        {
                            Success = false,
                            Message = "Actual worked greater than Target "
                        };
                    }
                    var oldActualWorked = actProgress.ActualWorked;
                    var oldActualBudget = actProgress.ActualBudget;

                    if (actProgress != null)
                    {

                        actProgress.QuarterId = activityProgress.QuarterId;
                        actProgress.ActualBudget = activityProgress.ActualBudget;
                        actProgress.ActualWorked = activityProgress.ActualWorked;
                        actProgress.progressStatus = int.Parse(activityProgress.ProgressStatus) == 0 ? ProgressStatus.SIMPLEPROGRESS : ProgressStatus.FINALIZE;
                        actProgress.Lat = activityProgress.lat;
                        actProgress.Lng = activityProgress.lng;
                        actProgress.IsDraft = Boolean.Parse(activityProgress.IsDraft);
                        actProgress.Remark = activityProgress.Remark;
                        if (activityProgress.Finacnce != null)
                        {
                            var financePath = _generalConfig.UploadFiles(activityProgress.Finacnce, $"{actProgress.Id.ToString()}-Finance", "PM/Progress").Result.ToString();
                            actProgress.FinanceDocumentPath = financePath;
                        }

                    }


                    await _dBContext.SaveChangesAsync();

                    if (activityProgress.Dcouments != null)
                    {

                        foreach (var file in activityProgress.Dcouments)
                        {

                            var attachment = new ProgressAttachment()
                            {
                                Id = Guid.NewGuid(),
                                CreatedById = activityProgress.CreatedBy.ToString(),
                                CreatedDate = DateTime.Now,

                                ActivityProgressId = actProgress.ActivityId
                            };

                            var documentPath = _generalConfig.UploadFiles(file, $"{attachment.Id.ToString()}-Document", "PM/Progress").Result.ToString();

                            attachment.FilePath = documentPath;

                            await _dBContext.ProgressAttachments.AddAsync(attachment);
                            await _dBContext.SaveChangesAsync();

                        }
                    }

                    var ac = _dBContext.Activities
                        
                        .Include(x=>x.ActivityParent.Task.Project.ProjectManager)
                        .Include(x=>x.Task.Project.ProjectManager)
                        .Include(x=>x.Plan.ProjectManager)                        
                        .Where(x=>x.Id==activityProgress.ActivityId).FirstOrDefault();

                    ac.Status = actProgress.progressStatus == ProgressStatus.SIMPLEPROGRESS ? Status.ONPROGRESS : Status.FINALIZED;
                    if (ac.ActualStart == null)
                    {
                        ac.ActualStart = DateTime.Now;
                    }
                    if (actProgress.progressStatus == ProgressStatus.FINALIZE)
                    {
                        ac.ActualEnd = DateTime.Now;
                    }

                    ac.ActualWorked -= oldActualWorked;
                    ac.ActualBudget -= oldActualBudget;

                    ac.ActualWorked += actProgress.ActualWorked;
                    ac.ActualBudget += actProgress.ActualBudget;


                    await _dBContext.SaveChangesAsync();


                    if (!bool.Parse(activityProgress.IsDraft))
                    {
                        var  employee = new EmployeeList();
                        if(ac.ActivityParentId!=null)
                            employee = ac.ActivityParent.Task.Project.ProjectManager;
                        if (ac.TaskId != null)
                            employee = ac.Task.Project.ProjectManager;
                        if (ac.PlanId != null)
                            employee = ac.Plan.ProjectManager;

                        var email = new EmailMetadata
                        (employee.Email, "Activity Progress Approval",
                            $"Dear {employee.FirstName} {employee.MiddleName} {employee.LastName},\n\nEmployee {actProgress.EmployeeValue.FirstName} {actProgress.EmployeeValue.MiddleName} {actProgress.EmployeeValue.LastName} has been report a progress on {actProgress.Activity.ActivityDescription}." +
                            $" Please review the Progress and provide your approval.\n\nThank you.\n\nSincerely,\nEMIA");
                        await _emailService.Send(email);



                    }

                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Progress Updated Successfully !!!"
                    };
                }
                else
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "No Progress Found !!!"
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

        public async Task<List<ProgressViewDto>> ViewProgress(Guid actId)
        {


            var progressView = await (from p in _dBContext.ActivityProgresses.Where(x => x.ActivityId == actId)
                                      select new ProgressViewDto
                                      {
                                          Id = p.Id,
                                          ActalWorked = p.ActualWorked,
                                          UsedBudget = p.ActualBudget,
                                        
                                          IsApprovedByManager = p.IsApprovedByManager.ToString(),
                                          IsApprovedByFinance = p.IsApprovedByFinance.ToString(),
                                          IsApprovedByDirector = p.IsApprovedByDirector.ToString(),
                                          ManagerApprovalRemark = p.CoordinatorApprovalRemark,
                                          FinanceApprovalRemark = p.FinanceApprovalRemark,
                                          DirectorApprovalRemark = p.DirectorApprovalRemark,
                                          FinanceDocument = p.FinanceDocumentPath,
                                          Documents = _dBContext.ProgressAttachments.Where(x => x.ActivityProgressId == p.Id).Select(y => y.FilePath).ToArray(),
                                          CreatedAt = p.CreatedDate

                                      }).ToListAsync();

            return progressView;




        }

        public async Task<ProgressViewDto> ViewDraftProgress(Guid actId)
        {
            var progressView = await (from p in _dBContext.ActivityProgresses.Where(x => x.ActivityId == actId&&x.IsDraft)
                                      select new ProgressViewDto
                                      {
                                          Id = p.Id,
                                          ActalWorked = p.ActualWorked,
                                          UsedBudget = p.ActualBudget,
                                          QuarterId=p.QuarterId,
                                          Remark =p.Remark,

                                          IsApprovedByManager = p.IsApprovedByManager.ToString(),
                                          IsApprovedByFinance = p.IsApprovedByFinance.ToString(),
                                          IsApprovedByDirector = p.IsApprovedByDirector.ToString(),
                                          ManagerApprovalRemark = p.CoordinatorApprovalRemark,
                                          FinanceApprovalRemark = p.FinanceApprovalRemark,
                                          DirectorApprovalRemark = p.DirectorApprovalRemark,
                                          FinanceDocument = p.FinanceDocumentPath,
                                          Documents = _dBContext.ProgressAttachments.Where(x => x.ActivityProgressId == p.Id).Select(y => y.FilePath).ToArray(),
                                          CreatedAt = p.CreatedDate

                                      }).FirstOrDefaultAsync();

            return progressView;
        }
        public async Task<List<ActivityViewDto>> GetAssignedActivity(Guid employeeId)
        {

            var employeeAssigned = _dBContext.EmployeesAssignedForActivities.Where(x => x.EmployeeId == employeeId).Select(x => x.ActivityId).ToList();



            var activityProgress = _dBContext.ActivityProgresses;
            List<ActivityViewDto> assignedActivities =
                await (from e in _dBContext.Activities
                       .Include(x => x.UnitOfMeasurement)
                        .Include(x => x.Zone).ThenInclude(x => x.Region).ThenInclude(x => x.Country)
                       .Include(x=>x.Commitee).ThenInclude(x=>x.Employees)
                       .Where(x=>x.ActualEnd==null)
                       where employeeAssigned.Contains(e.Id)||(e.ProjectTeamId!=null?e.Commitee.Employees.Select(x=>x.EmployeeId).Contains(employeeId):false)
                       select new ActivityViewDto
                       {
                           Id = e.Id,
                           Name = e.ActivityDescription,
                           PlannedBudget = e.PlanedBudget,
                           ActivityType = e.ActivityType.ToString(),
                           ProjectLocation = $"{e.Woreda}-{e.Zone.ZoneName}-{e.Zone.Region.RegionName}-{e.Zone.Region.Country.CountryName}",

                           ProjectLocationLng = e.Longtude,
                           ProjectLocationLat = e.Latitude,
                           ActivityNumber = e.ActivityNumber,
                           
                           Begining = e.Begining,
                           Target = e.Goal,
                           UnitOfMeasurment = e.UnitOfMeasurement.Name,
                           OverAllPerformance = 0,
                           StartDate = e.ShouldStat.ToString(),
                           EndDate = e.ShouldEnd.ToString(),
                           Members = _dBContext.EmployeesAssignedForActivities.Include(x => x.Employee).Where(x => x.ActivityId == e.Id).Select(y => new SelectListDto
                           {
                               Id = y.Id,
                               Name = $"{y.Employee.FirstName} {y.Employee.LastName}",
                               Photo = y.Employee.ImagePath,
                               EmployeeId = y.EmployeeId.ToString(),

                           }).ToList(),
                           MonthPerformance = _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == e.Id).OrderBy(x => x.Order).Select(y => new MonthPerformanceViewDto
                           {
                               Id = y.Id,
                               Order = y.Order,
                               Planned = y.Target,
                               Actual = activityProgress.Where(x => x.QuarterId == y.Id).Sum(mp => mp.ActualWorked),
                               Percentage = y.Target != 0 ? (activityProgress.Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == ApprovalStatus.APPROVED && x.IsApprovedByFinance == ApprovalStatus.APPROVED && x.IsApprovedByManager == ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) / y.Target) * 100 : 0


                           }).ToList()




                       }
                                    ).ToListAsync();


            

            return assignedActivities;
        }

        public async Task<List<ActivityViewDto>> GetActivtiesForApproval(Guid employeeId)
        {


            try
            {


                var not = (from p in _dBContext.Projects.Where(x => ( x.ProjectManagerId == employeeId))
                           join a in _dBContext.Activities on p.Id equals a.PlanId
                           join ap in _dBContext.ActivityProgresses on a.Id equals ap.ActivityId
                           select new
                           {

                               ap.Id,
                           }).Union(from p in _dBContext.Projects.Where(x => (x.ProjectManagerId == employeeId))
                                    join t in _dBContext.Tasks on p.Id equals t.ProjectId
                                    join a in _dBContext.Activities on t.Id equals a.TaskId
                                    join ap in _dBContext.ActivityProgresses on a.Id equals ap.ActivityId
                                    select new
                                    {
                                        ap.Id,
                                    }).Union(from p in _dBContext.Projects.Where(x => (x.ProjectManagerId == employeeId))
                                             join t in _dBContext.Tasks on p.Id equals t.ProjectId
                                             join ac in _dBContext.ActivitiesParents on t.Id equals ac.TaskId
                                             join a in _dBContext.Activities on ac.Id equals a.ActivityParentId
                                             join ap in _dBContext.ActivityProgresses on a.Id equals ap.ActivityId
                                             select new
                                             {
                                                 ap.Id,
                                             }).ToList();



                List<ActivityViewDto> actDtos = new List<ActivityViewDto>();


                var activityProgress = _dBContext.ActivityProgresses.Where(x=>!x.IsDraft);
                foreach (var activitprogress in not)
                {

                    var activityViewDtos = (from e in _dBContext.ActivityProgresses.Include(x => x.Activity.ActivityParent.Task.Project.Department).Include(x=>x.Activity.Zone.Region.Country).Where(a => a.Id == activitprogress.Id && (a.IsApprovedByManager == ApprovalStatus.PENDING || a.IsApprovedByDirector == ApprovalStatus.PENDING || a.IsApprovedByFinance == ApprovalStatus.PENDING))
                                                // join ae in _dBContext.EmployeesAssignedForActivities.Include(x=>x.Employee) on e.Id equals ae.ActivityId
                                            select new ActivityViewDto
                                            {
                                                Id = e.ActivityId,
                                                Name = e.Activity.ActivityDescription,
                                                PlannedBudget = e.Activity.PlanedBudget,
                                                ActivityType = e.Activity.ActivityType.ToString(),
                                                ProjectLocation = $"{e.Activity.Woreda}-{e.Activity.Zone.ZoneName}-{e.Activity.Zone.Region.RegionName}-{e.Activity.Zone.Region.Country.CountryName}",

                                                ProjectLocationLng = e.Activity.Longtude,
                                                ProjectLocationLat = e.Activity.Latitude,
                                                Begining = e.Activity.Begining,
                                                Target = e.Activity.Goal,
                                                UnitOfMeasurment = e.Activity.UnitOfMeasurement.Name,
                                                OverAllPerformance = 0,
                                                StartDate = e.Activity.ShouldStat.ToString(),
                                                EndDate = e.Activity.ShouldEnd.ToString(),
                                                Members = _dBContext.EmployeesAssignedForActivities.Include(x => x.Employee).Where(x => x.ActivityId == e.ActivityId).Select(y => new SelectListDto
                                                {
                                                    Id = y.Id,
                                                    Name = $"{y.Employee.FirstName} {y.Employee.LastName}" ,
                                                    Photo = y.Employee.ImagePath,
                                                    EmployeeId = y.EmployeeId.ToString(),

                                                }).ToList(),
                                                MonthPerformance = _dBContext.ActivityTargetDivisions.Where(x => x.ActivityId == e.ActivityId).OrderBy(x => x.Order).Select(y => new MonthPerformanceViewDto
                                                {
                                                    Id = y.Id,
                                                    Order = y.Order,
                                                    Planned = y.Target,
                                                    Actual = activityProgress.Where(x=>x.QuarterId==y.Id).Sum(mp=>mp.ActualWorked),
                                                    Percentage = y.Target != 0 ? (activityProgress.Where(x => x.QuarterId == y.Id && x.IsApprovedByDirector == ApprovalStatus.APPROVED && x.IsApprovedByFinance == ApprovalStatus.APPROVED && x.IsApprovedByManager == ApprovalStatus.APPROVED).Sum(x => x.ActualWorked) / y.Target) * 100 : 0


                                                }).ToList(),
                                                //OverAllProgress = activityProgress.Where(x=>x.ActivityId == e.ActivityId && x.IsApprovedByDirector == approvalStatus.approved && x.IsApprovedByFinance == approvalStatus.approved && x.IsApprovedByManager == approvalStatus.approved).Sum(x=>x.ActualWorked) * 100 /e.Activity.Goal,

                                                ProgresscreatedAt = e.CreatedDate.ToString(),
                                                IsProjectManager = e.Activity.Plan.ProjectManagerId == employeeId || e.Activity.Task.Project.ProjectManagerId == employeeId || e.Activity.ActivityParent.Task.Project.ProjectManagerId == employeeId ? true : false,

                                                //IsDirector = _dBContext.Employees.Include(x => x.).Any(x => (x.Id == employeeId && x.Position == Position.Director) && (x.OrganizationalStructureId == e.Activity.Plan.StructureId || x.OrganizationalStructureId == e.Activity.Task.Plan.StructureId || x.OrganizationalStructureId == e.Activity.ActivityParent.Task.Plan.StructureId))


                                            }
                                       ).ToList();
                    actDtos.AddRange(activityViewDtos);
                }



                return actDtos.DistinctBy(x => x.Id).ToList();
            }
            catch(Exception ex)
            {
                List<ActivityViewDto> actDtos = new List<ActivityViewDto>();

                return actDtos;
            }


            //}
        }
        public async Task<int> ApproveProgress(ApprovalProgressDto approvalProgressDto)
        {
            var progress = _dBContext.ActivityProgresses.Find(approvalProgressDto.progressId);
            if (progress != null)
            {
                if (approvalProgressDto.userType == "Director")
                {
                    progress.DirectorApprovalRemark = approvalProgressDto.Remark;
                    if (approvalProgressDto.actiontype == "Accept")
                    {
                        progress.IsApprovedByDirector = ApprovalStatus.APPROVED;

                    }
                    else
                    {
                        progress.IsApprovedByDirector = ApprovalStatus.REJECTED;
                    }


                }
                if (approvalProgressDto.userType == "Project Manager")
                {
                    progress.CoordinatorApprovalRemark = approvalProgressDto.Remark;
                    if (approvalProgressDto.actiontype == "Accept")
                    {
                        progress.IsApprovedByManager = ApprovalStatus.APPROVED;

                    }
                    else
                    {
                        progress.IsApprovedByManager = ApprovalStatus.REJECTED;
                    }
                }
                if (approvalProgressDto.userType == "Finance")
                {
                    progress.FinanceApprovalRemark = approvalProgressDto.Remark;
                    if (approvalProgressDto.actiontype == "Accept")
                    {
                        progress.IsApprovedByFinance = ApprovalStatus.APPROVED;

                    }
                    else
                    {
                        progress.IsApprovedByFinance = ApprovalStatus.REJECTED;
                    }
                }


                _dBContext.SaveChanges();

            }
            return 1;
        }

        public async Task<List<ActivityAttachmentDto>> getAttachemnts(Guid taskId)
        {


            var response = await (from x in _dBContext.ProgressAttachments.Include(x => x.ActivityProgress.Activity.ActivityParent).
                                  Where(x => x.ActivityProgress.Activity.TaskId == taskId ||
                                         x.ActivityProgress.Activity.PlanId == taskId
                                  || x.ActivityProgress.Activity.ActivityParent.TaskId == taskId)
                                  select new ActivityAttachmentDto
                                  {
                                      ActivityDesctiption = x.ActivityProgress.Activity.ActivityDescription,
                                      FilePath = x.FilePath,
                                      FileType = "Attachments"
                                  }).ToListAsync();


            response.AddRange(
                await (from x in _dBContext.ActivityProgresses.Include(x => x.Activity.ActivityParent).Where(x => x.Activity.TaskId == taskId || x.Activity.ActivityParent.TaskId == taskId)
                       select new ActivityAttachmentDto
                       {
                           ActivityDesctiption = x.Activity.ActivityDescription,
                           FilePath = x.FinanceDocumentPath,
                           FileType = "Finance"
                       }).ToListAsync()
                       );

            return response;

        }
    }
}

