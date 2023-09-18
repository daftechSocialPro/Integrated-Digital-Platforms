using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Vacancy;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedImplementation.Services.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Vacancy
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class VacancyController : ControllerBase
    {
        IVacancyService _vacancyService;

        public VacancyController(IVacancyService vacancyService)
        {
            _vacancyService = vacancyService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(VacancyListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVacancyList()
        {
            return Ok(await _vacancyService.GetVacancyList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(VacancyListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVacancyDetail(Guid vacancyId)
        {
            return Ok(await _vacancyService.GetVacancyDetail(vacancyId));
        }


        [HttpGet]
        [ProducesResponseType(typeof(UpdateVacancyDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVacancyEdit(Guid vacancyId)
        {
            return Ok(await _vacancyService.GetVacancyEdit(vacancyId));
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddVacancy([FromBody] AddVacancyDto addVacancy)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vacancyService.AddVacancy(addVacancy));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateVacancy(UpdateVacancyDto updateVacancy)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vacancyService.UpdateVacancy(updateVacancy));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> ApproveVacancy(Guid vacancyId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vacancyService.ApproveVacancy(vacancyId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpGet]
        [ProducesResponseType(typeof(VacancyListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetVacancyDocuments(Guid vacancyId)
        {
            return Ok(await _vacancyService.GetVacancyDocuments(vacancyId));
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddVacancyDocument([FromForm] AddVacancyDocumentDto addVacancyDocument)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _vacancyService.AddVacancyDocument(addVacancyDocument));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpDelete]

        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> DeleteVacancyDocument(Guid vacancyDocId)
        {
            return Ok(await _vacancyService.DeleteVacancyDocument(vacancyDocId));
        }

        

    }
}
