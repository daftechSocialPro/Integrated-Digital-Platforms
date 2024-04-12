using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class AddReceiptDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid BankId { get; set; }
        public Guid AccountingPeriodId { get; set; }
        
        public string ReferenceNumber { get; set; } = null!;
        public string ReceiptNumber { get; set; } = null!;
        public DateTime Date { get; set; }
        public List<AddReceiptDetailDto> AddReceiptDetails { get; set; } = null!;
    }


    public class AddReceiptDetailDto
    {
        public Guid? ItemId { get; set; }
        public Guid ChartOfAccountId { get; set; }
        public string Description { get; set; } = null!;
        public double UnitPrice { get; set; }
        public double Quantity { get; set; }
        public bool IsTaxable { get; set; }
        public Guid? ProjectId { get; set; }
    }
}
