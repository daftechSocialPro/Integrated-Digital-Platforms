

using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedDigitalAPI.DTOS.PM
{
    public class PlanDto
    {
        public Guid? Id { get; set; }
        public string ProjectNumber { get; set; }
        public bool HasTask { get; set; }
        public string PlanName { get; set; }

        public float PlandBudget { get; set; }
        public Guid ProgramId { get; set; }
        public int ProjectType { get; set; }
        public string Remark { get; set; }
        public Guid StructureId { get; set; }
        public Guid ProjectManagerId { get; set; }

        public string Goal { get; set; }

        public string Objective { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public List<Guid> ProjectFunds { get;set; } 

        public string? CreatedById {get;set;}

    }

    public class PlanViewDto
    {
        public Guid Id { get; set; }
        public string PlanName { get; set; }
        public float PlanWeight { get; set; }
        public float PlandBudget { get; set; }
        public float RemainingBudget { get; set; }
        public string ProjectManager { get; set; }

        public string? ProjectManagerId { get; set; }
        public string? StructureId { get; set; }
        public string? Remark { get; set; }

        public string ProjectNumber { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Director { get; set; }
        public string StructureName { get; set; }
        public string ProjectType { get; set; }

        public int NumberOfTask { get; set; }
        public int NumberOfActivities { get; set; }
        public int NumberOfTaskCompleted { get; set; }

        public bool HasTask { get; set; }

        public List<string> ProjectFunds { get; set; }
        public List<string> ProjectFundIds { get; set; }

        public string Goal { get; set; }
        public string Objective { get; set; }

        public DateTime CreatedDate { get; set; }

    }

    public class PlanSingleViewDto
    {
        public Guid Id { get; set; }
        public string PlanName { get; set; }
        public float? PlanWeight { get; set; }

        public string Donor { get; set; }   

        public string ProjectNumber { get; set; }

        public float RemainingWeight { get; set; }
        public float PlannedBudget { get; set; }
        public float RemainingBudget { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }

        public string Goal { get; set; }

        public string Objective { get; set; }

        public List<TaskVIewDto> Tasks { get; set; }

    }

    public record PlanPieChartGetDto
    {
        public Guid PlanId { get; set; }
        public int? Year { get; set; }
        public string? Quarter {  get; set; }

    }

    public record PlanPieChartPostDto
    {
        public string PlanName {  get; set; }
        
        public int? Quarter { get; set; }

        public List<ChartDataSet> ChartDataSets { get; set; }


    }

    public record PlanBarChartPostDto
    {
        public string PlanName { get; set; }

        public List<ChartDataSet2> BudgetChartDataSets { get; set; }
        public List<ChartDataSet2> ProgressChartDataSets { get; set; }
    }

    public record ChartDataSet
    {
        public string Label { get; set; }
        public float Data { get; set; }
    }



    public record ChartDataSet2
    {
        public string Label { get; set; }
        public DashData Data { get; set; }
    }




    public record DashData
    {
        public float Planned { get; set; }
        public float Actual { get; set; }
    }
    
    public class TaskVIewDto
    {
        public Guid Id { get; set; }

        public string TaskName { get; set; }

        public float? TaskWeight { get; set; }

        public float RemianingWeight { get; set; }

        public int NumberofActivities { get; set; }

        public int NumberOfFinalized { get; set; }

        public int NumberOfTerminated { get; set; }

        public int FinishedActivitiesNo { get; set; }

        public int TerminatedActivitiesNo { get; set; }

        public int NumberOfMembers { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

     

        public List<SelectListDto> TaskMembers { get; set; }
        public List<TaskMemoDto> TaskMemos { get; set; }

        public List<ActivityViewDto> ActivityViewDtos { get; set; }

        public bool HasActivity { get; set; }

        public float PlannedBudget { get; set; }
        public float RemainingBudget { get; set; }

        public DateTime ? CreatedDate { get; set; }


    }

    public class TaskDto
    {

        public Guid? Id { get; set; }
        public string TaskDescription { get; set; }

        public bool HasActvity { get; set; }

        public float PlannedBudget { get; set; }

        public Guid PlanId { get; set; }

    }

    public class TaskMembersDto
    {
        public SelectListDto[] Employee { get; set; }
        public Guid TaskId { get; set; }
        public string RequestFrom { get; set; } = null!;
    }

    public class TaskMemoDto 
        {
        public SelectListDto Employee { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime DateTime { get; set; }
    }
    public class TaskMemoRequestDto
    {
        public Guid EmployeeId { get; set; }
        public string Description { get; set; } = null!;
        public Guid TaskId { get; set; }
        public string RequestFrom { get; set; } = null!;
    }




}
