using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class ApprovedLoansDto
    {
        public Guid Id { get; set; }
        public string EmployeeCode { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;
        public double CurrentSalary { get; set; }
        public double GivenAmmount { get; set; }
        public double MonthlyPayment { get; set; }
        public int ReturnPeriod { get; set; }
        public double TotalPayment { get; set; }
        public string InitialApprover { get; set; } = null!;
        public string SecondApprover { get; set; } = null!;
        public string LoanStatus { get; set; } = null!;

    }


    public class LoanPaymentDto
    {
        public Guid EmployeeLoanId { get; set; }
        public double TotalPayment { get; set; }
        public string CreatedById { get; set; } = null!;

    }
}
