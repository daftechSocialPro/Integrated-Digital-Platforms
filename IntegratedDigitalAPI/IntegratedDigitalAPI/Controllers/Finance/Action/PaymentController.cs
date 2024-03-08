using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Action
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        IPaymentsService _paymentService;

        public PaymentController(IPaymentsService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PaymentListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingPayments()
        {
            return Ok(await _paymentService.GetPendingPayments());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddAccountingPeriod(AddPaymentDto addPayment)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _paymentService.AddPayments(addPayment));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApprovePayment(ApprovePaymentDto approvePayment)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _paymentService.ApprovePayment(approvePayment));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
