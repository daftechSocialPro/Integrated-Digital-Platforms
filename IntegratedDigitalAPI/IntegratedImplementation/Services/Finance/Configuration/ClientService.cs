using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Configuration;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Configuration
{
    public class ClientService : IClientsService
    {
        private readonly ApplicationDbContext _dbContext;

        public ClientService(ApplicationDbContext dbContext) 
        {
            _dbContext = dbContext;
        }
        public async Task<ResponseMessage> AddClient(AddClientDto addClient)
        {

            var currentClient = await _dbContext.Clients.AnyAsync(x => x.Name == addClient.Name || x.TinNumber == addClient.TinNumber || x.PhoneNumber == addClient.PhoneNumber);
            if (currentClient)
                return new ResponseMessage { Success = false, Message = "Client already Exists" };

            
            Clients client = new Clients
            {
                Id = Guid.NewGuid(),
                Name = addClient.Name,
                Address = addClient.Address,
                CountryId = addClient.CountryId,
                CreatedDate = DateTime.Now,
                CreatedById = addClient.CreatedById,
                EmailAddress = addClient.EmailAddress,
                PhoneNumber = addClient.PhoneNumber,
                Rowstatus = RowStatus.ACTIVE, 
                TinNumber = addClient.TinNumber,
                TypeOfCustomer = addClient.TypeOfCustomer,
                
            };

            await _dbContext.Clients.AddAsync(client);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = client,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<ClientsListDto>> GetClientList()
        {
            var vendors = await _dbContext.Clients.AsNoTracking().Include(x => x.Country).Select(x => new ClientsListDto
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address,
                CountryId = x.CountryId,
                CountryName = x.Country.CountryName,
                EmailAddress= x.EmailAddress,
                PhoneNumber = x.PhoneNumber,
                TinNumber= x.TinNumber,
                TypeOfCustomer = x.TypeOfCustomer.ToString()
            }).ToListAsync();
            return vendors;
        }

        public async Task<ResponseMessage> UpdateClient(UpdateClientDto updateClient)
        {
            var currentClient = await _dbContext.Clients.FirstOrDefaultAsync(x => x.Id.Equals(updateClient.Id));
            if (currentClient != null)
            {
                var vendorExist = await _dbContext.Vendors.AnyAsync(x => (x.Name == currentClient.Name || x.TinNumber == currentClient.TinNumber || x.PhoneNumber == currentClient.PhoneNumber) && x.Id != currentClient.Id);
                if (vendorExist)
                    return new ResponseMessage { Success = false, Message = "Name already Exists" };

                currentClient.TinNumber = updateClient.TinNumber;
                currentClient.PhoneNumber = updateClient.PhoneNumber;
                currentClient.Address = updateClient.Address;
                currentClient.CountryId = updateClient.CountryId;
                currentClient.EmailAddress =  updateClient.EmailAddress;
                currentClient.Name = updateClient.Name;
                currentClient.TypeOfCustomer  = updateClient.TypeOfCustomer;
                // currentVendor.Rowstatus = updateVendor.RowStatus;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentClient, Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Client" };
        }
    }
}
