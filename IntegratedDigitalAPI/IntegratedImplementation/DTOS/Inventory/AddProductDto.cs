using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Inventory
{
    public  class AddProductDto
    {
        public string CreatedById { get; set; } = null!;
        public string ItemId { get; set; } = null!;
        public string? ProjectId { get; set; } = null!;
        public string ItemDetailName { get; set; } = null!;
        public bool IsPurchaseRequest { get; set; }
        public string? PurchaseRequestId { get; set; }
        public double SinglePrice { get; set; }
        public double Quantity { get; set; }
        public string MeasurementUnitId { get; set; } = null!;
        public DateTime RecivingDateTime { get; set; }
        public DateTime? ManufactureDate { get; set; }
        public DateTime? ExpireDateTime { get; set; }
        public string VendorId { get; set; } = null!;
        public string? RowName { get; set; } = null!;
        public string? ColumnName { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public bool ApprovedForBranchUse { get; set; }
        public int Cartoon { get; set; }
        public int Packet { get; set; }
        public SourceOFProduct SourceOfProduct { get; set; }
        public Guid EmployeeId { get; set; }
    }

    public class UpdateProductDto: AddProductDto
    {
        [Required]
        public string Id { get; set; } = null!;
    }

   

    public class ProductListDto
    {
        public string Id { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public string ItemDetailName { get; set; } = null!;
        public bool IsPurchaseRequest { get; set; }
        public double SinglePrice { get; set; }
        public double Quantity { get; set; }
        public double RemainingQuantity { get; set; }
        public string MeasurementUnit { get; set; } = null!;
        public DateTime RecivingDateTime { get; set; }
        public DateTime? ManufactureDate { get; set; }
        public DateTime? ExpireDateTime { get; set; }
        public string VendorName { get; set; } = null!;
        public string? RowName { get; set; } = null!;
        public string? ColumnName { get; set; } = null!;
        public string? Description { get; set; } = null!;
    }
}
