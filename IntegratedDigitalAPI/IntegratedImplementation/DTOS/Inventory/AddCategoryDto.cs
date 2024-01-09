using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.DTOS.Inventory
{
    public class AddCategoryDto
    {
        public string? Id { get; set; } = null!;
        public string? CreatedById { get; set; } = null!;
        public string Name { get; set; } = null!;
        public int CategoryType { get; set; }
        public string? Description { get; set; } = null!;
        public RowStatus RowStatus { get; set; }
    }

    public class CategoryListDto
    {
        public string Id { get; set; } = null!;
        public string Name { get; set; } = null!;
        public string CategoryType { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string RowStatus { get; set; } = null!;
    }

}
