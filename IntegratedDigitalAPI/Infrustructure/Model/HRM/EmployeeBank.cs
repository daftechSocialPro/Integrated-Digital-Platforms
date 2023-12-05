using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeBank: WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid BankId { get; set; }
        public virtual BankList Bank { get; set; } = null!;
        public string BankAccountNo { get; set; } = null!;
    }
}
