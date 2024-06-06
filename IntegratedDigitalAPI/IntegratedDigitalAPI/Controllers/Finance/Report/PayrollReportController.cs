using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.DTOS.Finance.Report;
using IntegratedImplementation.Interfaces.Finance.Report;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Report
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PayrollReportController : ControllerBase
    {
        private readonly IPayrollReportService _payrollReportService;

        public PayrollReportController(IPayrollReportService payrollReportService)
        {
            _payrollReportService = payrollReportService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(PayrollReportDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetPayrollReport(DateTime payrollMonth)
        {
            return Ok(await _payrollReportService.GetPayrollReport(payrollMonth));
        }


        [HttpGet]
        
        public async Task<IActionResult> GetPensionReport(DateTime payrollMonth)
        {
            return Ok(await _payrollReportService.GetPensionReport(payrollMonth));
        }

        [HttpGet]
        
        public async Task<IActionResult> GetIncomeTaxReport(DateTime payrollMonth)
        {
            return Ok(await _payrollReportService.GetIncomeTaxReport(payrollMonth));
        }
    }
}
