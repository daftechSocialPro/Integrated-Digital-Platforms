using IntegratedInfrustructure.Model.Authentication;
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
        public virtual EmploymentDetail EmploymentDetail { get; set; }
        public string ProjectName { get; set; } 
        public double Amount { get; set;}       


    }
}
