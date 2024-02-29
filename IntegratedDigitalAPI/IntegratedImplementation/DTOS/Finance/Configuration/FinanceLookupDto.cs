using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public record FinanceLookupPostDto
    {
        public string Category { get; set; }
        public string Description { get; set; }
        public string LookupType { get; set; }
        public string LookupValue { get; set; }
        public bool IsDefault { get; set; }
        public string Remark { get; set; }

        public string CreatedById { get; set; }
    }

    public record FinanceLookupGetDto : FinanceLookupPostDto
    {
        public Guid Id { get; set; }
    }
}
