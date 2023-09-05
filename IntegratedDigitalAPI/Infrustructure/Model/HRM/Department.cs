using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public  class Department :WithIdModel
    {
        public string DepartmentName { get; set; } = null!;
        public string Remark { get; set; } = null!;
    }
}
