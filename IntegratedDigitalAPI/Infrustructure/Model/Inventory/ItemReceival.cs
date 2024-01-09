using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class ItemReceival: WithIdModel
    {
        public Guid? StoreRequestListId { get; set; }
        public virtual StoreRequestList StoreRequestList { get; set; } = null!;
        public double TotalItems { get; set; }
        public double RemainingItems { get; set; }
        public double TotalCost { get; set; }
        public ItemReceivedStatus ReceivedStatus { get; set; }
        public Guid? ReceiverEmployeeId { get; set; }
        public virtual EmployeeList ReceiverEmployee { get; set; } = null!;
    }
}
