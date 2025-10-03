using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class GetEmployeeGuaranteeDto
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = null!;
        public string AmharicFullName { get; set; } = null!;
        public string OrganizationName { get; set; } = null!;
        public string AmharicOrganizationName { get; set; } = null!;
        public string LetterNumber { get; set; } = null!;
        public DateTime LetterDate { get; set; }
        public string AmharicDate { get; set; } = null!;
        public string LetterPath { get; set; } = null!;
        public bool IsReturned { get; set; }
        public string TodaysDate { get; set; } = null!;
        public double? CurrentSalary { get; set; }
    }

    public class AddEmployeeGuaranteeDto
    {
        public Guid EmployeeId { get; set; }
        public string CreatedById { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string AmharicFullName { get; set; } = null!;
        public string OrganizationName { get; set; } = null!;
        public string AmharicOrganizationName { get; set; } = null!;
        public string LetterNumber { get; set; } = null!;
        public DateTime LetterDate { get; set; }
        public IFormFile? Letter { get; set; } = null!;
    }

    public class UpdateEmployeeGuaranteeDto : AddEmployeeGuaranteeDto
    {
        [Required]
        public Guid Id { get; set; }
    }


}
