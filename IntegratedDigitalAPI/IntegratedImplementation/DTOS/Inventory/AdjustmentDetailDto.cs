using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class AdjustmentDetailDto
    {
        public string Id { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public string ItemDetailName { get; set; } = null!;
        public double RemainingQuantity { get; set; }
        public string MeasurementUnit { get; set; } = null!;
    }

    public class SaveAdjustmentDto
    {
        public string CreatedById { get; set; } = null!;
        public List<SaveAdjustmentDetailDto> AdjustmentDetails { get; set; } = null!;
    }

    public class SaveAdjustmentDetailDto
    {
        public string Id { get; set; } = null!;
        public double RemainingQuantity { get; set; }
        public AdjustmentReason AdjustementReason { get; set; }
    }
}
