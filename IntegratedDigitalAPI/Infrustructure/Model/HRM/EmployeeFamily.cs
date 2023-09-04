using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeFamily:WithIdModel
    {
        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public string FullName { get; set; } = null!;
        public Gender Gender { get; set; }
        public FamilyRelation FamilyRelation { get; set; }
        public DateTime BirthDate { get; set; }
        public string? Remark { get; set; }

    }
}
