using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface ICategoryService
    {
        public Task<List<CategoryListDto>> GetCategories();
        public Task<ResponseMessage> UpdateCategories(AddCategoryDto updateCategory);
        public Task<ResponseMessage> AddCategories(AddCategoryDto addCategory);
    }
}
