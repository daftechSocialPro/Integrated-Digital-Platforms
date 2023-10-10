using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class LoanInfoDto
    {
        public double BorrowedAmount { get; set; }
    }


    public class RequestLoanDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public  Guid LoanSettingId { get; set; }
        public double TotalMoneyRequest { get; set; }
        public double DeductionRequest { get; set; }
    }

    public class RequestedLoanListDto
    {
        public Guid RequestId { get; set; }
        public DateTime RequestedDate { get; set; }
        public string LoanType { get; set; } = null!;
        public string EmployeeName { get; set; } = null!;
        public string LoanTypeName { get; set; } = null!;
        public double RequestedAmount { get; set; }
        public double DeductionPercent { get; set; }
    }

    public class ApproveInitialRequestDto
    {
        public Guid RequestId { get; set; }
        public Guid ApproverId { get; set; }
        public string createdBId { get; set; } = null!;
        
    }

    public class EmployeeLoanDto : RequestedLoanListDto
    {
        public string ApproverName { get; set; } = null!;
        public string? SecondApproverName { get; set; } 
        public DateTime PaymentStart { get; set; }
        public DateTime PaymentEnd { get; set; }
        public string CurrentStatus { get; set; } = null!;
    }
}
