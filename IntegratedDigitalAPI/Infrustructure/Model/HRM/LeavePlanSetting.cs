using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class LeavePlanSetting: WithIdModel
    {

        public Guid EmployeeId { get; set; }
        public virtual EmployeeList Employee { get; set; } = null!;
        public DateTime ToDate { get; set; }
        public DateTime FromDate { get; set; }
        public LeavePlanSettingStatus LeavePlanSettingStatus { get; set; }
        public string? Rejectedremark { get; set; }
         

    }
}
