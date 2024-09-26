using Microsoft.AspNetCore.Mvc;

using IntegratedDigitalAPI.DTOS.PM;
using IntegratedDigitalAPI.Services.PM.Commite;
using IntegratedImplementation.DTOS.Configuration;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class CommiteController : Controller
    {
        private readonly ICommiteService _commiteService;
        public CommiteController(ICommiteService commiteService)
        {
            _commiteService = commiteService;
        }



        [HttpPost]
        public IActionResult Create([FromBody] AddCommiteDto addCommiteDto)
        {
            try
            {
                var response = _commiteService.AddCommite(addCommiteDto);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpPut]
        public IActionResult Update([FromBody] UpdateCommiteDto updateCommiteDto)
        {
            try
            {
                var response = _commiteService.UpdateCommite(updateCommiteDto);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet]
        public async Task<List<CommiteListDto>> GetCommiteLists()
        {
            var response = await _commiteService.GetCommiteLists();
            return response;
        }

        [HttpGet("getNotIncludedEmployees")]
        public async Task<List<SelectListDto>> GetNotIncludedEmployees(Guid commiteId)
        {
            var response = await _commiteService.GetNotIncludedEmployees(commiteId);

            return response;
        }
        [HttpGet("getSelectListCommittee")]

        public async Task<List<SelectListDto>> getCommitteeSelectList()
        {

            var response = await _commiteService.GetSelectListCommittee();
            return response;
        }

        [HttpGet("GetCommiteeEmployees")]

        public async Task<List<SelectListDto>> GetCommiteeEmployees(Guid commiteId)
        {
            var response = await _commiteService.GetCommiteeEmployees(commiteId);

            return response;

        }




        [HttpPost("addEmployesInCommitee")]

        public IActionResult addEmployee([FromBody] CommiteEmployeesdto commite)
        {
            try
            {
                var response = _commiteService.AddEmployeestoCommitte(commite);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
        [HttpPost("removeEmployesInCommitee")]

        public IActionResult removeEmployee([FromBody] CommiteEmployeesdto commite)
        {
            try
            {
                var response = _commiteService.RemoveEmployeestoCommitte(commite);
                return Ok(new { response });

            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
    }
}
