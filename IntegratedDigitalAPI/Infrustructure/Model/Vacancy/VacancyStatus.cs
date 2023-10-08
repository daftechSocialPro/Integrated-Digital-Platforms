using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class VacancyStatus
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ScheduleDate { get; set; }
        public DateTime? HireDate { get; set; }
        public string? ActionTakerId { get; set; }
        public virtual ApplicationUser ActionTaker { get; set; } = null!;
        public Guid ApplicantVacancyId { get; set; }
        public virtual ApplicantVacancy ApplicantVacancy { get; set; } = null!;
        public string? Subject { get; set; } = null!;
        public string? Description { get; set; } = null!;
        public ApplicantStatus ApplicantStatus { get; set; }
        public bool IsNotificationSent { get; set; }
        public bool Status { get; set; }
    }
}
