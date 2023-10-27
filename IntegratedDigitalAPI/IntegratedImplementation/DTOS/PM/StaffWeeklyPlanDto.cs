using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.PM
{
    public class StaffWeeklyPlanDto
    {
        public string ActivityNo { get; set; } = null!;
        public string Activity { get; set; } = null!;
        public string PlaceOfWork { get; set; } = null!;
        public DateTime ExecutionDate { get; set; }
        public string Responsible { get; set; } = null!;
    }

    public class FilterDateCriteriaDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
    }


    public class PlanPerformanceListDto
    {
        public string ActivityNo { get; set; } = null!;
        public string Activity { get; set; } = null!;
        public string Status { get; set; } = null!;
        public string ReasonsForNotComplited { get; set; } = null!;
        public string Remark { get; set; } = null!;
    }

}
