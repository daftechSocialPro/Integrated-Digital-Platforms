using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class Vendor : WithIdModel
    {
        public string Name { get; set; } = null!;
        public Guid CountryId { get; set; }
        public virtual Country Country { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string TinNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
    }
}
