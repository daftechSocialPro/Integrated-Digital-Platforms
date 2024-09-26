using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.Configuration
{
    public class Region :WithIdModel
    {
        public string RegionName { get; set; } = null!;

        public virtual Country Country { get; set; } = null!;
        public Guid CountryId { get; set; }


    }
}
