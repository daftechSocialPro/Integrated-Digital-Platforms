using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class ShiftDetail: WithIdModel
    {
        public Guid ShiftId { get; set; }
        public virtual ShiftList Shift { get; set; } = null!;
        public string WeekDays { get; set; } = null!;
        public int BreakTime { get; set; } 
    }
}
