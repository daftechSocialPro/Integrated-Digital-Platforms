using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedImplementation.Interfaces.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        IClientsService _clientService;

        public ClientController(IClientsService clientsService)
        {
            _clientService = clientsService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ClientsListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetClientList()
        {
            return Ok(await _clientService.GetClientList());
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddClient(AddClientDto addClient)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _clientService.AddClient(addClient));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateClient(UpdateClientDto updateClient)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _clientService.UpdateClient(updateClient));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
