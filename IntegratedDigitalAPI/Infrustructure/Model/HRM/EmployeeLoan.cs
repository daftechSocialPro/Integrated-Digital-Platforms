using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeLoan: WithIdModel
    {
        public EmployeeLoan()
        {
            EmployeeSettlements = new HashSet<EmployeeSettlement>();
        }
        public Guid LoanRequestId { get; set; }
        public LoanRequest LoanRequest { get; set; } = null!;
        public double ApprovedAmmount { get; set; }
        public Guid ApprovedById { get; set; }
        public EmployeeList ApprovedBy { get; set; } = null!;
        public Guid? SecondApproverId { get; set; }
        public EmployeeList SecondApprover { get; set; } = null!;
        public DateTime PaymentStartDate { get; set; }
        public DateTime PaymentEndDate { get; set; }
        public LoanStatus LoanStatus { get; set; }

        [InverseProperty(nameof(EmployeeSettlement.EmployeeLoan))]
        public ICollection<EmployeeSettlement> EmployeeSettlements { get; set; }
    }
}
