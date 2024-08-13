using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using static IntegratedInfrustructure.Data.EnumList;

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
        public async Task<IActionResult> AddJournalVochure(AddJournalVochureDto addJournalVochureDto)
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

        [HttpGet]
        [ProducesResponseType(typeof(List<GetJournalVoucherDto>), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetJournalVochures(TypeofJV typeofJV)
        {
            return Ok(await _journalVoucherService.GetJournalVochures(typeofJV));
        }


    }
}
