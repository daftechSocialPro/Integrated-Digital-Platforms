using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoanManagementController : ControllerBase
    {
        private ILoanManagementService _loanManagementService;

        public LoanManagementController(ILoanManagementService loanManagementService)
        {
            _loanManagementService = loanManagementService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(LoanInfoDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> EmployeesLoanAmmount(Guid employeeId)
        {
            return Ok(await _loanManagementService.EmployeesLoanAmmount(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RequestLoan([FromBody] RequestLoanDto requestLoan)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _loanManagementService.RequestLoan(requestLoan));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(LoanInfoDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> LoanRequestList()
        {
            return Ok(await _loanManagementService.LoanRequestList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveInitialRequest([FromBody] ApproveInitialRequestDto approveinitial)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _loanManagementService.ApproveInitialRequest(approveinitial));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [ProducesResponseType(typeof(EmployeeLoanDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeLoans()
        {
            return Ok(await _loanManagementService.GetEmployeeLoans());
        }
    }
}
