using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.FInance.Actions;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class AddPaymentDto
    {
        public Guid AccountingPeriodId { get; set; }
        public DateTime PaymentDate { get; set; }
        public string PaymentType { get; set; } = null!;
        public string PaymentNumber { get; set; } = null!;
        public Guid? BankId { get; set; }
        public Guid SupplierId { get; set; }
        public IFormFile? DocumentPath { get; set; }
        public string? Remark { get; set; }
        public string CreatedById { get; set; } = null!;
        public List<AddPaymentDetailDto> AddPaymentDetails { get; set; } = null!;
    }

    public class AddPaymentDetailDto
    {
        public Guid? ItemId { get; set; }
        public Guid ChartOfAccountId { get; set; }
        public string Description { get; set; } = null!;
        public double Quantity { get; set; }
        public double Price { get; set; }
        public double TotalPrice { get; set; }
        public string? Remark { get; set; }
    }


    public class ApprovePaymentDto
    {
        public Guid Id { get; set; }
        public Guid ApprovedById { get; set; }

    }


    public class PaymentListDto
    {
        public Guid Id { get; set; }
        public string AccountingPeriod { get; set; } = null!;
        public DateTime PaymentDate { get; set; }
        public string PaymentType { get; set; } = null!;
        public string PaymentNumber { get; set; } = null!;
        public string Bank { get; set; } = null!;
        public string Supplier { get; set; } = null!;
        public string? DocumentPath { get; set; } 
        public string? Remark { get; set; }
        public List<PaymentDetailListDto> PaymentDetailLists { get; set; } = null!;
    }

    public class PaymentDetailListDto
    {
        public string Item { get; set; } = null!;
        public string ChartOfAccount { get; set; } = null!;
        public string Description { get; set; } = null!;
        public double Quantity { get; set; }
        public double Price { get; set; }
        public double TotalPrice { get; set; }
        public string? Remark { get; set; }
    }
}
