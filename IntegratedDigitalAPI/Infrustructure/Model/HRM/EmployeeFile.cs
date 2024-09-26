using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeFile:WithIdModel
    {

        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get;set ; }
        public string FileName { get; set; } = null!;
        public string FilePath { get; set; } = null!;

        
    }
}
