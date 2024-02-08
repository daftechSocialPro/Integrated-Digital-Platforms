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
                        Amount = Plans.PlannedBudget/plan.ProjectFunds.Count(),
                        CreatedDate = DateTime.Now,
                        CreatedById = plan.CreatedById
                    };
                    await _dBContext.Project_Funds.AddAsync(project_Fund);
                    await _dBContext.SaveChangesAsync();

                }

                return new ResponseMessage
                {
                    Success=true,
                    Message="Project Added Successfully"
                };
            }catch(Exception ex)
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
                    singlePlan.ProjectManagerId = plan.ProjectManagerId;
                  

                     await _dBContext.SaveChangesAsync();

                }

                if (plan.ProjectFunds.Any())
                {
                    var projectFunds = _dBContext.Project_Funds.Where(x=>x.ProjectId==plan.Id).ToList();

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


        public async Task<GetStartEndDate> GetDateTime (Guid planId)
        {

         
                return await _dBContext.Projects.Where(x=>x.Id==planId).Select(x=> new GetStartEndDate
                {
                    FromDate = x.PeriodStartAt,
                    EndDate = x.PeriodEndAt

                }).FirstOrDefaultAsync();

           
        }

        public async Task<List<PlanViewDto>> GetPlans( Guid ? programId)        
        
        {

            var plans =programId!=null? _dBContext.Projects.Include(x => x.Department).Include(x => x.ProjectManager).Include(x=>x.ProjectFunds):
                _dBContext.Projects.Include(x => x.Department).Include(x => x.ProjectManager).Include(x => x.ProjectFunds);


            return await (from p in plans             
                          
                          select new PlanViewDto
                          {

                              Id = p.Id,
                              PlanName = p.ProjectName,
                              Goal=p.Goal,
                              Objective=p.Objective,
                              ProjectNumber = p.ProjectNumber,                              
                              PlandBudget = p.PlannedBudget,
                              StructureName = p.Department.DepartmentName,
                              RemainingBudget = (float)(p.PlannedBudget - p.Tasks.Sum(x => (float)x.ActualBudget)),
                              ProjectManager = $"{p.ProjectManager.FirstName} {p.ProjectManager.MiddleName} {p.ProjectManager.LastName}",                             
                              //Director = _dBContext.Employees.Where(x => x.Position == Models.Common.Position.Director&&x.OrganizationalStructureId== p.StructureId).FirstOrDefault().FullName,                              
                              NumberOfTask = _dBContext.Tasks.Count(x=>x.ProjectId==p.Id),
                              NumberOfActivities = _dBContext.Activities.Include(x=>x.ActivityParent.Task.Project).Where(x=>x.PlanId==p.Id||x.Task.ProjectId==p.Id||x.ActivityParent.Task.ProjectId==p.Id).Count(),
                              NumberOfTaskCompleted = _dBContext.Activities.Include(x => x.ActivityParent.Task.Project).Where(x => x.Status == Status.FINALIZED && (x.PlanId == p.Id || x.Task.ProjectId == p.Id || x.ActivityParent.Task.ProjectId == p.Id)).Count(),
                              HasTask = p.HasTask,
                              ProjectFunds = p.ProjectFunds.Select(x=>x.ProjectSourceFund.Name).ToList(),
                              ProjectFundIds = p.ProjectFunds.Select(x => x.ProjectSourceFund.Id.ToString()).ToList(),

                              StartDate = p.PeriodStartAt,
                              EndDate = p.PeriodEndAt,

                              StructureId =p.DepartmentId.ToString(),
                              ProjectManagerId =p.ProjectManagerId.ToString(),
                            


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

     
                return await( from p in _dBContext.Projects.Include(x=>x.ProjectFunds).Where(x=>x.Id == planId)
                       select new PlanSingleViewDto
                       {
                           Id = p.Id,
                           PlanName = p.ProjectName,
                           Goal = p.Goal,
                           Objective = p.Objective,
                           ProjectNumber = p.ProjectNumber,
                           Donor = string.Join(", ",  p.ProjectFunds.Select(x=>x.ProjectSourceFund.Name)),

                           PlannedBudget = p.PlannedBudget,
                           RemainingBudget = p.PlannedBudget - taskBudgetsum,
                           RemainingWeight = float.Parse( (100.0 - taskweightSum).ToString()),
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

        public class GetStartEndDate
        {
            public DateTime FromDate { get; set; }

            public DateTime EndDate { get; set; }
        }



    }
}
