using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class ShiftListDto
    {
        public string? Id { get; set; } = null!;
        public string? CreatedById { get; set; } 
        public string ShiftName { get; set; } = null!;
        public string AmharicShiftName { get; set; } = null!;
        public TimeSpan CheckIn { get; set; }
        public TimeSpan CheckOut { get; set; }
        public int BreakTime { get; set; }
    }


    public class BindShiftDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid ShiftId { get; set; }
        public Guid EmployeeId { get; set; }
    }
}
