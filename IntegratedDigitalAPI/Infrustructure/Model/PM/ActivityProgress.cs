

using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.PM
{
    public class ActivityProgress : WithIdModel
    {
        public ActivityProgress()
        {
            ProgressAttachments = new HashSet<ProgressAttachment>();
        }

        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public float ActualBudget { get; set; }
        public float ActualWorked { get; set; }
        public Guid EmployeeValueId { get; set; }
        public virtual EmployeeList? EmployeeValue { get; set; } 
        public Guid QuarterId { get; set; }
        public virtual ActivityTargetDivision Quarter { get; set; } 
      //  public string DocumentPath { get; set; } = null!;
        public string? FinanceDocumentPath { get; set; }
        public ApprovalStatus IsApprovedByManager { get; set; }
        public ApprovalStatus IsApprovedByFinance { get; set; }
        public ApprovalStatus IsApprovedByDirector { get; set; }
        public string ? FinanceApprovalRemark { get; set; } 
        public string ? CoordinatorApprovalRemark { get; set; } 
        public string ? DirectorApprovalRemark { get; set; } 
        public string Lat { get; set; } = null!;
        public string Lng { get; set; } = null!;
        public ProgressStatus progressStatus { get; set; }

     
        public  ICollection<ProgressAttachment> ProgressAttachments { get; set; }
    }
  
}
