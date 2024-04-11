using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IProductService
    {
        Task<List<ProductListDto>> GetProductList();
        Task<List<AdjustmentDetailDto>> GetAdjustmentDetail();
        Task<ResponseMessage> AdjustProducts(SaveAdjustmentDto saveAdjustmentDetails);
        Task<ResponseMessage> AddProduct(AddProductDto addProduct);
        Task<ResponseMessage> UpdateProduct(UpdateProductDto updateProduct);
        Task<UpdateProductDto> GetProductDetail(string productId);

        Task<ResponseMessage> AddProductTag(AddProductTagsDto addProductTags);
    }
}
