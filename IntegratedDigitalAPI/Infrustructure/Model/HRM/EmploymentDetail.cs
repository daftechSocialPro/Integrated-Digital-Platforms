using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmploymentDetail: WithIdModel
    {

        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }

        public virtual Department Department { get; set; } = null!;
        public Guid DepartmentId { get; set; }

        public virtual Position Position { get; set; } = null!;
        public Guid PositionId { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public double Salary { get; set; }

        public EmploymentStatus EmploymentStatus { get; set; }

        public bool IsBlackListed { get; set; }

    }
}
