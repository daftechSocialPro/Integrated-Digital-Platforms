namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class AddReceiptDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid BankId { get; set; }
        public string ReferenceNumber { get; set; } = null!;
        public string ReceiptNumber { get; set; } = null!;
        public DateTime Date { get; set; }
        public List<AddReceiptDetailDto> AddReceiptDetails { get; set; } = null!;
    }


    public class AddReceiptDetailDto
    {
        public Guid? ItemId { get; set; }
        public Guid ChartOfAccountId { get; set; }
        public Guid SubsidiaryAccountId { get; set; }
        public string Description { get; set; } = null!;
        public double UnitPrice { get; set; }
        public double Quantity { get; set; }
        public bool IsTaxable { get; set; }
        public Guid? ProjectId { get; set; }
    }

    public class ReceiptGetDto
    {
        public Guid Id { get; set; }
        public Guid BankId { get; set; }
        public string ReferenceNumber { get; set; } = null!;
        public string ReceiptNumber { get; set; } = null!;
        public DateTime Date { get; set; }
        public string BankName { get; set; }
        public List<ReceiptDetailGetDto> ReceiptDetails { get; set; }

    }
    public class ReceiptDetailGetDto
    {
        public Guid? ItemId { get; set; }
        public string? ItemName { get; set; }
        public Guid ChartOfAccountId { get; set; }
        public string ChartOfAccountName { get; set; }
        public Guid SubsidiaryAccountId { get; set; }
        public string SubsidiaryAccountName { get; set; }
        public string Description { get; set; } = null!;
        public double UnitPrice { get; set; }
        public double Quantity { get; set; }
        public bool IsTaxable { get; set; }
        public Guid? ProjectId { get; set; }
        public string? ProjectName { get; set; }
    }
}
