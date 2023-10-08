using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeLoan: WithIdModel
    {
        public Guid LoanRequestId { get; set; }
        public LoanRequest LoanRequest { get; set; } = null!;
        public double ApprovedAmmount { get; set; }
        public Guid ApprovedById { get; set; }
        public EmployeeList ApprovedBy { get; set; } = null!;
        public Guid SecondApproverId { get; set; }
        public EmployeeList SecondApprover { get; set; } = null!;
        public DateTime PaymentStartDate { get; set; }
        public DateTime PaymentEndDate { get; set; }

    }
}
