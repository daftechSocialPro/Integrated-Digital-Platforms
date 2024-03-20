using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class PayrollDataListDto
    {
        public string Id { get; set; } = null!;
        public string? UserId { get; set; } = null!;
        public string PayrollMonth { get; set; } = null!;
        public int CalculatedCount { get; set; }
        public string PreparedBy { get; set; } = null!;
        public string CheckedBy { get; set; } = null!;
        public string ApprovedBy { get; set; } = null!;
        public double TotalAmount { get; set; }
        public bool IsActive { get; set; }

    }

    public class ApprovePayrollDataDto
    {
        public string PayrollDataId { get; set; } = null!;
        public string EmployeeId { get; set; } = null!;
    }

    public class PayrollParams
    {
        public DateTime PayrollMonth { get; set; }
        public string UserId { get; set; } = null!;
        public bool Recalculate { get; set; }
    }

  

   
}
