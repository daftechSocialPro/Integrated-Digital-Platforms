using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class AddMeasurementUnitDto
    {
        public string? Id { get; set; } 
        public int MeasurementType { get; set; }
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public double ToSIUnit { get; set; }
    }

    public class MeasurementListDto
    {
        public string Id { get; set; } = null!;
        public string MeasurementType { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string AmharicName { get; set; } = null!;
        public double ToSIUnit { get; set; }
    }
}
