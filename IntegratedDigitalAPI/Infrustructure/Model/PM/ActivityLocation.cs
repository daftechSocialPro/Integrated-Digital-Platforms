using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Configuration;
using IntegratedInfrustructure.Models.PM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.PM
{
    public class ActivityLocation  :  WithIdModel
    {

        public Guid ActivityId { get; set; }
        public virtual Activity Activity { get; set; }
        public Guid RegionId { get; set; }
        public virtual Region Region { get; set; }
        public string? Zone { get; set; } 
        public string? Woreda { get; set; } 
        public double Latitude { get; set; }
        public double Longtude { get; set; }


    }
}
