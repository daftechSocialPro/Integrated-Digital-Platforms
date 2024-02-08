

using IntegratedImplementation.DTOS.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;

namespace IntegratedDigitalAPI.DTOS.PM
{
    public class ActivityViewDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public float PlannedBudget { get; set; }
        public string ActivityType { get; set; } = null!;
        public float Weight { get; set; }

        public string ProjectLocation { get; set; }
        public double ProjectLocationLat { get; set; }
        public double ProjectLocationLng { get; set; }

        public string ActivityNumber { get; set; }

        public float Begining { get; set; }
        public float Target { get; set; }
        public string UnitOfMeasurment { get; set; } 
        public float OverAllPerformance { get; set; }
        public string StartDate { get; set; } = null!;
        public string EndDate { get; set; } = null!;
        public List<SelectListDto> Members { get; set; } = null!;

        public List<MonthPerformanceViewDto>? MonthPerformance { get; set; } = null!;

        public float OverAllProgress { get; set; }
        public string? ProgresscreatedAt { get; set; }
       
        public bool IsProjectManager { get; set; }
        public bool IsDirector { get; set; }

        public bool IsTraining { get; set; }
        public float? OfficeWork { get;  set; }
        public float? FieldWork { get;  set; }
        public Guid? StrategicPlan { get;  set; }
        public Guid? StrategicPlanIndicator { get;  set; }
        public bool? IsPercentage { get;  set; }
        public Guid? RegionId { get;  set; }
        public string? Zone { get;  set; }
        public string? Woreda { get; set; }


        public string? ProjectSource { get; set; }

        public Guid? CountryId { get; set; }
        public double? Longtude { get; set; }
        public double? Latitude { get; set; }
        public Guid? ProjectSourceId { get; set; }

    }

    public class MonthPerformanceViewDto
    {
        public Guid Id { get; set; }
        public int Order { get; set; }
        public string MonthName { get; set; } = null!;
        public float Planned { get; set; }
        public float Actual { get; set; }
        public float Percentage { get; set; }

        public float PlannedBudget { get; set; }
    }


    public class ActivityTargetDivisionDto
    {

        public Guid ActiviyId { get; set; }
        public Guid CreatedBy { get; set; }
        public List<TargetDivisionDto> TargetDivisionDtos { get; set; }


    }

    public class TargetDivisionDto
    {

        public int Order { get; set; }
        public float Target { get; set; }
        public float TargetBudget { get; set; }




    }


    public class AddProgressActivityDto
    {
        public Guid? Id { get; set; }
        public Guid ActivityId { get; set; }
        public Guid QuarterId { get; set; }
        public Guid EmployeeValueId { get; set; }
        public string ProgressStatus { get; set; }
        public float ActualBudget { get; set; }
        public float ActualWorked { get; set; }
        public string Lat { get; set; } = null!;
        public string Lng { get; set; } = null!;
        public Guid CreatedBy { get; set; }

        public IFormFile[] ? Dcouments { get; set; }
        public IFormFile? Finacnce{ get; set; }
        public string Remark { get; set; }

        public string lat { get; set; }
        public string lng { get; set; }
        public string IsDraft { get; set; }

    }


    public class ProgressViewDto
    {
        public Guid Id { get; set; }
        public float ActalWorked { get; set; }
        public float UsedBudget { get; set; }

        public string[] Documents { get; set; }
        public string FinanceDocument { get; set; }
        public string Remark { get; set; }
        public string IsApprovedByManager { get; set; }
        public string IsApprovedByFinance { get; set; }
        public string IsApprovedByDirector { get; set; }
        public string? FinanceApprovalRemark { get; set; }
        public string? ManagerApprovalRemark { get; set; }
        public string? DirectorApprovalRemark { get; set; }
        public Guid QuarterId { get; set; }
        public DateTime CreatedAt { get; set; }



    }

    public class ApprovalProgressDto
    {

        public Guid progressId { get; set; }
        public string userType { get; set; }

        public string actiontype { get; set; }

        public string Remark { get; set; }

        public Guid createdBy { get; set; }

    }

    public class ActivityAttachmentDto
    {

        public string FilePath { get; set; }

        public string FileType { get; set; }

        public string ActivityDesctiption { get; set; }
    }

    public class TerminatedEmployeeReplacmentDto
    {
        public SelectListDto Activity { get; set; }
        public List<SelectListDto> ReplaceEmployees { get; set; }
        public SelectListDto? TerminatedEmployee {  get; set; }

    }
    
    public class TerminatedEmployeeReplacmentGetDto
    {
        public Guid EmpId { get; set; }
        public Guid ActId { get; set; }
        public Guid TerminateEmp { get; set; }
    }


}