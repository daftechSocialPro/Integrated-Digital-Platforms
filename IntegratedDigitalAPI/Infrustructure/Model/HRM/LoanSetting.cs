using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class LoanSetting : WithIdModel
    {
        public string LoanName { get; set; } = null!;
        public TypeOfLoan TypeOfLoan { get; set; }
        public double MaxLoanAmmount { get; set; }
        public int PaymentYear { get; set; }
        public double MinDeductedPercent { get; set; }
        public double MaxDeductedPercent { get; set; }
        public string? Remark { get; set; }
    }
}
