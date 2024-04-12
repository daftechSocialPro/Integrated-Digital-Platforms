using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class ProductTagDto
    {

    }


    public class AddProductTagsDto
    {
        public Guid ProductId { get; set; }
        public List<string>? SerialNumber { get; set; } = null!;
        public string CreatedById { get; set; } = null!;
        public int TotalQuantity { get; set; }
    }
}
