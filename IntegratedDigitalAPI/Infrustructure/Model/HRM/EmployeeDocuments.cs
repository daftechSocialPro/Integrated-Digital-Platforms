using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Vacancy;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeDocuments :WithIdModel
    {

        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public string DocumentPath { get; set; } = null!;
        public string DocumentName { get; set; } = null!;

    }
}
