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
    public class StoreReceivalController : ControllerBase
    {
        IStoreReceivalService _storeReceival;

        public StoreReceivalController(IStoreReceivalService storeReceival)
        {
            _storeReceival = storeReceival;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CategoryListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetStoreApprovedItems()
        {
            return Ok(await _storeReceival.GetStoreApprovedItems());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> IssueStoreApprovedItems(StoreRequestIssueDto storeRequest)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _storeReceival.IssueStoreApprovedItems(storeRequest));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApprovedItemsDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeesApprovedItems(string EmployeeId)
        {
            return Ok(await _storeReceival.GetEmployeesApprovedItems(EmployeeId));
        }

    
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ReciveApprovedItems(ReceiveItems receiveItems)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _storeReceival.ReciveApprovedItems(receiveItems));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [ProducesResponseType(typeof(EmployeeReceivedITemsDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeReceivedItems(string employeeId)
        {
            return Ok(await _storeReceival.GetEmployeeReceivedItems(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AdjustReceivedItems(AdjustReceivedITemsDto receivedITemsDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _storeReceival.AdjustReceivedItems(receivedITemsDto));
            }
            else
            {
                return BadRequest();
            }
        }



    }
}
