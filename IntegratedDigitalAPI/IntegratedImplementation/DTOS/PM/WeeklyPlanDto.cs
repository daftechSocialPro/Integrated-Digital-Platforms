using IntegratedInfrustructure.Model.HRM;
using IntegratedInfrustructure.Model.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.PM
{
    public record WeeklyPlanDto
    {
        public Guid? Id { get; set; }
        public string Activity { get; set; }

        public string PlaceOfWork { get; set; }

        public DateTime FromDate { get; set; }

        public DateTime ToDate { get; set; }
        public Guid EmployeeId { get; set; }

        public string? EmployeeName { get; set; }

        public string? Detpartment { get; set; }

        public string? Remark { get; set; }


        public string? WeeklyPlanStatus { get; set; }


        public string? ReasonForNotDone { get; set; }


        public string? WorkStatus { get; set; }
    }
}
