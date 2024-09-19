using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class EmployeePaymentSettlement: WithIdModel
    {
        public Guid PaymentRequisitionId { get; set; }
        public virtual PaymetRequisitions PaymentRequisition { get; set; } = null!;
        //public Guid ActivityId { get; set; }
        //public virtual Activity Activity { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public double RemainingAmmount { get; set; }
        public PaymentAction PaymentAction { get; set; }
    }
}
