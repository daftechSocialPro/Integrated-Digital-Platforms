﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedImplementation.Services.Finance.Action;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Action
{
    [Route("api/[controller]/[Action]")]
    [ApiController]
    public class PaymentRequsitionController : ControllerBase
    {
        IPaymentRequsitionService _paymentRequsition;

        public PaymentRequsitionController(IPaymentRequsitionService paymentRequsition)
        {
            _paymentRequsition = paymentRequsition;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PaymentRequisitionGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendingPaymentRequisitions()
        {
            return Ok(await _paymentRequsition.GetPendingPaymentRequisitions());
        }

        [HttpGet]
        [ProducesResponseType(typeof(PaymentRequisitionGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAuthorizedPaymentRequisitions()
        {
            return Ok(await _paymentRequsition.GetAuthorizedPaymentRequisitions());
        }

       

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPaymentRequisition([FromBody] PaymentRequisitionPostDto paymentRequisitionPostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _paymentRequsition.AddPaymentRequisition(paymentRequisitionPostDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApprovePaymentRequisition(ApprovePaymentRequsition paymentRequsition)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _paymentRequsition.ApprovePaymentRequisition(paymentRequsition));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(ActivityForSettlementDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeePaymentSettlements()
        {
            return Ok(await _paymentRequsition.GetEmployeePaymentSettlements());
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeRequsitionsDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeRequsitions(string userId)
        {
            return Ok(await _paymentRequsition.GetEmployeeRequsitions(userId));
        }


        [HttpGet]
        [ProducesResponseType(typeof(PendingRequestAmmountDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPendignRequestsByProjectManager(Guid employeeId)
        {
            return Ok(await _paymentRequsition.GetPendignRequestsByProjectManager(employeeId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(BudgetByActivityDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetBudgetByActivity(Guid activityId)
        {
            return Ok(await _paymentRequsition.GetBudgetByActivity(activityId));
        }

        
    }
}
