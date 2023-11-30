using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class DepartmentPostDto
    {
        [Required]
        public string DepartmentName { get; set; } = null!;

        [Required]
        public string AmharicName { get; set; } = null!;
        public string? Remark { get; set; } 
        public string CreatedById { get; set; } = null!;
    }

    public class DepartmentGetDto
    {
        public string? Id { get; set; } = null!;
        public string DepartmentName { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public string? Remark { get; set; }
    }

   
}
