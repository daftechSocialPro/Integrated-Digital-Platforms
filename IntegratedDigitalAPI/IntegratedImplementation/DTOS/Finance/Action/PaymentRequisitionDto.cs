using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class PaymentRequisitionPostDto
    {

        public PaymentType PaymentType { get; set; }
        public RequsitionType RequsitionType { get; set; }
        public string Purpose { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Guid? ProjectId { get; set; }
        public Guid? purchaseRequestId { get; set; }
        public Guid? ActivityId { get; set; }
        public string BudgetLine { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
        public double Ammount { get; set; }


    }

    public class PaymentRequisitionGetDto
    {
        public Guid Id { get; set; }
        public string PaymentType { get; set; } = null!;
        public string RequsitionType { get; set; } = null!;
        public string Purpose { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Project { get; set; } = null!;
        public string PurchaseRequest { get; set; } = null!;
        public string Activity { get; set; } = null!;
        public Guid? ActivityId { get; set; }
        public string BudgetLine { get; set; } = null!;
        public string Requester { get; set; } = null!;
        public string Approver { get; set; } = null!;
        public DateTime? ApprovedDate { get; set; }
        public double Ammount { get; set; }
    }

    public class EmployeeRequsitionsDto
    {
        public Guid Id { get; set; }
        public string PaymentType { get; set; } = null!;
        public string RequsitionType { get; set; } = null!;
        public string Purpose { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string Project { get; set; } = null!;
        public string PurchaseRequest { get; set; } = null!;
        public string Activity { get; set; } = null!;
        public string BudgetLine { get; set; } = null!;
        public string Approver { get; set; } = null!;
        public string Authorizer { get; set; } = null!;
        public DateTime? ApprovedDate { get; set; }
        public DateTime? AuthorizedDate { get; set; }
        public double Ammount { get; set; }
        public string RequestStatus { get; set; } = null!;
        public string SettlmentStatus { get; set; } = null!;
    }


    public class PendingRequestAmmountDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = null!;
        public string Project { get; set; } = null!;
        public string Activity { get; set; } = null!;
        public double AllocatedBudget { get; set; }
        public double UsedBudget { get; set; }
        public double Ammount { get; set; }
    }

    public class ApprovePaymentRequsition
    {
        public Guid Id { get; set; }
        public Guid EmployeeId { get; set; }
        public bool Approve { get; set; }
    }

    public class BudgetByActivityDto
    {
        public Guid ActivityId { get; set; }
        public double AllocatedBudget { get; set; }
        public double? UsedBudget { get; set; }
    }
}
