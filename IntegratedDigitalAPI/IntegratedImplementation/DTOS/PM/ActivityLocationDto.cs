using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.PM
{
    public record ActivityLocationDto
    {
        public Guid RegionId { get; set; }

        public string RegionName { get; set; }

        public string ? Zone { get; set; }

        public string ? Woreda { get; set; }

        public double? Latitude { get; set; }
        public double? Longtude { get; set; }



    }
}
