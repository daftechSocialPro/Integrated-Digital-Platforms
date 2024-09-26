using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Vacancy
{

    public class VacancyFilterDto
    {
        public bool? Status { get; set; }
        public Guid? PositionId { get; set; }
        public Guid? DepartmentId { get; set; }
        public DateTime? Date { get; set; }
    }

    public class ApplicantFilterDto
    {
        public Guid VacancyId { get; set; }
        public int? ApplicantStatus { get; set; }
        public int? ApplicantType { get; set; }
    }
}
