using IntegratedInfrustructure.Model.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Models.Inventory
{
    public class Category: WithIdModel
    {
        public string Name { get; set; } = null!;
        public CategoryType CategoryType { get; set; }
        public string? Description { get; set; }
    }
}
