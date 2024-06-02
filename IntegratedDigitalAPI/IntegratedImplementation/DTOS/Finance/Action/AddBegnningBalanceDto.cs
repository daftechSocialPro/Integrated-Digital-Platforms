using DocumentFormat.OpenXml.Presentation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class AddBegnningBalanceDto
    {
        public Guid AccountingPeriodId { get; set; }
        public double TotalCredit { get; set; }
        public double TotalDebit { get; set; }
        public string Remark { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
        public List<BegningBalanceDetailDto> BegningBalanceDetails { get; set; } = null!;

    }

    public class BegningBalanceDetailDto
    {
        public Guid ChartOfAccountId { get; set; }
        public double Ammount { get; set; }
        public string Remark { get; set; } = null!;
    }


    public class ChartOfAccountBegningDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; } = null!;
        public string Type { get; set; } = null!;
        public double Ammount { get; set; }
        public string? Remark { get; set; }

    }


}
