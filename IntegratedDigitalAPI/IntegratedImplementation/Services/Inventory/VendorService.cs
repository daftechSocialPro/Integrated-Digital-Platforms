using Implementation.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.DTOS.Inventory;
using static IntegratedInfrustructure.Data.EnumList;
using IntegratedInfrustructure.Models.Inventory;

namespace IntegratedImplementation.Services.Inventory
{
    public class VendorService: IVendorService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IGeneralConfigService _generalConfig;

        public VendorService(ApplicationDbContext dbContext, IMapper mapper,IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _generalConfig = generalConfig;
        }

        public async Task<ResponseMessage> AddVendor(AddVendorDto addVendor)
        {
            var currentVendor = await _dbContext.Vendors.AnyAsync(x => x.Name == addVendor.Name || x.TinNumber == addVendor.TinNumber || x.PhoneNumber == addVendor.PhoneNumber);
            if (currentVendor)
                return new ResponseMessage { Success = false, Message = "Vendor already Exists" };

            var code = await _generalConfig.GenerateCode(GeneralCodeType.VENDOR);
            Vendor vendor = new Vendor
            {
                Id = Guid.NewGuid(),
                Name = addVendor.Name,
                Address= addVendor.Address,
                CountryId= Guid.Parse(addVendor.CountryId),
                CreatedById= addVendor.CreatedById,
                CreatedDate = DateTime.Now,
                Email= addVendor.Email,
                PhoneNumber= addVendor.PhoneNumber,
                Rowstatus  = RowStatus.ACTIVE,
                SupplierCode= code,
                TinNumber   = addVendor.TinNumber,
            };

            await _dbContext.Vendors.AddAsync(vendor);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = vendor,
                Message = "Added Successfully",
                Success = true
            };
        }

      

        public async Task<List<VendorListDto>> GetVendorList()
        {
            var vendors = await _dbContext.Vendors.AsNoTracking().Include(x => x.Country).ProjectTo<VendorListDto>(_mapper.ConfigurationProvider).ToListAsync();
            return vendors;
        }

        public async Task<ResponseMessage> UpdateVendor(UpdateVendorDto updateVendor)
        {
            var currentVendor = await _dbContext.Vendors.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(updateVendor.Id)));
            if (currentVendor != null)
            {
                var vendorExist = await _dbContext.Vendors.AnyAsync(x => (x.Name == updateVendor.Name || x.TinNumber == updateVendor.TinNumber || x.PhoneNumber == updateVendor.PhoneNumber) && x.Id != currentVendor.Id);
                if (vendorExist)
                    return new ResponseMessage { Success = false, Message = "Name already Exists" };

                currentVendor.TinNumber = updateVendor.TinNumber;
                currentVendor.PhoneNumber = updateVendor.PhoneNumber;
                currentVendor.Address = updateVendor.Address;
                currentVendor.CountryId = Guid.Parse(updateVendor.CountryId);
                currentVendor.Email = updateVendor.Email;
               // currentVendor.Rowstatus = updateVendor.RowStatus;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentVendor, Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Vendor" };
        }
    }
}
