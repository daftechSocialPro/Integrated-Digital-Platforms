using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.DTOS.Finance.Configuration;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Configuration;
using IntegratedInfrustructure.Model.FInance.Actions;
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

        [HttpGet]
        [ProducesResponseType(typeof(PaymentListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApprovedPayments()
        {
             return Ok(await _paymentService.GetApprovedPayments());
        }

        [HttpGet]
        [ProducesResponseType(typeof(PaymentListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAuthorizedPayments()
        {
            return Ok(await _paymentService.GetAuthorizedPayments());
        }


        [HttpPost]
        [Consumes("multipart/form-data")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPayments([FromForm] AddPaymentDto addPayment ) 
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

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AuthorizePayment(ApprovePaymentDto approvePayment)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _paymentService.AuthorizePayment(approvePayment));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(PaymentLetterDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPaymentLetter(Guid paymentId)
        {
            return Ok(await _paymentService.GetPaymentLetter(paymentId));
        }


        [HttpGet]
        [ProducesResponseType(typeof(PendingFinanceRequestDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingProjectFinanceRequests()
        {
            return Ok(await _paymentService.GetPendingProjectFinanceRequests());
        }
    }
}
