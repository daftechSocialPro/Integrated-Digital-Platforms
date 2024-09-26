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
        public string Category { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string LookupType { get; set; } = null!;
        public string LookupValue { get; set; } = null!;
        public bool IsDefault { get; set; }
        public string Remark { get; set; } = null!;

        public string CreatedById { get; set; }= null!;
    }

    public record FinanceLookupGetDto : FinanceLookupPostDto
    {
        public Guid Id { get; set; }
    }
}
