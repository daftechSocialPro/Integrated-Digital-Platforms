using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    public class ItemService: IItemService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;
        public ItemService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IMapper mapper) 
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddItem(AddItemDto addItem)
        {
            var itemExist = await _dbContext.Items.AnyAsync(x => x.Name == addItem.Name);
            if (itemExist)
                return new ResponseMessage { Success = false, Message = "Name already Exists" };

            var code = await _generalConfig.GenerateCode(GeneralCodeType.ITEM);
            Item items = new Item
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addItem.CreatedById,
                Name = addItem.Name,
                CategoryId = Guid.Parse(addItem.CategoryId),
                IsExpirable= addItem.IsExpirable,
                ItemCode = code,
                MeasurementType = (MeasurementType)addItem.MeasurementType, 
                Remark= addItem.Remark,
                ReorderPoint = addItem.ReorderPoint,
                StateType = (StateType)addItem.StateType,
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.Items.AddAsync(items);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = items,
                Message = "Added Successfully",
                Success = true
            };
        }

        

        public async Task<List<ItemListDto>> GetItemList()
        {
            var items = await _dbContext.Items.AsNoTracking().Include(x => x.Category).ProjectTo<ItemListDto>(_mapper.ConfigurationProvider).ToListAsync();
            return items;
        }

        public async Task<ResponseMessage> UpdateItem(UpdateItemDto updateItem)
        {
            var currentItem = await _dbContext.Items.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(updateItem.Id)));
            if (currentItem != null)
            {
                var itemExist = await _dbContext.Items.AnyAsync(x => x.Name == updateItem.Name && x.Id != currentItem.Id);
                if (itemExist)
                    return new ResponseMessage { Success = false, Message = "Name already Exists" };

                currentItem.Name = updateItem.Name;
                currentItem.CategoryId = Guid.Parse(updateItem.CategoryId);
                currentItem.IsExpirable = updateItem.IsExpirable;
                currentItem.MeasurementType = (MeasurementType)updateItem.MeasurementType;
                currentItem.Remark = updateItem.Remark;
                currentItem.ReorderPoint = updateItem.ReorderPoint;
                currentItem.StateType = (StateType)updateItem.StateType;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentItem, Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Item" };
        }
    }
}
