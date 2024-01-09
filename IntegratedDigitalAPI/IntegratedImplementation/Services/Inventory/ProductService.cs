using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    internal class ProductService: IProductService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IGeneralConfigService _generalConfig;

        public ProductService(ApplicationDbContext dbContext, IMapper mapper, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _generalConfig = generalConfig;
        }

        public async Task<ResponseMessage> AddProduct(AddProductDto addProduct)
        {
            var code = await _generalConfig.GenerateCode(GeneralCodeType.PRODUCT);
            Product product = new Product
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addProduct.CreatedById,
                ColumnName= addProduct.ColumnName,
                Description= addProduct.Description,
                DetailCode  = code,
                ExpireDateTime = addProduct.ExpireDateTime != null? addProduct.ExpireDateTime : null,
                IsPurchaseRequest= addProduct.IsPurchaseRequest,
                ItemDetailName= addProduct.ItemDetailName,
                ItemId = Guid.Parse(addProduct.ItemId),
                ManufactureDate= addProduct.ManufactureDate,
                MeasurementUnitId= Guid.Parse(addProduct.MeasurementUnitId),
                Quantiy = addProduct.Quantity,
                RecivingDateTime = addProduct.RecivingDateTime,
                RowName= addProduct.RowName,
                SinglePrice= addProduct.SinglePrice,
                VendorId = Guid.Parse(addProduct.VendorId),
                Rowstatus = RowStatus.ACTIVE,
                Cartoon = addProduct.Cartoon,
                Packet = addProduct.Packet,
                RemainingQuantity = addProduct.Quantity * addProduct.Cartoon * addProduct.Packet,
            };
            if (!String.IsNullOrEmpty(addProduct.PurchaseRequestId))
            {
                product.PurchaseRequestId = Guid.Parse(addProduct.PurchaseRequestId);
            }
            await _dbContext.Products.AddAsync(product);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = product,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> UpdateProduct(UpdateProductDto updateProduct)
        {
            var currentProduct = await _dbContext.Products.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(updateProduct.Id)));
            if (currentProduct == null)
                return new ResponseMessage { Message = "Could Not find Product", Success = false };
            if (currentProduct.Quantiy * currentProduct.Cartoon * currentProduct.Packet != currentProduct.RemainingQuantity)
            {

                return new ResponseMessage
                {
                    Message = "Could Not update item because its already been issued if you want to edit firs issue all the" +
                    "remaining items and then add a new one",
                    Success = false
                };
            }
            currentProduct.ColumnName = updateProduct.ColumnName;
            currentProduct.Description = updateProduct.Description;
            currentProduct.ExpireDateTime = updateProduct.ExpireDateTime != null ? updateProduct.ExpireDateTime : null;
            currentProduct.IsPurchaseRequest = updateProduct.IsPurchaseRequest;
            currentProduct.ItemDetailName = updateProduct.ItemDetailName;
            currentProduct.ManufactureDate = updateProduct.ManufactureDate;
            currentProduct.MeasurementUnitId = Guid.Parse(updateProduct.MeasurementUnitId);
            currentProduct.RecivingDateTime = updateProduct.RecivingDateTime;
            currentProduct.RowName = updateProduct.RowName;
            currentProduct.SinglePrice = updateProduct.SinglePrice;
            currentProduct.VendorId = Guid.Parse(updateProduct.VendorId);
            currentProduct.Quantiy = updateProduct.Quantity;
            currentProduct.Cartoon = updateProduct.Cartoon;
            currentProduct.Packet = updateProduct.Packet;
            currentProduct.RemainingQuantity = updateProduct.Quantity * updateProduct.Cartoon * updateProduct.Packet;

            if (!String.IsNullOrEmpty(updateProduct.PurchaseRequestId))
            {
                currentProduct.PurchaseRequestId = Guid.Parse(updateProduct.PurchaseRequestId);
            }

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = currentProduct,
                Message = "Updated Successfully",
                Success = true
            };
        }


        public async Task<ResponseMessage> AdjustProducts(SaveAdjustmentDto saveAdjustmentDetails)
        {
            foreach(var item in saveAdjustmentDetails.AdjustmentDetails)
            {
                var product =  await _dbContext.Products.Include(x => x.Item.Category).FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(item.Id)));
                if(product != null)
                {
                    AdjustmentHistory adjustmentHistory = new AdjustmentHistory()
                    {
                        Id = Guid.NewGuid(),
                        ProductId = product.Id,
                        CreatedById = saveAdjustmentDetails.CreatedById,
                        CreatedDate = DateTime.UtcNow,
                        From = product.RemainingQuantity,
                        To = item.RemainingQuantity,
                        AdjustmentReason = item.AdjustementReason,
                        Rowstatus = RowStatus.ACTIVE
                    };
                   await _dbContext.AdjustmentHistories.AddAsync(adjustmentHistory);
                   product.RemainingQuantity = item.RemainingQuantity;

                    if (product.Item.Category.CategoryType == CategoryType.ASSET && item.AdjustementReason == AdjustmentReason.MAINTAINABLE)
                    {
                        MaintainableItems maintainableItems = new MaintainableItems()
                        {
                            Id = Guid.NewGuid(),
                            CreatedById = saveAdjustmentDetails.CreatedById,
                            CreatedDate = DateTime.UtcNow,
                            FromStore = true,
                            ProductId = product.Id,
                            Rowstatus = RowStatus.ACTIVE
                        };
                      await  _dbContext.MaintainableItems.AddAsync(maintainableItems);
                    }

                }
               await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage
            {
                Message = "Added Successfully",
                Success = true
            };

        }

        public async Task<List<AdjustmentDetailDto>> GetAdjustmentDetail()
        {
            var items = await _dbContext.Products.AsNoTracking().Include(x => x.MeasurementUnit)
                            .Include(x => x.Vendor).Include(x => x.Item).ThenInclude(x => x.Category).
                            Where(x =>  x.RemainingQuantity > 0 )
                            .ProjectTo<AdjustmentDetailDto>
                            (_mapper.ConfigurationProvider).ToListAsync();
            return items;
        }

        public async Task<UpdateProductDto> GetProductDetail(string productId)
        {
            var items = await _dbContext.Products.AsNoTracking().
                            Where(x => x.Id.Equals(Guid.Parse(productId)))
                            .ProjectTo<UpdateProductDto>
                            (_mapper.ConfigurationProvider).FirstOrDefaultAsync();
           if(items == null)
                return new UpdateProductDto();
            return items;
        }

        public async Task<List<ProductListDto>> GetProductList()
        {
            var items = await _dbContext.Products.AsNoTracking().Include(x => x.MeasurementUnit)
                               .Include(x => x.Vendor).Include(x => x.Item).
                               Where(x => x.RemainingQuantity > 0)
                               .ProjectTo<ProductListDto>
                               (_mapper.ConfigurationProvider).ToListAsync();
            return items;
        }
    }
}
