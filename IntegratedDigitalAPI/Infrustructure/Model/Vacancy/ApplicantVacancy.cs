using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class ApplicantVacancy
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public virtual Applicant Applicant { get; set; } = null!;
        public Guid ApplicantId { get; set; }
        public virtual VacancyList Vacancy { get; set; } = null!;
        public Guid VacancyId { get; set; }
        public ApplicantStatus ApplicantStatus { get; set; }
    }
}
