using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class ContractEndEmployeesDto
    {
        public Guid EmployeeId { get;set; }
        public string FullName { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int RemainingDays { get; set; }

    }

    public class ExtendContractDto
    {
        public Guid EmployeeId { get; set; }
        public string CreatedById { get; set; } = null!;
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string? Remark { get; set; }
    }


    public class ContractExtentionLetterDto
    {
        public DateTime TodaysDate { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string Position { get; set; } = null!;
        public DateTime PreviousStartDate { get; set; }
        public DateTime? PreviousEndDate { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
    }
}
