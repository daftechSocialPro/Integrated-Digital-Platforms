using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmployeeFingerPrintListDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string Department { get; set; } = null!;
        public int FingerPrint { get; set; }
    }

    public class AddEmployeeFingerPrintDto
    {
        public Guid EmployeeId { get; set; }
        public string CreatedById { get; set; } = null!;
        public int FingerPrint { get; set; }
    }

    public class UpdateEmployeeFingerPrintDto
    {
        public Guid Id { get; set; }
        public int FingerPrintCode { get; set; }

        public Guid EmployeeId { get; set; }
    }

}
