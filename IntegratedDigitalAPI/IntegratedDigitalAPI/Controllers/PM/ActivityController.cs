using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedDigitalAPI.Services.PM.Activity;
using IntegratedImplementation.DTOS.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using System.Net;
using System.Net.Http.Headers;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]")]
    [ApiController]
    public class ActivityController : ControllerBase
    {

        private readonly IActivityService _activityService;
        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService;
        }


        [HttpPost]
        public IActionResult Create([FromBody] ActivityDetailDto addActivityDto)
        {
            try
            {
                var response = _activityService.AddActivityDetails(addActivityDto);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpPost("AddSubActivity")]
        public IActionResult AddSubActivity([FromBody] SubActivityDetailDto subActivity)
        {
            try
            {
                var response = _activityService.AddSubActivity(subActivity);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpPost("targetDivision")]
        public IActionResult AddTargetDivisionActivity(ActivityTargetDivisionDto activityTarget)
        {
            try
            {
                var response = _activityService.AddTargetActivities(activityTarget);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }



        [HttpPost("addProgress")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddActivityProgress([FromForm] AddProgressActivityDto Progress)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _activityService.AddProgress(Progress));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut("updateProgress")]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateActivityProgress([FromForm] AddProgressActivityDto Progress)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _activityService.UpdateProgress(Progress));
            }
            else
            {
                return BadRequest();
            }
        }





        [HttpGet("viewProgress")]
        public async Task<List<ProgressViewDto>> ViewActivityProgress(Guid actId)
        {
            return await _activityService.ViewProgress(actId);
        }
        [HttpGet("viewDraftProgress")]
        public async Task<ProgressViewDto> ViewDraftActivityProgress(Guid actId)
        {
            return await _activityService.ViewDraftProgress(actId);
        }

        [HttpGet("getAssignedActivties")]
        public async Task<List<ActivityViewDto>> GetAssignedActivity(Guid employeeId)
        {
            return await _activityService.GetAssignedActivity(employeeId);
        }

        [HttpGet("forApproval")]
        public async Task<List<ActivityViewDto>> forApproval(Guid employeeId)
        {
            return await _activityService.GetActivtiesForApproval(employeeId);
        }

        [HttpPost("approve")]
        public IActionResult ApproveProgress(ApprovalProgressDto approvalProgressDto)
        {
            try
            {
                var response = _activityService.ApproveProgress(approvalProgressDto);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }

        [HttpGet("getActivityAttachments")]
        public async Task<List<ActivityAttachmentDto>> GetActivityAtachments(Guid taskId)
        {

            return await _activityService.getAttachemnts(taskId);


        }

    }
}
