using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public class CompanyProfileGetDto
    {
        public Guid Id { get; set; }
        public string CompanyName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;
        public string Logo { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;

        public string Description { get; set; } = null!;

    }

    public class CompanyProfilePostDto
    {
        public Guid ? Id { get; set; }
        public string Description { get; set; } = null!;
        public string CompanyName { get; set; } = null!;
        public string PhoneNumber { get; set; } = null!;      
        public IFormFile? ImagePath { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Address { get; set; } = null!;
        public string CreatedById { get; set; } = null!;

    }
}
