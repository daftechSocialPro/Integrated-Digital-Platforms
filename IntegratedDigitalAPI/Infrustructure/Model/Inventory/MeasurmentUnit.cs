using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Inventory
{
    public class MeasurmentUnit: WithIdModel
    {
        public MeasurementType MeasurementType { get; set; }
        public string Name { get; set; } = null!;
        public string? AmharicName { get; set; } 
        public double ToSIUnit { get; set; }
    }
}
