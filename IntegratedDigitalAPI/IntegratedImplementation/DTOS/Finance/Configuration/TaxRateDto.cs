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
}
