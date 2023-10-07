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
    public class EmployeeController : ControllerBase
    {
        IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployees()
        {
            return Ok(await _employeeService.GetEmployees());
        }
        [HttpGet]
        [ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployee(Guid employeeId)
        {
            return Ok(await _employeeService.GetEmployee(employeeId));
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployee([FromForm] EmployeePostDto employee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployee(employee));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployeeData([FromForm] EmployeeUpdateDto employee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployeeData(employee));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        public async Task<List<SelectListDto>> GetEmployeesNoUserSelectList()
        {

            return await _employeeService.GetEmployeesNoUserSelectList();
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployee([FromForm] EmployeePostDto employee)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.AddEmployee(employee));
            }
            else
            {
                return BadRequest();
            }
        }

        //history

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeHistoryDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeHistory(Guid employeeId)
        {
            return Ok(await _employeeService.GetEmployeeHistory(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployeeHistory(EmployeeHistoryPostDto employeeHistory)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.AddEmployeeHistory(employeeHistory));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployeeHistory(EmployeeHistoryPostDto employeeHistory)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployeeHistory(employeeHistory));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteEmployeeHistory(Guid employeeHistoryId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.deleteEmployeeHistory(employeeHistoryId));
            }
            else
            {
                return BadRequest();
            }
        }
        // employee Salary 

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeHistoryDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeSalaryHistory(Guid employeeId)
        {
            return Ok(await _employeeService.GetEmployeeSalaryHistory(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployeeSalaryHistory(EmployeeSalryPostDto employeeSalary)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.AddEmployeeSalaryHistory(employeeSalary));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployeeSalaryHistory(EmployeeSalaryGetDto employeeSalary)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployeeSalaryHistory(employeeSalary));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteEmployeeSalaryHistory(Guid employeeHistoryId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.deleteEmployeeSalaryHistory(employeeHistoryId));
            }
            else
            {
                return BadRequest();
            }
        }

        //family 

        [HttpGet]
        [ProducesResponseType(typeof(EmployeeFamilyGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeFamily(Guid employeeId)
        {
            return Ok(await _employeeService.GetEmployeeFamily(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployeeFamily(EmployeeFamilyPostDto employeeFamily)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.AddEmployeeFamily(employeeFamily));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployeeFamily(EmployeeFamilyGetDto employeeFamily)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployeeFamily(employeeFamily));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteEmployeeFamily(Guid employeeFamilyId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.deleteEmployeeFamily(employeeFamilyId));
            }
            else
            {
                return BadRequest();
            }
        }

        //Education 


        [HttpGet]
        [ProducesResponseType(typeof(EmployeeEducationGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEmployeeEducation(Guid employeeId)
        {
            return Ok(await _employeeService.GetEmployeeEducation(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEmployeeEducation(EmployeeEducationPostDto employeeEducation)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.AddEmployeeEducation(employeeEducation));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateEmployeeEducation(EmployeeEducationPostDto employeeEducation)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.UpdateEmployeeEducation(employeeEducation));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteEmployeeEducation(Guid employeeEducationId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _employeeService.deleteEmployeeEducation(employeeEducationId));
            }
            else
            {
                return BadRequest();
            }
        }


    }
}
