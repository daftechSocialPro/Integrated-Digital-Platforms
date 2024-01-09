using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.PM
{
    public class WeeklyReport : WithIdModel
    {

        public string Activity { get; set; }

        public string PlaceOfWork { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }


        public Guid EmployeeId { get; set; }

        public EmployeeList Employee { get; set; }

        public string? Remark { get; set; }


        public WEEKLYPLANSTATUS WeeklyPlanStatus { get; set; }


        public string? ReasonForNotDone { get; set; }


        public WORKSTATUS WorkStatus { get; set; }  

    }

    public enum WEEKLYPLANSTATUS
    {
        REQUESTED,
        REJECTED,
        APPROVED

    }
    public enum WORKSTATUS {
    
    INPROGRESS,
    NOTDONE,
    SCHEDULED,
    CANCELED
 
    
    }
}
