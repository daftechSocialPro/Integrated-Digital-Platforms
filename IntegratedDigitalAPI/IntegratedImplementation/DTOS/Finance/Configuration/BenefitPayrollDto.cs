using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public class BenefitPayrollDto
    {
        public bool Taxable { get; set; }
        public string PayrollReportType { get; set; } = null!;
        public string BenefitLists { get; set; } = null!;
    }

    public class AddBenefitPayroll
    {
        public string CreatedById { get; set; } = null!;
        public List<string> BenefitId { get; set; } = null!;
        public bool Taxable { get; set; }
        //public PayrollReportType PayrollReportType { get; set; }
        public string PayrollReportType { get; set; }
    }


}
