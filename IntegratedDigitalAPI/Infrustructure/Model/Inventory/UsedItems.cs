using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Inventory
{
    public class UsedItems : WithIdModel
    {
        public Guid ItemReceivalId { get; set; }
        public double TotalItems { get; set; }
        public UsedItemsStatus UsedItemStatus { get; set; }
        public string Remark { get; set; } = null!;
    }
}
