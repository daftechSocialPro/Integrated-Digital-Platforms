using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Interfaces.Configuration;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MembershipAPI.Controllers.Configuration
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class CourseController : ControllerBase
    {

        ICourseService _CourseService;

        public CourseController(ICourseService CourseService)
        {
            _CourseService = CourseService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CourseGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetCourseList(Guid membershipTypeId )
        {
            return Ok(await _CourseService.GetCourseList(membershipTypeId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(CourseGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetMemberEvents(Guid memberId)
        {
            return Ok(await _CourseService.GetMemberEvents(memberId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(CourseGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSingleEvent(Guid eventId)
        {
            return Ok(await _CourseService.GetSingleEvent(eventId));
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddCourse([FromForm] CoursePostDto CourseDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _CourseService.AddCourse(CourseDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateCourse([FromForm] CourseGetDto CourseDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _CourseService.UpdateCourse(CourseDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteCourse(Guid CourseId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _CourseService.DeleteCourse(CourseId));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
