using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSalary :WithIdModel
    {

        public Guid EmploymentDetailId { get; set; }
        public virtual EmploymentDetail EmploymentDetail { get; set; } = null!;
        public Guid ProjectId { get; set; }
        public Project Project { get; set; }
        public double Percentile { get; set;}       
    }
}
