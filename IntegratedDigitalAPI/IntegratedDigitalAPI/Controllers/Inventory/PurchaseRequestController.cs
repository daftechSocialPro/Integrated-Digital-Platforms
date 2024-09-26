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
    public class PurchaseRequestController : ControllerBase
    {
        private IPurchaseRequestService _purchaseRequest;

        public PurchaseRequestController(IPurchaseRequestService purchaseRequest)
        {
            _purchaseRequest = purchaseRequest;
        }

      
        [HttpGet]
        [ProducesResponseType(typeof(PurchaseRequestListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingRequests()
        {
            return Ok(await _purchaseRequest.GetPendingRequests());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPurchaseRequest(AddPurchaseRequestDto purchase)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _purchaseRequest.AddPurchaseRequest(purchase));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveItems(List<ApprovePurchaseRequestDto> purchaseRequestLists)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _purchaseRequest.ApproveItems(purchaseRequestLists));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApprovedPurchaseRequestsDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApproveItems()
        {
            return Ok(await _purchaseRequest.GetApproveItems());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPerforma(AddPerformaDto addPerforma)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _purchaseRequest.AddPerforma(addPerforma));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveFinalRequest(ApprovePerformaDto approvePerforma)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _purchaseRequest.ApproveFinalRequest(approvePerforma));
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
