using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Configuration
{
    public class FinanceLookup : WithIdModel
    {
        public LOOKUPCATEGORY Category { get; set; }
        public string Description { get; set; } = null!;
        public LOOKOUPTYPE LookupType { get; set; }
        public string LookupValue { get; set; } = null!;
        public bool IsDefault { get; set; }
        public string Remark { get; set; } = null!;

    }


}
