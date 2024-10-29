using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System.ComponentModel.DataAnnotations.Schema;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmploymentDetail : WithIdModel
    {
        public EmploymentDetail()
        {
            EmployeeSalaries = new HashSet<EmployeeSalary>();
        }

        public virtual EmployeeList Employee { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public virtual Department Department { get; set; } = null!;
        public Guid DepartmentId { get; set; }
        public virtual Position Position { get; set; } = null!;
        public Guid PositionId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public double Salary { get; set; }

        public SALARYSOURCE SourceOfSalary { get; set; }
        public EmploymentStatus EmploymentStatus { get; set; }
        public bool IsBlackListed { get; set; }
        public bool HasSeverance { get; set; }
        public double TotalSeveranceAmount { get; set; }
        public string? Remark { get; set; }

        public Guid ZoneId { get; set; }
        public virtual Zone Zone { get; set; } = null!;
        public string Woreda { get; set; } = null!;

        [InverseProperty(nameof(EmployeeSalary.EmploymentDetail))]
        public ICollection<EmployeeSalary> EmployeeSalaries { get; set; }
    }



}
