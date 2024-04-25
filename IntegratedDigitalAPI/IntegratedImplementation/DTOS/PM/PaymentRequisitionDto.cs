using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.PM
{
    public class PaymentRequisitionPostDto
    {

        public DateTime Date { get; set; }
        public string Name { get; set; } = null!;
        public string PurposeOfRequest { get; set; } = null!;
        public string AmountInWord { get; set; } = null!;
        public double Amount { get; set; }
        public Guid ProjectId { get; set; }
        public string BudgetReference { get; set; } = null!;
        public int PageNumber { get; set; } 
        public string CheckNumber { get; set; } = null!;

        public Guid RequestedById { get; set; }


        public string CreatedById { get; set; }


    }

    public class PaymentRequisitionGetDto
    {

        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; } = null!;
        public string PurposeOfRequest { get; set; } = null!;
        public string AmountInWord { get; set; } = null!;
        public double Amount { get; set; }  
        public string Project { get; set; }
        public string BudgetReference { get; set; } = null!;
        public int PageNumber { get; set; }
        public string CheckNumber { get; set; } = null!;
        public bool IsRejected { get; set; }
        public string? RejectedRemark { get; set; }

        public Guid RequestedById { get; set; }    
        
        public string RequestedBy { get; set; }

        public string SupportedBy { get; set; }
        public string CheckedBy { get; set; }

        public string ApprovedBy { get; set; }

        public string AuthorizedBy { get; set; }

    }
}
