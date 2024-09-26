using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Vacancy
{
    public class Applicant
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string? CreatedById { get; set; }
        public string FirstName { get; set; } = null!;
        public string MiddleName { get; set; } = null!;
        public string LastName { get; set; } = null!;
        public string? Photo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public Gender Gender { get; set; }
        public Guid NationalityId { get; set; }
        public virtual Country Nationality { get; set; } = null!;
        public DateTime BirthDate { get; set; }
        public string Woreda { get; set; } = null!;
        public virtual Zone Zone { get; set; } = null!;
        public Guid ZoneId { get; set; }
        public ApplicantType ApplicantType { get; set; }
        public string? EmployeeCode { get; set; }
    }
}
