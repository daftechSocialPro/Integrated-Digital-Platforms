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
    }
}
