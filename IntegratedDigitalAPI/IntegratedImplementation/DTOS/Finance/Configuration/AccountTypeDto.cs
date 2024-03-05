using IntegratedInfrustructure.Model.FInance.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{
    public record AccountTypePostDto
    {
        public string Type { get; set; } = null!;
        public string Normal_Balance { get; set; } = null!;
        public string Category { get; set; } = null!;
        public string SubCategory { get; set; } = null!;
        public string Remark { get; set; } = null!;
        public string CreatedById { get; set; } = null!;    


    }

    public record AccountTypeGetDto : AccountTypePostDto
    {
        public Guid Id { get; set; }
    }
}
