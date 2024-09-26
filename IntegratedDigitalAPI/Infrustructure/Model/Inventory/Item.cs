using IntegratedInfrustructure.Model.Authentication;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class Item : WithIdModel
    {
        public string ItemCode { get; set; } = null!;
        public string Name { get; set; } = null!;
        public Guid CategoryId { get; set; }
        public virtual Category Category { get; set; } = null!;
        public StateType StateType { get; set; }
        public MeasurementType MeasurementType { get; set; }
        public bool IsExpirable { get; set; }
        public int ReorderPoint { get; set; }
        public string? Remark { get; set; } 
    }
}
