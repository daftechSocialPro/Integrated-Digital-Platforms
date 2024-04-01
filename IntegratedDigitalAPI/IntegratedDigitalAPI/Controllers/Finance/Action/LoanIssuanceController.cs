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
    public class LoanIssuanceController : ControllerBase
    {
        ILoanIssuanceService _loanIssuanceService;

        public LoanIssuanceController(ILoanIssuanceService loanIssuanceService)
        {
            _loanIssuanceService = loanIssuanceService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(ApprovedLoansDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApprovedLoans()
        {
            return Ok(await _loanIssuanceService.GetApprovedLoans());
        }


        [HttpPost]
        public async Task<IActionResult> GiveLoan(Guid employeeLoanId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _loanIssuanceService.GiveLoan(employeeLoanId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> PayLoan(LoanPaymentDto loanPayment)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _loanIssuanceService.PayLoan(loanPayment));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
