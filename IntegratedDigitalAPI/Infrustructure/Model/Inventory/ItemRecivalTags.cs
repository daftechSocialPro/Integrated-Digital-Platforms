
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.Inventory;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Inventory
{
    public class ItemRecivalTags: WithIdModel
    {
       
        public Guid ItemRecivalDetailId { get; set; }
        public virtual ItemReceivalDetail ItemReceivalDetail { get; set; } = null!;

        public Guid ProductTagId { get; set; }
        public virtual ProductTag ProductTag { get; set; } = null!;
        public UsedItemsStatus UsedItemStatus { get; set; }
        public bool ReturnApproved { get; set; }
        public string? Remark { get; set; }

    }
}
