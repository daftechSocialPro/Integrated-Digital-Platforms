using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.DTOS.HRM;
using MembershipImplementation.DTOS.Payment;
using MembershipImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace MembershipDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class MemberController : ControllerBase
    {
        IMemberService _memberService;

        public MemberController(IMemberService memberService)
        {
            _memberService = memberService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(MembersGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CheckIfPhoneNumberExist(string phoneNumber)
        {
            return Ok(await _memberService.CheckPhoneNumberExist(phoneNumber));
        }


        [HttpGet]
        [ProducesResponseType(typeof(ResponseMessage2), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CheckIfPhoneNumberExistFromBot(string phoneNumber)
        {
            return Ok(await _memberService.CheckIfPhoneNumberExistFromBot(phoneNumber));
        }


        [HttpGet]
        [ProducesResponseType(typeof(MembersGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetMmebers()
        {
            return Ok(await _memberService.GetMembers());
        }

        [HttpGet]
        [ProducesResponseType(typeof(MembersGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSingleMember(Guid memberId)
        {
            return Ok(await _memberService.GetSingleMember(memberId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(CompleteProfileDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> CompleteProfile([FromForm] CompleteProfileDto profile)
        {
            return Ok(await _memberService.CompleteProfile(profile));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> MakePayment(MemberPaymentDto memberPayment)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.MakePayment(memberPayment));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        [ProducesResponseType(typeof(MemberPaymentDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetSingleMemberPayment(Guid memberId)
        {
            return Ok(await _memberService.GetSingleMemberPayment(memberId));
        }



        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> MakePaymentConfirmation(string text_rn)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.MakePaymentConfirmation(text_rn));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateMember(MemberUpdateDto memberDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.UpdateProfile(memberDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeIdCardStatus(Guid memberId, string status, string? remark)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.ChangeIdCardStatus(memberId, status, remark));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(MembersGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetRequstedIdMembers()
        {
            return Ok(await _memberService.RequstedIdCards());
        }

        [HttpGet]
        [ProducesResponseType(typeof(MemberRegionRevenueReportDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetRegionReportRevenue()
        {
            return Ok(await _memberService.GetRegionRevenueReport());
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateProfileFromAdmin([FromForm] MemberUpdateDto memberDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.UpdateProfileFromAdmin(memberDto));
            }
            else
            {
                return BadRequest();
            }
        }


     

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateMoodle(MoodleDto moodlePost)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.UpdateMemberMoodle(moodlePost));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateMoodleStatus(Guid memberId,string status)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.UpdateMoodleSatus(memberId,status));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ImportMemberFormExcel(IFormFile ExcelFile)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.ImportMemberFormExcel(ExcelFile));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteMember(Guid memberId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _memberService.DeleteMember(memberId));
            }
            else
            {
                return BadRequest();
            }
        }





        //[HttpGet]
        //[ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> GetEmployees()
        //{
        //    return Ok(await _employeeService.GetEmployees());
        //}
        //[HttpGet("getEmployee")]
        //[ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> GetEmployee(Guid employeeId)
        //{
        //    return Ok(await _employeeService.GetEmployee(employeeId));
        //}
        //[HttpGet("getEmployeeNoUser")]
        //[ProducesResponseType(typeof(EmployeeGetDto), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> GetEmployeeNoUser()
        //{
        //    return Ok(await _employeeService.GetEmployeeNoUser());
        //}


        //[HttpPost]
        //[ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> AddEmployee([FromForm] EmployeePostDto employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        return Ok(await _employeeService.AddEmployee(employee));
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //}


        //[HttpPut]
        //[ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> UpdateEmployee([FromForm] EmployeeGetDto employee)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        return Ok(await _employeeService.UpdateEmployee(employee));
        //    }
        //    else
        //    {
        //        return BadRequest();
        //    }
        //}

        //[HttpGet("getEmployeesSelectList")]
        //[ProducesResponseType(typeof(SelectListDto), (int)HttpStatusCode.OK)]
        //public async Task<IActionResult> GetEmployeesSelectList()
        //{
        //    return Ok(await _employeeService.GetEmployeeSelectList());
        //}





    }
}
