using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyProfileController : ControllerBase
    {
        ICompanyProfileService _companyProfileService;

        public CompanyProfileController(ICompanyProfileService companyProfileService)
        {
            _companyProfileService = companyProfileService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(CompanyProfileGetDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetCompanyProfile()
        {
            return Ok(await _companyProfileService.GetCompanyProfile());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddCompanyProfile( [FromForm] CompanyProfilePostDto companyProfilePostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _companyProfileService.AddCompanyProfile(companyProfilePostDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateCompanyProfile([FromForm]CompanyProfilePostDto companyProfilePostDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _companyProfileService.UpdateCompanyProfile(companyProfilePostDto));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
