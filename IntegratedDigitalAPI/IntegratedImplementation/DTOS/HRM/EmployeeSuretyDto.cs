using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class EmployeeSuretyPostDto
    {
        public Guid? Id { get; set; }
        public IFormFile? Photo { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string SuretyAddress { get; set; } = null!;
        public IFormFile? Letter { get; set; } = null!;
        public IFormFile? IdCard { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string CompnayPhoneNumber { get; set; } = null!;
       public Guid EmployeeId { get; set; }
        public string ? CreatedById { get; set; }
    }

    public class EmployeeSuertyGetDto
    {
        public Guid Id { get; set; }
        public string PhotoPath { get; set; } = null!;
        public string FullName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string SuretyAddress { get; set; } = null!;
        public string LetterPath { get; set; } = null!;
        public string IdCardPath { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string CompnayPhoneNumber { get; set; } = null!;
    }
}
