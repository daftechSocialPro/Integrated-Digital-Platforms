using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public class AccountingPeriodDto
    {
        public Guid Id { get; set; }
        public string AccountingPeriodType { get; set; } = null!;
        public string CalanderType { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public List<PeriodDetailDto> PeriodDetails { get; set; } = null!;
    }

    public class PeriodDetailDto
    {
        public int PeriodNo { get; set; }
        public DateTime PeriodStart { get; set; }
        public DateTime PeriodEnd { get; set; }
    }


    public class AddAccountingPeriodDto
    {
        public string CreatedById { get; set; } = null!;
        public string AccountingPeriodType { get; set; } = null!;
        public string CalanderType { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime? StartDate { get; set; }

        public string ? ethiopianDate { get; set; }
    }
}
