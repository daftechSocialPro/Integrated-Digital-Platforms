using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class LoanRequest: WithIdModel
    {
        public Guid RequesterId { get; set; }
        public virtual EmployeeList Requester { get; set; } = null!;
        public Guid LoanSettingId { get; set; }
        public virtual LoanSetting LoanSetting { get; set; } = null!;
        public double TotalMoneyRequest { get; set; }
        public double DeductionRequest { get; set; }
        public LoanStatus LoanStatus { get; set; }
    }
}
