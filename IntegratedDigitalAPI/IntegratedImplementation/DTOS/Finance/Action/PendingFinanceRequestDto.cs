using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Finance.Action
{
    public class PendingFinanceRequestDto
    {
        public Guid Id { get;set; }
        public string ProjectName { get; set; } = null!;
        public double AllocatedBudget { get; set; }
        public List<FinanceActivitiesDto> FinanceActivities { get; set; } = null!;

    }

    public class FinanceActivitiesDto
    {
        public string ActivityNumber { get; set; } = null!;
        public string ActivityDescription { get; set; } = null!;
        public double AllocatedBudget { get; set; }
        public double PlannedWork { get; set; }
        public string Indicator { get; set; } = null!;
        public List<FinanceWorkedBudgetDto> FinanceWorkedBudgets { get; set; } = null!;

    }

    public class FinanceWorkedBudgetDto 
    {
        public string Remark { get; set; } = null!;
        public double ActualWorked { get; set; } 
        public double UsedBudget { get; set; }
        public string? DocumentPath { get; set; }
        public DateTime Date { get; set; }

    }
}
