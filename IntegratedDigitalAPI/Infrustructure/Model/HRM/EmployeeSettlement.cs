using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSettlement: WithIdModel
    {
        public Guid EmployeeLoanId { get; set; }
        public EmployeeLoan EmployeeLoan { get; set; } = null!;
        public double PayedMoney { get; set; }
    }
}
