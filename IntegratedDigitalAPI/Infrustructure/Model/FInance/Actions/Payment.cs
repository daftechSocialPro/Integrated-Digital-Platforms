﻿using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Models.Inventory;
using System.ComponentModel.DataAnnotations.Schema;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.FInance.Actions
{
    public class Payment : WithIdModel
    {

        public Payment()
        {
            PaymentDetails = new HashSet<PaymentDetail>();
        }
        public Guid AccountingPeriodId { get; set; }
        public virtual PeriodDetails AccountingPeriod { get; set; } = null!;
        public DateTime PaymentDate { get; set; }
        public PaymentType PaymentType { get; set; }
        public string PaymentNumber { get; set; } = null!;
        public Guid? BankId { get; set; }
        public virtual BankList Bank { get; set; } = null!;
        public TypeOfPayee TypeOfPayee { get; set; }
        public Guid? SupplierId { get; set; }
        public virtual Vendor Supplier { get; set; } = null!;
        public Guid? EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public string? OtherBeneficiary { get; set; }
        public string? BeneficiaryAccountNumber { get; set; }
        public string? DocumentPath { get; set; }
        public Guid? ApprovedById { get; set; }
        public virtual EmployeeList ApprovedBy { get; set; } = null!;
        public Guid? AuthorizedById { get; set; }
        public virtual EmployeeList AuthorizedBy { get; set; } = null!;
        public DateTime ApprovedDate { get; set; }
        public string? Remark { get; set; }


        [InverseProperty(nameof(PaymentDetail.Payment))]
        public ICollection<PaymentDetail> PaymentDetails { get; set; }
    }
}
