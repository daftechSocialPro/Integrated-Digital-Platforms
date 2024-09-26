using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class VacancyDocuments : WithIdModel
    {

        public string DocuemntName { get; set; } = null!;
        public string DocumentPath { get; set; } = null!;
        public virtual VacancyList Vacancy { get; set; } = null!;
        public Guid VacancyId { get; set; }
    }
}
