using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace IntegratedDigitalAPI.Controllers.Inventory
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ItemsController : ControllerBase
    {
        IItemService _itemService;

        public ItemsController(IItemService itemService)
        {
            _itemService = itemService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ItemListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetItemList()
        {
           return Ok(await _itemService.GetItemList());
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddItem(AddItemDto item)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _itemService.AddItem(item));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateItem(UpdateItemDto item)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _itemService.UpdateItem(item));
            }
            else
            {
                return BadRequest();
            }
        }

    }
}
