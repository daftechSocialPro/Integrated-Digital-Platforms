using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class AdjustmentHistory: WithIdModel
    {
        public Guid ProductId { get; set; }
        public virtual Product Product { get; set; } = null!;
        public double From { get; set; }
        public double To { get; set; }
        public AdjustmentReason AdjustmentReason { get; set; }
        public string? Remark { get; set; }

    }
}
