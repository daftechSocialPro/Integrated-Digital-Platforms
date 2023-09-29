using IntegratedImplementation.DTOS.Notification;
using IntegratedImplementation.Interfaces.Notification;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Notification
{
    public class HrmNotificationService : IHrmNotificationService
    {
        private readonly ApplicationDbContext _dbContext;
        public HrmNotificationService(ApplicationDbContext dbContext) 
        { 
            _dbContext = dbContext;
        }
        public async Task<List<NotificationDataDto>> GetEligbleLeavs()
        {
            var leaveNotification = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.ANNUALLEAVEREQESTMONTH);

            if (leaveNotification == null)
                return new List<NotificationDataDto>();

            int Leavs = Convert.ToInt32(leaveNotification.Value);

            return await _dbContext.Employees.Where(x => x.EmploymentDate >= x.EmploymentDate.AddMonths(Leavs))
                        .Where(b => !_dbContext.EmployeeLeaves.Any(x => x.EmployeeId == b.Id))
                        .Select(z => new NotificationDataDto
                        {
                            Id = z.Id,
                            Name = z.FirstName + " " + z.MiddleName + " " + z.LastName,
                            Description = z.EmploymentDate.ToString("MMMM, dd/yyyy")
                        }).ToListAsync();
        }

        public async Task<List<NotificationDataDto>> GetInternalVacancies()
        {
            return await _dbContext.VacancyLists.
                Where(x => x.VaccancyStartDate <= DateTime.Now && x.VaccancyEndDate >= DateTime.Now && (x.VacancyType == VacancyType.INTERNAL || x.VacancyType == VacancyType.BOTH)&&x.IsApproved)
                        .Select(z => new NotificationDataDto
                        {
                            Id = z.Id,
                            Name = z.VacancyName,
                            Description = "Remaining Days: " + (z.VaccancyEndDate - DateTime.Now).Days.ToString()
        }).ToListAsync();
        }
    }
}
