using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class LoanSettingDto
    {
        public Guid Id { get; set; }
        public string LoanName { get; set; } = null!;
        public string TypeOfLoan { get; set; } = null!;
        public double MaxLoanAmmount { get; set; }
        public int PaymentYear { get; set; }
        public double MinDeductedPercent { get; set; }
        public double MaxDeductedPercent { get; set; }
    }

    public class AddLoanSettingDto
    {
        public string? CreatedById { get; set; }
        public string LoanName { get; set; } = null!;
        public TypeOfLoan TypeOfLoan { get; set; }
        public double MaxLoanAmmount { get; set; }
        public int PaymentYear { get; set; }
        public double MinDeductedPercent { get; set; }
        public double MaxDeductedPercent { get; set; }
    }

    public class UpdateLoanSettingDto : AddLoanSettingDto
    {
        public Guid Id { get; set; }
    }


}
