using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class InventoryDashboardDto
    {
        public int pendingPurchaseRequest { get; set; }
        public int items { get; set; }
        public int pendingStoreRequest { get; set; }
        public int recivedItems { get; set; }
        public int totalPurchaseRequest { get; set; }
        public int totalStoreRequest { get; set; }



    }
}
