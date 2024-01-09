using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Inventory
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class StoreRequestController : ControllerBase
    {
        private IStoreRequestService _storeRequest;

        public StoreRequestController(IStoreRequestService storeRequest)
        {
            _storeRequest= storeRequest;
        }

       

        [HttpGet]
        [ProducesResponseType(typeof(StoreRequestItems), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingStoreRequests()
        {
            return Ok(await _storeRequest.GetPendingStoreRequests());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddStoreRequest(AddStoreRequestDto store)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _storeRequest.AddStoreRequest(store));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveStoreRequest(ApproveStoreRequest store)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _storeRequest.ApproveStoreRequest(store));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RejectStoreRequest(RejectStoreRequest store)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _storeRequest.RejectStoreRequest(store));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
