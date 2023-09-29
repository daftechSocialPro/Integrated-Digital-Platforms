using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.DTOS.Notification;
using IntegratedImplementation.Interfaces.Notification;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Notification
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class HrmNotificationController : ControllerBase
    {
        private readonly IHrmNotificationService _hrmNotification;

        public HrmNotificationController(IHrmNotificationService hrmNotification)
        {
            _hrmNotification = hrmNotification;
        }

        [HttpGet]
        [ProducesResponseType(typeof(NotificationDataDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetEligbleLeavs()
        {
            return Ok(await _hrmNotification.GetEligbleLeavs());
        }
        [HttpGet]
        [ProducesResponseType(typeof(NotificationDataDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetInternalVacancies()
        {
            return Ok(await _hrmNotification.GetInternalVacancies());
        }

    }
}
