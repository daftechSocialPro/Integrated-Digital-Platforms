using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.PM;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IntegratedDigitalAPI.Controllers.PM
{
    [Route("api/PM/[controller]/[action]")]
    [ApiController]
    public class ProjectPaymentController : ControllerBase
    {

       private readonly IProjectPaymentService _projectPaymentService;

        public ProjectPaymentController(IProjectPaymentService projectPaymentService)
        {
            _projectPaymentService = projectPaymentService;
        }


        [HttpPost]
        public async Task<IActionResult> AddPaymentRequisition(PaymentRequisitionPostDto addActivityDto)
        {
            try
            {
                var response = await _projectPaymentService.AddPaymentRequisition(addActivityDto);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetPendingPaymentRequisitions()
        {
            try
            {
                var response = await _projectPaymentService.GetPendingPaymentRequisitions();
                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }


        [HttpGet]
        public async Task<IActionResult> GetAuthorizedPaymentRequisitions()
        {
            try
            {
                var response = await _projectPaymentService.GetAuthorizedPaymentRequisitions();
                return Ok(response );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error : {ex}");
            }
        }
    }
}
