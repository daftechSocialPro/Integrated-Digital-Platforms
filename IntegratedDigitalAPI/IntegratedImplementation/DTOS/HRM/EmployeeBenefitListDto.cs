using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmployeeBenefitListDto
    {
        public Guid Id { get; set; }
        public string BenefitName { get; set; } = null!;
        public string TypeofBenefit { get; set; } = null!;
        public double Amount { get; set; }
        public bool Recursive { get; set; }
        public DateTime? AllowanceEndDate { get; set; }
        public bool Taxable { get; set; }
    }

    public class AddEmployeeBenefitDto
    {
        public string CreatedById { get; set; } = null!;
        public Guid EmployeeId { get; set; }
        public Guid BenefitListId { get; set; }
        public TypeOfBenefit TypeOfBenefit { get; set; }
        public double Ammount { get; set; }
        public bool Recursive { get; set; }
        public DateTime? AllowanceEndDate { get; set; }
    }
}
