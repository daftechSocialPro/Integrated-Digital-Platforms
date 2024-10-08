﻿using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Model.PM;
using IntegratedInfrustructure.Models.Common;
using IntegratedInfrustructure.Models.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class Product: WithIdModel
    {
        public Guid ItemId { get; set; }
        public virtual Item Item { get; set; } = null!;
        public string ItemDetailName { get; set; } = null!;
        public string DetailCode { get; set; } = null!;
        public bool IsPurchaseRequest { get; set; }
        public Guid? PurchaseRequestId { get; set; }
        public virtual PurchaseRequestList PurchaseRequest { get; set; } = null!;
        public double SinglePrice { get; set; }
        public double Quantiy { get; set; }
        public Guid MeasurementUnitId { get; set; }
        public virtual MeasurmentUnit MeasurementUnit { get; set; } = null!;
        public DateTime RecivingDateTime { get; set; }
        public DateTime? ManufactureDate { get; set; }
        public DateTime? ExpireDateTime { get; set; }   
        public Guid VendorId { get; set; }
        public virtual Vendor Vendor { get; set; } = null!;
        public string? RowName { get; set; } = null!;
        public string? ColumnName { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public double RemainingQuantity { get; set; }
        public int Cartoon { get; set; }
        public int Packet { get; set; }
        public Guid? ProjectId { get; set; }
        public virtual Project Project { get; set; } = null!;

        public SourceOFProduct SourceOfProduct { get; set; } 

        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
    }
}
