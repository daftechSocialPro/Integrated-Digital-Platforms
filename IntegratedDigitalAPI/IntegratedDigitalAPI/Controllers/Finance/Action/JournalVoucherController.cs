using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedImplementation.Services.Finance.Action;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Finance.Action
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class JournalVoucherController : ControllerBase
    {
        private readonly IJournalVochureService _journalVoucherService;

        public JournalVoucherController(IJournalVochureService journalVoucherService)
        {
            _journalVoucherService = journalVoucherService;
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddPayments([FromBody] AddJournalVochureDto addJournalVochureDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _journalVoucherService.AddJournalVochure(addJournalVochureDto));
            }
            else
            {
                return BadRequest();
            }
        }



    }
}
