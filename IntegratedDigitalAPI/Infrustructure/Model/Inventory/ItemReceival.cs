using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.Identity.Client;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class ItemReceival: WithIdModel
    {
        public ItemReceival()
        {
            ItemReceivalDetails = new HashSet<ItemReceivalDetail>();
        }
        public Guid? StoreRequestListId { get; set; }
        public virtual StoreRequestList StoreRequestList { get; set; } = null!;
        public double TotalItems { get; set; }
        public double TotalCost { get; set; }
        public ItemReceivedStatus ReceivedStatus { get; set; }
        public Guid? ReceiverEmployeeId { get; set; }
        public virtual EmployeeList ReceiverEmployee { get; set; } = null!;

        [InverseProperty(nameof(ItemReceivalDetail.ItemReceival))]
        public ICollection<ItemReceivalDetail> ItemReceivalDetails { get; set; }
    }
}
