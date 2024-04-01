using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Action
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PurchaseInvoiceController : ControllerBase
    {
        IPurchaseInvoiceService _purchaseInvoiceService;

        public PurchaseInvoiceController(IPurchaseInvoiceService purchaseInvoiceService)
        {
            _purchaseInvoiceService = purchaseInvoiceService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PurchaseInvoiceDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingPurchaseInvoices()
        {
            return Ok(await _purchaseInvoiceService.GetPendingPurchaseInvoices());
        }

        [HttpGet]
        [ProducesResponseType(typeof(PurchaseInvoiceDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPurchaseInvoices()
        {
            return Ok(await _purchaseInvoiceService.GetPurchaseInvoices());
        }


        [HttpPost]
        public async Task<IActionResult> AddPurchaseInvoice(AddPurchaseInvoiceDto addPurchaseInvoice)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _purchaseInvoiceService.AddPurchaseInvoice(addPurchaseInvoice));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApprovePurchaseInvoice(Guid PurchaseInvoiceId, Guid EmployeeId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _purchaseInvoiceService.ApprovePurchaseInvoice(PurchaseInvoiceId, EmployeeId));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
