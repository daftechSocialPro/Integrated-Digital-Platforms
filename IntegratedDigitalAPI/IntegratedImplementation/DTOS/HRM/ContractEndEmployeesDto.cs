using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class ContractEndEmployeesDto
    {
        public Guid EmployeeId { get;set; }
        public string FullName { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int RemainingDays { get; set; }

    }
}
