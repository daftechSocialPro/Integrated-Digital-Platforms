using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.HRM
{
    public record class VolunterPostDto
    {

        public Guid Id { get; set; }
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
        public Guid ZoneId { get; set; }
        public string Woreda { get; set; } = null!;
        public string Gender { get; set; }
        public DateTime BirthDate { get; set; }
        public string MaritalStatus { get; set; }
        public IFormFile? ImagePath { get; set; } = null!;
        public string PaymentType { get; set; }
        public DateTime EmploymentDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public DateTime? TerminatedDate { get; set; }
        public double Salary { get; set; }
        public string? SourceOfSalary { get; set; }
        public string? BankAccountNo { get; set; } = null!;
        public string CreatedById { get; set; } 
    }

    public class VolunterGetDto
    {
        public Guid Id { get; set; }
     
        public string EmployeeName { get; set; } = null!;
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Email { get; set; } = null!;
 
        public string Nationality { get; set; } = null!;
        public string NationalityId { get; set; } = null!;
        public Guid CountryId { get; set; }
        public string RegionName { get; set; } = null!;
        public Guid RegionId { get; set; }
        public string ZoneName { get; set; } = null!;
        public Guid ZoneId { get; set; }
        public string Woreda { get; set; } = null!;
        public string Gender { get; set; } = null!;
        public string BirthDate { get; set; } = null!;
        public string MaritalStatus { get; set; } = null!;
        public string? ImagePath { get; set; } = null!;
      
        public string PaymentType { get; set; } = null!;
        public DateTime EmploymentDate { get; set; }
        public DateTime? ContractEndDate { get; set; }
        public DateTime? TerminatedDate { get; set; }
        public bool IsPension { get; set; }
        public string EmploymentStatus { get; set; } = null!;
        public double? Salary { get; set; } = null!;
        public string? SourceOfSalary { get; set; } = null!;
        public string? BankAccountNo { get; set; } = null!;
  
    }

}
