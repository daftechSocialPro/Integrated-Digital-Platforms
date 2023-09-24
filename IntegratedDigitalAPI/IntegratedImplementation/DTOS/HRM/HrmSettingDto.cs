using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.HRM
{
    public record HrmSettingDto
    {

        public Guid Id { get; set; }
        public string GeneralSetting { get; set; } = null!;
        public double value { get; set; }

       
    }
    public record HrmSettingPostDto
    {

        public string GeneralSetting { get; set; } = null!;
        public double value { get; set; }

        public string CreatedById { get; set; } = null!;
    }
}
