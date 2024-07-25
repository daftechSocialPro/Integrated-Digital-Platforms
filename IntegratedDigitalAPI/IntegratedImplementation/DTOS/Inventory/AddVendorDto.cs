using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class AddVendorDto
    {
        public string CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string CountryId { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string TinNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
    }

    public class UpdateVendorDto : AddVendorDto
    {
        public string Id { get; set; } = null!;
    }

    public class VendorListDto
    {
        public Guid Id { get; set; }
        public string CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string CountryName { get; set; } = null!;
        public string SupplierCode { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string? Email { get; set; } = null!;
        public string TinNumber { get; set; } = null!;
        public string Address { get; set; } = null!;
        public List<VendorBankAccountDto> VendorBankAccounts { get; set; } = null!;
    }


    public class VendorBankAccountDto
    {
        public Guid Id { get; set; }
        public string BankName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
    }

    public class AddVendorBankAccountDto
    {
        public Guid VendorId { get; set; }
        public string BankName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
    }


    public class UpdateVendorBankAccountDto : AddVendorBankAccountDto
    {
        public Guid Id { get; set; }
    }

}
