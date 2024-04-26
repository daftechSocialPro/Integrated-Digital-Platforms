using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Drawing.Printing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class StoreReceivalListDto
    {
        public string Id { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public string RequestNumber { get; set; } = null!;
        public double ApprovedQuantity { get; set; }
        public string MeasurementUnitName { get; set; } = null!;
        public string RequesterEmployee { get; set; } = null!;
        public string ApproverEmployee { get; set; } = null!;
    }

    public class StoreRecivalListDto
    {
        public Guid ProductId { get; set; }
        public Guid MeasurementId { get; set; }
        public double Quantity { get; set; }
        public double Price { get; set; }
    }

    public class StoreRequestIssueDto
    {
        public string Id { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public int Quantity { get; set; }
    }


    public class ApprovedItemsDto
    {
        public string Id { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public double ApprovedQuantity { get; set; }
        public string MeasurementUnit { get; set; } = null!;
        public string ApproverEmployee { get; set; } = null!;
    }

    public class ReciveTransportableItems
    {
        public string EmployeeId { get; set; } = null!;
        public List<string> RecivalItemId { get; set; } = null!;
    }

    public class ReceiveItems
    {
        public string ItemRecivalId { get; set; } = null!;
        public string EmployeeId { get; set; } = null!;
        public string UserId { get; set; } = null!;
        public string? RowName { get; set; } = null!;
        public string? ColumnName { get; set; } = null!;
    }

    public class EmployeeReceivedITemsDto
    {
        public string Id { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public double IssuedQuantity { get; set; }
        public double RemainingQuantity { get; set; }
        public string MeasurementUnit { get; set; } = null!;

        public List<EmployeeRecivedProductsDto> EmployeeRecivedProducts { get; set; } = null!;

    }

    public class EmployeeRecivedProductsDto
    {
        public string Id { get; set; } = null!;
        public string ProductDetailName { get; set; } = null!;
        public string TagNumber { get; set; } = null!;
        public string? SerialNumber { get; set; } = null!;
        public string Status { get; set; } = null!;
    }



    public class AdjustReceivedITemsDto
    {
        [Required]
        public string Id { get; set; } = null!;
        [Required]
        public string CreatedById { get; set; } = null!;
        public string Remark { get; set; } = null!;
        [Required]
        public UsedItemsStatus UsedItemStatus { get; set; }
    }




}
