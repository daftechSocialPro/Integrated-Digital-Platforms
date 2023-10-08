using Implementation.Helper;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedImplementation.Services.Vacancy;
using IntegratedInfrustructure.Model.Vacancy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Vacancy
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ApplicantController : ControllerBase
    {

        private readonly IApplicantService _applicantService;

        public ApplicantController(IApplicantService applicantService)
        {
           _applicantService = applicantService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApplicantListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApplicantList(Guid vacancyId)
        {
            return Ok(await _applicantService.GetApplicantList(vacancyId));
        }

        [HttpGet]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        public async Task<IActionResult> CheckApplicantProfile(Guid employeeId)
        {
           return new JsonResult(await this._applicantService.CheckApplicantProfile(employeeId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddInternalApplicant([FromForm] InternalApplicantDto internalApplicant)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.AddInternalApplicant(internalApplicant));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddEducationLevel([FromBody] ApplicantEducationDto applicantEducation)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.AddEducationLevel(applicantEducation));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddWorkExperience([FromForm] ApplicantWorkExperienceDto applicantWorkExperience)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.AddWorkExperience(applicantWorkExperience));
            }
            else
            {
                return BadRequest();
            }
        }

       
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddApplicantDocument([FromForm] ApplicantVacancyDocumentDto applicantVacancy)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.AddApplicantDocument(applicantVacancy));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> StartVacancy(Guid applicantId, Guid vacancyId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.StartVacancy(applicantId, vacancyId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> FinalizeApplication(Guid applicantId, Guid vacancyId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.FinalizeApplication(applicantId, vacancyId));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [ProducesResponseType(typeof(ApplicantDetailDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApplicantDetail(Guid applicantId, Guid vacancyId)
        {
            return Ok(await _applicantService.GetApplicantDetail(applicantId, vacancyId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApplicantEducationListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApplicantEducation(Guid applicantId)
        {
            return Ok(await _applicantService.GetApplicantEducation(applicantId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApplicantWorkExperienceListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApplicantExperience(Guid applicantId)
        {
            return Ok(await _applicantService.GetApplicantExperience(applicantId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApplicantVacancyList), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApplicantVacancies(Guid applicantId)
        {
            return Ok(await _applicantService.GetApplicantVacancies(applicantId));
        }

        [HttpGet]
        [ProducesResponseType(typeof(ApplicantVacancyDocumentListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetApplicantDocument(Guid applicantVacancyId)
        {
            return Ok(await _applicantService.GetApplicantDocument(applicantVacancyId));
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ChangeApplicantStatus(ApplicantProcessDto applicantProcess)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.ChangeApplicantStatus(applicantProcess));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
