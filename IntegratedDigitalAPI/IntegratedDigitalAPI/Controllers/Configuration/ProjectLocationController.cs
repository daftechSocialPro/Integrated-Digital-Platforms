using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectLocationController : ControllerBase
    {
        IProjectLocationService _ProjectLocationService;

        public ProjectLocationController(IProjectLocationService ProjectLocationService)
        {
            _ProjectLocationService = ProjectLocationService;
        }


        [HttpGet]
        [ProducesResponseType(typeof(ProjectLocationGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProjectLocationList()
        {
            return Ok(await _ProjectLocationService.GetProjectLocation());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProjectLocation([FromBody] ProjectLocationPostDto ProjectLocationDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ProjectLocationService.AddProjectLocation(ProjectLocationDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateProjectLocation(ProjectLocationGetDto ProjectLocationDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ProjectLocationService.UpdateProjectLocation(ProjectLocationDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteProjectLocation(Guid projectLocationId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _ProjectLocationService.DeleteProjectLocation(projectLocationId));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
