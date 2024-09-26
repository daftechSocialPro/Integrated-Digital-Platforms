using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.PM
{
    public record ReportingPeriodGetDto
    {
        public Guid? Id { get; set; }
        public int NumberOfDays { get; set; }
        public string ReportingType { get; set; }
    }

    public record ReportingPeriodPostDto
    {
       
        public int NumberOfDays { get; set; }
        public string ReportingType { get; set; }
        public string CreatedById { get; set; }

    }


    public record BudgetYearDto
    {
        public Guid? Id { get; set; }
        public int BudgetYear { get; set; }
        public string? Status { get; set; }

        public string? CreatedById { get; set; }
    }
}
