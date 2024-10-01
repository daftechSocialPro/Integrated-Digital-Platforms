using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{

    public class EmployeeDisciplinaryListDto
    {
        public Guid EmployeeId { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string? ImagePath { get; set; }
        public int TotalWarnings { get; set; }
        public List<DisciplinaryCaseListDto> DisciplinaryCaseLists { get; set; } = null!;
    }
    public class DisciplinaryCaseListDto
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string WarningType { get; set; } = null!;
        public string Fault { get; set; } = null!;
        public string DetailDescription { get; set; } = null!;
        public DateTime? ApprovedDate { get; set; }
        public string RecorderEmployee { get; set; } = null!;
        public string ApproverEmployee { get; set; } = null!;
    }


    public class AddDisciplinaryCaseDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public WarningType WarningType { get; set; }
        public string Fault { get; set; } = null!;
        public string DetailDescription { get; set; } = null!;
    }

    public class ApproveDisciplinaryCase
    {
        public Guid Id { get; set; }
        public Guid ApproverId { get; set; }
    }
}
