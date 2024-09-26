using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmployeeBankListDto
    {
        public Guid Id { get; set; }
        public string BankName { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;

        public bool IsSalaryBank { get; set; }
    }

    public class AddEmployeeBankDto
    {
        public Guid BankId { get; set; }
        public Guid EmployeeId { get; set; }

        public bool IsSalaryBank { get; set; }
        public string CreatedById { get; set; } = null!;
        public string AccountNumber { get; set; } = null!;  
    }
}
