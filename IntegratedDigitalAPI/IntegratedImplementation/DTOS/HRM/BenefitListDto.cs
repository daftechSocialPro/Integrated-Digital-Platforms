using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public class BenefitListDto
    {
        public Guid Id { get; set; } 
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public bool Taxable { get; set; }
        public bool AddOnContract { get; set; }
    }

    public class AddBenefitListDto
    {
        public string CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public bool Taxable { get; set; }
        public bool AddOnContract { get; set; }
    }

    public class UpdateBenefitListDto : AddBenefitListDto
    {
        public Guid Id { get; set; }
    }

}
