using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    public class CategoryService: ICategoryService
    {
        private readonly ApplicationDbContext _dbContext;

        public CategoryService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddCategories(AddCategoryDto addCategory)
        {
            var currentCat = await _dbContext.Categories.AnyAsync(x => x.Name == addCategory.Name);

            if (currentCat)
                return new ResponseMessage { Success = true, Message = "Name already Exists" };

            Category categories = new Category
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addCategory.CreatedById,
                CategoryType = (CategoryType)addCategory.CategoryType,
                Name = addCategory.Name,
                Description= addCategory.Description,
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.Categories.AddAsync(categories);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = categories,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<CategoryListDto>> GetCategories()
        {
            var categoryList = await _dbContext.Categories.AsNoTracking().Select(x => new CategoryListDto
            {
                Id = x.Id.ToString(),
                Name = x.Name,
                Description = x.Description,
                CategoryType= x.CategoryType.ToString(),
                RowStatus=x.Rowstatus.ToString(),
            }).ToListAsync();

            return categoryList;
        }

        public async Task<ResponseMessage> UpdateCategories(AddCategoryDto updateCategory)
        {
            if (string.IsNullOrEmpty(updateCategory.Id))
                return new ResponseMessage { Success = false, Message = "Could not find Category" };

            var currentCategory = await _dbContext.Categories.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(updateCategory.Id)));
            if (currentCategory != null)
            {
                var currentCat = await _dbContext.Categories.AnyAsync(x => x.Name == updateCategory.Name && x.Id != currentCategory.Id);

                if (currentCat)
                    return new ResponseMessage { Success = true, Message = "Name already Exists" };


                currentCategory.Name = updateCategory.Name;
                currentCategory.CategoryType = (CategoryType)updateCategory.CategoryType;
                currentCategory.Description = updateCategory.Description;
                currentCategory.Rowstatus = updateCategory.RowStatus;

               await _dbContext.SaveChangesAsync();

                return new ResponseMessage { Data=currentCategory, Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Category" };
        }
    }
}
