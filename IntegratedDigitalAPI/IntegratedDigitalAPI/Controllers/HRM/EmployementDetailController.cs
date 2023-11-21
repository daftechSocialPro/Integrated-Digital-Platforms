using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class EmployementDetailController : ControllerBase
    {
        IEmployementDetailService _employementDetailService;

        public EmployementDetailController(IEmployementDetailService employementDetailService)
        {
            _employementDetailService = employementDetailService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ResignationRequestListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> TerminatedEmployeesList()
        {
            return Ok(await _employementDetailService.TerminatedEmployeesList());
        }


        [HttpGet]
        [ProducesResponseType(typeof(TerminatedEmployeesDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetResingationLists()
        {
            return Ok(await _employementDetailService.GetResingationLists());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RequestResignationLetter([FromForm] ResignationRequestDto resignationRequest)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.RequestResignationLetter(resignationRequest));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveResignationRequest( Guid requestId, Guid employeeId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.ApproveResignationRequest(requestId, employeeId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApprovedResignationListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApprovedResignationListDto()
        {
            return Ok(await _employementDetailService.ApprovedResignationListDto());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> TerminateRequester( Guid requestId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.TerminateRequester(requestId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> TerminateEmployee([FromBody]TerminateRequestDto terminateEmployee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.TerminateEmployee(terminateEmployee.EmployementDetailId, terminateEmployee.Remark, terminateEmployee.BlacListed));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> RehireEmployee([FromBody] RehireEmployeeDto rehireEmp)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.RehireEmployee(rehireEmp));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeSupervisorsDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeSupervisors()
        {
            return Ok(await _employementDetailService.GetEmployeeSupervisors());
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetToBeSupervisedEmployees()
        {
            return Ok(await _employementDetailService.GetToBeSupervisedEmployees());
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeSupervisorsDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSupervisorsByEmployee(Guid employeeId)
        {
            return Ok(await _employementDetailService.GetSupervisorsByEmployee(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AssignSupervisor([FromBody] AssignSupervisorDto assignSupervisor)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.AssignSupervisor(assignSupervisor));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteSupervisee(Guid employeeId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.DeleteSupervisee(employeeId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeDisciplinaryListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeDisciplinaries()
        {
            return Ok(await _employementDetailService.GetEmployeeDisciplinaries());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddDisciplinaryCase(AddDisciplinaryCaseDto addDisciplinary)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.AddDisciplinaryCase(addDisciplinary));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveCase(ApproveDisciplinaryCase approveDisplinary)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.ApproveCase(approveDisplinary));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeBenefitListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeBenefits(Guid employeeId)
        {
            return Ok(await _employementDetailService.GetEmployeeBenefits(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployeeBenefit(AddEmployeeBenefitDto addEmployeeBenefit)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employementDetailService.AddEmployeeBenefit(addEmployeeBenefit));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
