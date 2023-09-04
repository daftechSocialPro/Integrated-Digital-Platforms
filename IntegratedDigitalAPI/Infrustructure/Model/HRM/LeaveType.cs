using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class LeaveType :WithIdModel
    {
        public string Name { get; set; } = null!;

        public LeaveCategory LeaveCategory { get; set; }

        public int MinDate { get; set; }

        public int? MaxDate { get; set; }    

        public int? IncrementValue { get; set; }
    }
}
