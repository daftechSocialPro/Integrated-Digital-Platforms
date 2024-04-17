using AutoMapper;
using AutoMapper.QueryableExtensions;
using DocumentFormat.OpenXml.Spreadsheet;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Inventory;
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
using System.Drawing.Imaging;
using System.Drawing;
using ZXing.Mobile;
using ZXing;
using ZXing.Common;
using System.IO;
using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Http.Internal;
using Microsoft.AspNetCore.Http;

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
                EmployeeId = addProduct.EmployeeId,
                SourceOfProduct = addProduct.SourceOfProduct,
            };
            if (!String.IsNullOrEmpty(addProduct.PurchaseRequestId))
            {
                product.PurchaseRequestId = Guid.Parse(addProduct.PurchaseRequestId);
            }
            if (!String.IsNullOrEmpty(addProduct.ProjectId))
            {
                product.ProjectId = Guid.Parse(addProduct.ProjectId);
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
            currentProduct.EmployeeId = updateProduct.EmployeeId;
            currentProduct.SourceOfProduct = updateProduct.SourceOfProduct;

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

        public async Task<ResponseMessage> AddProductTag(AddProductTagsDto addProductTags)
        {
           

            for(int i = 0; i< addProductTags.TotalQuantity; i++)
            {
                var Id = Guid.NewGuid();
                var tagNumber = _generalConfig.GenerateCode(GeneralCodeType.TAGNUMBER).Result;
                var barcodeContent = tagNumber;
                var path = Path.Combine("wwwroot", $"Products/{barcodeContent}");

                var barCodePath = _generalConfig.GenerateBarcodeAsFormFileAsync(path, barcodeContent);

                
                ProductTag product = new ProductTag()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = addProductTags.CreatedById,
                    CreatedDate = DateTime.Now,
                    ProductId = addProductTags.ProductId,
                    ProductStatus = ProductStatus.GOODCONDITION,
                    TagNumber = tagNumber,
                    BarCodePath = barCodePath,
                    Printed = false,
                    Rowstatus = RowStatus.ACTIVE,
                };

                if (addProductTags.SerialNumber != null)
                {
                    product.SerialNumber = addProductTags.SerialNumber[i];
                }

                await _dbContext.ProductTags.AddAsync(product);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage { Success = true, Message = "Added succesfully" };
        }

        public async Task<List<TagNumberListDto>> GetTagNumberLists()
        {
            var currentTags = await _dbContext.ProductTags.Where(X => !X.Printed).Include(x => x.Product.Item)
                                    .AsNoTracking().Select(x => new TagNumberListDto
                                    {
                                        Id = x.Id,
                                        BarCodePath = x.BarCodePath,
                                        ItemName = x.Product.Item.Name,
                                        ProductDetailName = x.Product.ItemDetailName,
                                        SerialNumber = x.SerialNumber,
                                        TagNumber = x.TagNumber
                                    }) .ToListAsync();

            return currentTags;
        }

        public async Task<ResponseMessage> PrintTagNumbers(List<Guid> tagNumberId)
        {
            foreach(var item in tagNumberId)
            {
                var currentId = await _dbContext.ProductTags.FirstOrDefaultAsync(x => x.Id == item);

                if(currentId != null) 
                {
                    currentId.Printed = true;
                }
            }

            return new ResponseMessage { Success = true, Message = "PrintedSuccesfully" };
        }
    }
}
