using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Services.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectFundSourceController : ControllerBase
    {
        IProjectFundSourceService _ProjectFundSourceService;

        public ProjectFundSourceController(IProjectFundSourceService ProjectFundSourceService)
        {
            _ProjectFundSourceService = ProjectFundSourceService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(ProjectFundSourceGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectFundSourceList()
        {
            return Ok(await _ProjectFundSourceService.GetProjectFundSource());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProjectFundSource([FromBody] ProjectFundSourcePostDto ProjectFundSourceDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ProjectFundSourceService.AddProjectFundSource(ProjectFundSourceDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateProjectFundSource(ProjectFundSourceGetDto ProjectFundSourceDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ProjectFundSourceService.UpdateProjectFundSource(ProjectFundSourceDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteProjectFundSource(Guid projectFundSourceId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ProjectFundSourceService.DeleteProjectFundSource(projectFundSourceId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet("GetRemainingBudget")]
        [ProducesResponseType(typeof(double), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetRemainingBudget(Guid projectFundSourceId)
        {
            return Ok(await _ProjectFundSourceService.GetRemainingBudget(projectFundSourceId));
        }

    }
}
