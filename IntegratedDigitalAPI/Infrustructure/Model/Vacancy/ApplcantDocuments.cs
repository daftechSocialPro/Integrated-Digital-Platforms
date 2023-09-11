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
        public virtual Applicant Applicant { get; set; } = null!;
        public Guid ApplicantId { get; set; }
        public string DocumentPath { get; set; } = null!;
        public Guid VacancyDocumentId { get; set; }
        public virtual VacancyDocuments VacancyDocument { get; set; } = null!;
    }
}
