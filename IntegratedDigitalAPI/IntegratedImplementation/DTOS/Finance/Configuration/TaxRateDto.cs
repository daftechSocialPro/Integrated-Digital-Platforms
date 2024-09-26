using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public class TaxRateDto
    {
        public Guid Id { get; set; }
        public string TaxEntityType { get; set; } = null!;
        public double TaxRate { get; set; }
        public int Witholding { get; set; }
    }

    public class AddTaxRateDto
    {
        public TaxEntityType TaxEntityType { get; set; }
        public double TaxRate { get; set; }
        public int Witholding { get; set; }
        public string CreatedById { get; set; } = null!;
    }

    public class LedgerPostingAccountDto
    {
        public Guid Id { get; set; }
        public string JournalOption { get; set; } = null!;
        public string ChartOfAccount { get; set; } = null!;
    }

    public class AddLedgerPostingAccountDto
    {
        public JournalOption JournalOption { get; set; }
        public Guid ChartOfAccountId { get; set; }
        public string CreatedById { get; set; } = null!;
    }
}
