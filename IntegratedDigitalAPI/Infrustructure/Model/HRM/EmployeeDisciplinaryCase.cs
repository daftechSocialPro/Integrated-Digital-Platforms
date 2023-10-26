using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeDisciplinaryCase : WithIdModel
    {
        public Guid EmployeeId { get; set; }
        public EmployeeList Employee { get; set; } = null!;
        public Guid? ApprovedById { get; set; }
        public DateTime Date { get; set; }
        public DateTime? ApprovedDate { get; set; }
        public EmployeeList ApprovedBy { get; set; } = null!;
        public WarningType WarningType { get; set; }
        public string Fault { get; set; } = null!;
        public string DetailDescription { get; set; } = null!;

    }
}
