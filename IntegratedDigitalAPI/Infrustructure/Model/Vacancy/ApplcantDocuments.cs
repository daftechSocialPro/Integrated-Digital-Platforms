using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class ApplcantDocuments
    {
        public Guid Id { get; set; }
        public virtual ApplicantVacancy ApplicantVacnncy { get; set; } = null!;
        public Guid ApplicantVacnncyId { get; set; }
        public string DocumentPath { get; set; } = null!;
        public string? Description { get; set; }
    }
}
