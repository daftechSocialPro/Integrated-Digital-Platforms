using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class RehireEmployeeDto
    {
        public Guid EmployeeId { get; set; }
        public string CreatedById { get; set; } = null!;
        public DateTime EmploymentDate { get; set; }
        public EmploymentType EmploymentType { get; set; }
        public DateTime ContractEndDate { get; set; }
        public string Remark { get; set; } = null!;
        public Guid DepartmentId { get; set; }
        public Guid PositionId { get; set; }
        public double Salary { get; set; }
        public SALARYSOURCE SourceOfSalary { get; set; }
    }
}
