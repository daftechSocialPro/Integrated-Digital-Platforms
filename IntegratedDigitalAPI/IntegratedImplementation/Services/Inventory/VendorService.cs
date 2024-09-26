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
using IntegratedInfrustructure.Model.Inventory;

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
            var vendors = await _dbContext.Vendors.AsNoTracking().Include(x => x.Country).Include(x => x.VendorBanks)
                                .Select(x => new VendorListDto
                                {
                                    Id = x.Id,
                                    CountryName = x.Country.CountryName,
                                    Email = x.Email,
                                    Name = x.Name,
                                    Address = x.Address,
                                    PhoneNumber = x.PhoneNumber,
                                    SupplierCode = x.SupplierCode,
                                    TinNumber = x.TinNumber,
                                    VendorBankAccounts = x.VendorBanks.Select(y => new VendorBankAccountDto
                                    {
                                        Id = y.Id,
                                        AccountNumber = y.AccountNumber,
                                        BankName = y.BankName,
                                    }).ToList()
                                }).ToListAsync();
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

        public async Task<ResponseMessage> AddVendorBank(AddVendorBankAccountDto addVendor)
        {
            var currentVendor = await _dbContext.VendorBankAccounts.AnyAsync(x => x.AccountNumber == addVendor.AccountNumber);
            if (currentVendor)
                return new ResponseMessage { Success = false, Message = "Account already Exists" };

          
            VendorBankAccounts vendor = new VendorBankAccounts
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addVendor.CreatedById,
                AccountNumber = addVendor.AccountNumber,
                BankName = addVendor.BankName,
                Rowstatus = RowStatus.ACTIVE,
                VendorId = addVendor.VendorId
            };

            await _dbContext.VendorBankAccounts.AddAsync(vendor);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = vendor,
                Message = "Added Successfully",
                Success = true
            };
        }
        public async Task<ResponseMessage> UpdateVendorBank(UpdateVendorBankAccountDto updateVendor)
        {
            var currentVendor = await _dbContext.VendorBankAccounts.FirstOrDefaultAsync(x => x.Id.Equals(updateVendor.Id));
            if (currentVendor != null)
            {
                var vendorExist = await _dbContext.VendorBankAccounts.AnyAsync(x => (x.AccountNumber == updateVendor.AccountNumber) && x.Id != currentVendor.Id);
                if (vendorExist)
                    return new ResponseMessage { Success = false, Message = "Account already Exists" };

                currentVendor.AccountNumber = updateVendor.AccountNumber;
                currentVendor.BankName = updateVendor.BankName;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentVendor, Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Account" };
        }
    }
}
