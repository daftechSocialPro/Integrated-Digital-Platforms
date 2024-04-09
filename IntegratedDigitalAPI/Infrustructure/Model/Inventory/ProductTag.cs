using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Models.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedInfrustructure.Model.Inventory
{
    public class ProductTag: WithIdModel
    {
        public Guid ProductId { get;set; }
        public virtual Product Product { get; set; } = null!;
        public string TagNumber { get; set; } = null!;
        public string SerialNumber { get; set; } = null!;

        public ProductStatus ProductStatus { get; set; }

    }
}
