using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {

        IDepartmentService _departmentService;

        public DepartmentController(IDepartmentService departmentService)
        {
            _departmentService = departmentService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(DepartmentGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetDepartmentList()
        {
            return Ok(await _departmentService.GetDepartmentList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddDepartment([FromBody] DepartmentPostDto DepartmentDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _departmentService.AddDepartment(DepartmentDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateDepartment(DepartmentGetDto DepartmentDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _departmentService.UpdateDepartment(DepartmentDto));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
