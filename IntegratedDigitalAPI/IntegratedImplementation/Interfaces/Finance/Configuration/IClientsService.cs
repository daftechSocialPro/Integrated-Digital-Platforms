using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Configuration
{
    public  interface IClientsService
    {
        Task<List<ClientsListDto>> GetClientList();
        Task<ResponseMessage> AddClient(AddClientDto addClient);
        Task<ResponseMessage> UpdateClient(UpdateClientDto updateClient);
    }
}
