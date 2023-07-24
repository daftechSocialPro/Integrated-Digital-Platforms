using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.HRM
{
    public class EmployeeList : WithIdModel
    {
        public string EmployeeCode { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string AmharicFirstName { get; set; } = null!;
        public string AmharicMiddleName { get; set; } = null!;
        public string AmharicLastName { get; set; } = null!;
        public Gender Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public MaritalStatus MaritalStatus { get; set; }
        public string? ImagePath { get; set; } = null!;
        public EmploymentType EmploymentType { get; set; }
        public PaymentType PaymentType { get; set; }
        public DateTime EmploymentDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public DateTime? TerminatedDate { get; set; }
        public bool IsPension { get; set; }
        public EmploymentStatus EmploymentStatus { get; set; }
        public string? PensionCode { get; set; } = null!;
        public string? TinNumber { get; set; } = null!;
        public string? BankAccountNo { get; set; } = null!;
    }
}
