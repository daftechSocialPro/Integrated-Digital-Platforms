using Azure;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IItemService
    {
        Task<List<ItemListDto>> GetItemList();
        Task<ResponseMessage> AddItem(AddItemDto addItem);
        Task<ResponseMessage> UpdateItem(UpdateItemDto updateItem);
    }
}
