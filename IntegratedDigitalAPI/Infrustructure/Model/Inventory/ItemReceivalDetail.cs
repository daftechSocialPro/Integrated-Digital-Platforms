using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class ItemReceivalDetail: WithIdModel
    {
        public ItemReceivalDetail()
        {
            ItemRecivalTag = new HashSet<ItemRecivalTags>();
        }
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; } = null!;
        public Guid MeasurementUnitId { get; set; }
        public virtual MeasurmentUnit MeasurementUnit { get; set; } = null!;
        public Guid ItemReceivalId { get; set; }
        public virtual ItemReceival ItemReceival { get; set; } = null!;
        public double Quantity { get; set; }
        public double UnitPrice { get; set; }
        public DateTime IssuedDate { get; set; }

        [InverseProperty(nameof(ItemRecivalTags.ItemReceivalDetail))]
        public ICollection<ItemRecivalTags> ItemRecivalTag { get; set; }
    }
}
