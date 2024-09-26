using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class PenaltyListDto
    {
        public string Id { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string PenaltyType { get; set; } = null!;
        public DateTime PenaltyDate { get; set; }
        public double Amount { get; set; }
        public bool Recursive { get; set; }
        public string Remark { get; set; } = null!;
        public bool Approved { get; set; }
        public double TotNumber { get; set; }
        public bool FromSalary { get; set; }
        public DateTime? PenalityendDate { get; set; }

    }

    public class AddPenaltyDto
    {
        public string EmployeeId { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
        public PenaltyType PenaltyType { get; set; }
        public DateTime PenaltyDate { get; set; }
        public double Amount { get; set; }
        public double TotNumber { get; set; }
        public bool FromSalary { get; set; }
        public bool Recursive { get; set; }
        public DateTime? PenalityendDate { get; set; }
        public string Remark { get; set; } = null!;
    }

}
