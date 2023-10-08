using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class LoanRequestDto
    {
        public Guid EmployeeId { get; set; }
        public Guid LoanSettingId { get; set; }
        public double TotalMoneyRequest { get; set; }
        public double DeductionRequest { get; set; }
        public LoanStatus LoanStatus { get; set; }
    }
}
