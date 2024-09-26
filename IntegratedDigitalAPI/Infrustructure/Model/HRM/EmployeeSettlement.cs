using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeSettlement: WithIdModel
    {
        public Guid EmployeeLoanId { get; set; }
        public EmployeeLoan EmployeeLoan { get; set; } = null!;
        public double PaidMoney { get; set; }
        public DateTime PaidDate { get; set; }
    }
}
