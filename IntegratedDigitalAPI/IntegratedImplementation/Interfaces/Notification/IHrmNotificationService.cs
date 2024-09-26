using IntegratedImplementation.DTOS.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Notification
{
    public interface IHrmNotificationService
    {
        public Task<List<NotificationDataDto>> GetEligbleLeavs();
        public Task<List<NotificationDataDto>> GetInternalVacancies();

    }
}
