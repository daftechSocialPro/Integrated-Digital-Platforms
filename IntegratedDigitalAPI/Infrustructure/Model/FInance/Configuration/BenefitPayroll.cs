using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class BenefitPayroll: WithIdModel
    {
        public Guid BenefitListId { get; set; }
        public virtual BenefitList BenefitList { get; set; } = null!;
        public bool Taxable { get; set; }
        public PayrollReportType PayrollReportType { get; set; }
    }
}
