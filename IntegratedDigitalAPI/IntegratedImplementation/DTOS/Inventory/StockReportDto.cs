using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class StockReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string BranchId { get; set; } = null!;
    }



    public class BalanceTempData
    {
        public Guid ItemId { get; set; }
        public string CategoryType { get; set; } = null!;
        public string CategoryName { get; set; } = null!;
        public string ItemName { get; set; } = null!;
        public string MeasurementUnit { get; set; } = null!;
        public double Quantity { get; set; }
    }

}
