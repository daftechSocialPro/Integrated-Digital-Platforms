using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.PM
{
    public class PaymentRequisition :WithIdModel
    {
        public PaymentType PaymentType { get; set; }

        public DateTime Date { get; set; }
        public string Name { get; set; } = null!;
        public string PurposeOfRequest { get; set; } = null!;
        public string AmountInWord { get; set; } = null!;
        public double Amount { get; set; }
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
        public string BudgetReference { get; set; } = null!;
        public int PageNumber { get; set; } 
        public string CheckNumber { get; set; } = null!;
        public bool IsRejected { get; set; }
        public string? RejectedRemark { get; set; }
        public Guid RequestedById { get; set; }
        public virtual EmployeeList RequestedBy { get; set; } = null!;


        public Guid? SupportedById { get; set; }
        public virtual EmployeeList SupportedBy { get; set; }


        public Guid? CheckedById { get; set; }
        public virtual EmployeeList CheckedBy { get; set; }


        public Guid? ApprovedById { get; set; }
        public virtual EmployeeList ApprovedBy { get; set; }    


        public Guid ? AuthorizedById  { get; set; }
        public virtual EmployeeList AuthorizedBy { get; set; }


    }
}
