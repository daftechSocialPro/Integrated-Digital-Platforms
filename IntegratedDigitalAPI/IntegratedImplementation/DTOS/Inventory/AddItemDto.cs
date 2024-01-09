using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class AddItemDto
    {
        public string? CreatedById { get; set; }
        public string Name { get; set; } = null!;
        public string CategoryId { get; set; } = null!;
        public int StateType { get; set; }
        public int MeasurementType { get; set; }
        public bool IsExpirable { get; set; }
        public int ReorderPoint { get; set; }
        public string? Remark { get; set; }
    }

    public class UpdateItemDto : AddItemDto
    {
        public string Id { get; set; } = null!;
    }

    public class ItemListDto
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string CategoryName { get; set; } = null!;
        public string StateType { get; set; } = null!;
        public string MeasurementType { get; set; } = null!;
        public bool IsExpirable { get; set; }
        public int ReorderPoint { get; set; }
        public string Remark { get; set; } = null!;
    }


    public class ItemDropDownDto
    {
        public Guid Id { get; set; } 
        public string Name { get; set; } = null!;
        public int MeasurementType { get; set; }
        public bool isExpirable { get; set; }
    }



}
