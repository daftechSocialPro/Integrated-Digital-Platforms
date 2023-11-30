using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class ShiftList : WithIdModel
    {
        public string ShiftName { get; set; } = null!;
        public string AmharicShiftName { get; set; } = null!;
        public TimeSpan CheckIn { get; set; }
        public TimeSpan CheckOut { get; set; }
        public int BreakTime { get; set; }
    }
}
