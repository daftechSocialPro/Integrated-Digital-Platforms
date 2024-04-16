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
    public class ProductController : ControllerBase
    {
        IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ProductListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProductList()
        {
            return Ok(await _productService.GetProductList());
        }

        [HttpGet]
        [ProducesResponseType(typeof(ProductListDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetTagNumberLists()
        {
            return Ok(await _productService.GetTagNumberLists());
        }

        [HttpGet]
        [ProducesResponseType(typeof(AdjustmentDetailDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetAdjustmentDetail()
        {
            return Ok(await _productService.GetAdjustmentDetail());
        }

        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProduct(AddProductDto productDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _productService.AddProduct(productDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProductTag(AddProductTagsDto productDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _productService.AddProductTag(productDto));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> PrintTagNumbers(List<Guid> tagNumberId)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _productService.PrintTagNumbers(tagNumberId));
            }
            else
            {
                return BadRequest();
            }
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateProduct(UpdateProductDto productDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _productService.UpdateProduct(productDto));
            }
            else
            {
                return BadRequest();
            }
        }


        [HttpGet]
        [ProducesResponseType(typeof(UpdateProductDto), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetProductDetail(string productId)
        {
            return Ok(await _productService.GetProductDetail(productId));
        }

        [HttpPut]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AdjustProducts(SaveAdjustmentDto adjustmentDto)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _productService.AdjustProducts(adjustmentDto));
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
