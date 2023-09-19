using Implementation.Helper;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedImplementation.Services.Vacancy;
using IntegratedInfrustructure.Model.Vacancy;
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
        public async Task<IActionResult> GetApplicantList()
        {
            return Ok(await _applicantService.GetApplicantList());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddInternalApplicant([FromBody] InternalApplicantDto internalApplicant)
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
        public async Task<IActionResult> AddWorkExperience([FromBody] ApplicantWorkExperienceDto applicantWorkExperience)
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
        public async Task<IActionResult> ApplyForVanacncy([FromBody] ApplyVacancyDto applyVacancy)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _applicantService.ApplyForVanacncy(applyVacancy));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddApplicantDocument([FromBody] ApplicantVacancyDocumentDto applicantVacancy)
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
        public async Task<IActionResult> GetApplicantDetail(Guid applicantId)
        {
            return Ok(await _applicantService.GetApplicantDetail(applicantId));
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

    }
}
