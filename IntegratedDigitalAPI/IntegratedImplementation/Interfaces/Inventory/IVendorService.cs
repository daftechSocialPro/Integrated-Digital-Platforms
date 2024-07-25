using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IVendorService
    {
        Task<List<VendorListDto>> GetVendorList();
        Task<ResponseMessage> AddVendor(AddVendorDto addVendor);
        Task<ResponseMessage> UpdateVendor(UpdateVendorDto updateVendor);

        Task<ResponseMessage> AddVendorBank(AddVendorBankAccountDto addVendor);
        Task<ResponseMessage> UpdateVendorBank(UpdateVendorBankAccountDto updateVendor);


    }
}
