using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Models.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class PurchaseRequestList : WithIdModel
    {
        public Guid PurchaseRequestId { get; set; }
        public virtual PurchaseRequest PurchaseRequest { get; set; } = null!;
        public string ItemRequestNo { get; set; } = null!;
        public Guid ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public double Quantity { get; set; }
        public double SinglePrice { get; set; }
        public Guid MeasurementUnitId { get; set; }
        public virtual MeasurmentUnit MeasurementUnit { get; set; } = null!;
        public ApprovalStatus ApprovalStatus { get; set; }
        public Guid? ApproverEmployeeId { get; set; }
        public virtual EmployeeList ApproverEmployee { get; set; } = null!;
        public double? APrrovedQuantity { get; set; }
    }
}
