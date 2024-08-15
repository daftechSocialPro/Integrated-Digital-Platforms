using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.Inventory;
using IntegratedInfrustructure.Models.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class PaymetRequisitions: WithIdModel
    {
        public PaymentType PaymentType { get; set; }
        public RequsitionType RequsitionType { get; set; }
        public string Purpose { get; set; } = null!;
        public string Description { get; set; } = null!;
        public Guid? ProjectId { get; set; }
        public virtual Project Project { get; set; } = null!;
        public Guid? purchaseRequestId { get; set; }
        public virtual PurchaseRequest PurchaseRequest { get; set; } = null!;
        public Guid? ActivityId { get; set; }
        public virtual Activity Activity { get; set; } = null!;
        public string BudgetLine { get; set; } = null!;
        public double Ammount { get; set; }
        public Guid? ApproverId { get; set; }
        public virtual EmployeeList Approver { get; set; } = null!;
        public DateTime?  ApprovedDate { get; set; }
    }
}
