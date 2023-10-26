using IntegratedInfrustructure.Model.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class DisciplinaryDto
    {
        public Guid Id { get; set; }
        public string EmployeeName { get; set; } = null!;
        public string ApproverEmployee { get; set; } = null!;
        public DateTime Date { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public string WarningType { get; set; } = null!;
        public string Fault { get; set; } = null!;
        public string DetailDescription { get; set; } = null!;
    }

    public class AddDisciplinaryDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public DateTime Date { get; set; }
        public WarningType WarningType { get; set; }
        public string Fault { get; set; } = null!;
        public string DetailDescription { get; set; } = null!;
    }

    public class ApproveDisciplinary
    {
        public Guid ApproverId { get; set; }
    }

}
