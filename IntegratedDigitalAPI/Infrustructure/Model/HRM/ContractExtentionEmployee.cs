using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class ContractExtentionEmployee: WithIdModel
    {
        public Guid EmploymentDetailId { get; set; }
        public virtual EmploymentDetail EmploymentDetail { get; set; } = null!;

        public DateTime PreviousStartDate { get; set; }
        public DateTime? PreviousEndDate { get; set; }
        public string? Remark { get; set; } 

    }
}
