using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Finance.Configuration
{

    public class GeneralPayrollSettingListDto
    {
        public string Id { get; set; } = null!;
        public string GeneralPSetting { get; set; } = null!;
        public double Value { get; set; }
    }

    public class GeneralPayrollSettingDto
    {
        public string CreatedById { get; set; } = null!;
        //public GeneralPSett GeneralPSetting { get; set; }
        public string GeneralPSetting { get; set; }
        public double Value { get; set; }
    }
}
