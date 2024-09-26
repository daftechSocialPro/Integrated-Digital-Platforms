using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Inventory
{
    public class VendorBankAccounts: WithIdModel
    {
        public Guid VendorId { get; set; }
        public virtual Vendor Vendor { get; set; } = null!;
        public string BankName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
       
    }
}
