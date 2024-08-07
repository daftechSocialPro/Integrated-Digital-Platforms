﻿using DocumentFormat.OpenXml.Drawing;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    public class StoreReceivalService: IStoreReceivalService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IProductService _productService;

        public StoreReceivalService(ApplicationDbContext dbContext, IProductService productService)
        {
            _dbContext = dbContext;
            _productService = productService;
        }

       
        public async Task<List<ApprovedItemsDto>> GetEmployeesApprovedItems(string EmployeeId)
        {

            var itemRequests = await (from x in _dbContext.ItemReceivals.Include(x => x.StoreRequestList.Item)
                                      .Include(x => x.StoreRequestList.MeasurementUnit.Name)
                                      .Include(x => x.StoreRequestList.ApproverEmployee)
                                      .Include(x => x.StoreRequestList.StoreRequest)
                                      where x.StoreRequestList.StoreRequest.RequesterEmployeeId.Equals(Guid.Parse(EmployeeId)) &&
                                      x.ReceivedStatus == ItemReceivedStatus.RECIVED 
                                      select new ApprovedItemsDto
                                      {
                                          Id = x.Id.ToString(),
                                          ItemName = x.StoreRequestList.Item.Name,
                                          MeasurementUnit = x.StoreRequestList.MeasurementUnit.Name,
                                          ApprovedQuantity = x.TotalItems,
                                          ApproverEmployee = x.StoreRequestList.ApproverEmployee != null ? $"{x.StoreRequestList.ApproverEmployee.FirstName} {x.StoreRequestList.ApproverEmployee.MiddleName} {x.StoreRequestList.ApproverEmployee.LastName}" : ""
                                      }).ToListAsync();
            return itemRequests;
        }

        public async Task<List<StoreReceivalListDto>> GetStoreApprovedItems()
        {
           
            var itemRequests = await (from x in _dbContext.StoreRequestLists
                                      where x.ApprovalStatus == ApprovalStatus.APPROVED && x.IsFinalApproved && !x.IsIssued
                                      select new StoreReceivalListDto
                                      {
                                          Id = x.Id.ToString(),
                                          ItemName = x.Item.Name,
                                          MeasurementUnitName = x.MeasurementUnit.Name,
                                          RequestNumber = x.RequestNumber,
                                          ApprovedQuantity = (double)x.Quantity,
                                          ApproverEmployee = x.ApproverEmployeeId != Guid.Empty ? $"{x.ApproverEmployee.FirstName} {x.ApproverEmployee.MiddleName} {x.ApproverEmployee.LastName}" : "",
                                          RequesterEmployee = $"{x.StoreRequest.RequesterEmployee.FirstName} {x.StoreRequest.RequesterEmployee.MiddleName} {x.StoreRequest.RequesterEmployee.LastName}"
                                      }).ToListAsync();

            return itemRequests;
        }

  

        public async Task<ResponseMessage> IssueStoreApprovedItems(StoreRequestIssueDto storeRequest)
        {
            List<StoreRecivalListDto> productItem = new List<StoreRecivalListDto>();

            double totalitems = 0;
            double remainingitemsstore = 0;
            double remainingitemsproduct = 0;
            double totalPrice = 0;
            int avgcounter = 0;
            var CurrentItem = await _dbContext.StoreRequestLists.Include(x => x.MeasurementUnit).FirstOrDefaultAsync(P => P.Id.Equals(Guid.Parse(storeRequest.Id)));
            if (CurrentItem != null)
            {
                var product = await (from x in _dbContext.Products.Include(x => x.MeasurementUnit)
                                     where x.ItemId.Equals(CurrentItem.ItemId) 
                                     && x.RemainingQuantity != 0 select x).OrderBy(x => x.CreatedDate).ToListAsync();
                if (!product.Any() || product.Sum(x => x.RemainingQuantity) < CurrentItem.Quantity)
                {
                    return new ResponseMessage { Message = "There is no sufficent stock in Store", Success = false };
                }
                
                remainingitemsstore = Convert.ToDouble(CurrentItem.Quantity);

                remainingitemsstore = remainingitemsstore * CurrentItem.MeasurementUnit.ToSIUnit;

                foreach (var item in product)
                {
                    if (remainingitemsstore == 0)
                        break;
                    remainingitemsstore = remainingitemsstore / item.MeasurementUnit.ToSIUnit;

                    StoreRecivalListDto storeRecivalList = new StoreRecivalListDto
                    {
                        ProductId = item.Id,
                        MeasurementId = item.MeasurementUnitId,
                        Price = item.SinglePrice,
                        Quantity = storeRequest.Quantity,
                    };

                    productItem.Add(storeRecivalList);

                    if (item.RemainingQuantity <= remainingitemsstore)
                    {
                        remainingitemsstore = remainingitemsstore - item.RemainingQuantity;
                        totalitems = totalitems + item.RemainingQuantity;
                        item.RemainingQuantity = 0;
                        await _dbContext.SaveChangesAsync();
                    }

                    else if (item.RemainingQuantity > remainingitemsstore)
                    {
                        remainingitemsproduct = item.RemainingQuantity - remainingitemsstore;
                        totalitems = totalitems + remainingitemsstore;
                        remainingitemsstore = 0;
                        item.RemainingQuantity = Convert.ToUInt32(remainingitemsproduct);
                       await _dbContext.SaveChangesAsync();
                    }

                    avgcounter += 1;
                    totalPrice = totalPrice + item.SinglePrice;
                }
                totalPrice = (totalPrice / avgcounter) * (totalitems);

                ItemReceival isu = new ItemReceival
                {
                    Id = Guid.NewGuid(),
                    CreatedById = storeRequest.UserId,
                    CreatedDate = DateTime.Now,
                    ReceivedStatus = ItemReceivedStatus.RECIVED,
                    Rowstatus = RowStatus.ACTIVE,
                    StoreRequestListId = CurrentItem.Id,
                    TotalCost = totalPrice,
                    TotalItems = (double)CurrentItem.Quantity

                };
                await _dbContext.ItemReceivals.AddAsync(isu);
                await _dbContext.SaveChangesAsync();


                foreach(var reciverDetail in productItem)
                {
                    ItemReceivalDetail itemReceivalDetail = new ItemReceivalDetail
                    {
                        Id = Guid.NewGuid(),
                        CreatedById = storeRequest.UserId,
                        CreatedDate = DateTime.Now,
                        ItemReceivalId = isu.Id,
                        MeasurementUnitId = reciverDetail.MeasurementId,
                        ProductId = reciverDetail.ProductId,
                        Quantity = reciverDetail.Quantity,
                        Rowstatus = RowStatus.ACTIVE,
                        UnitPrice = reciverDetail.Price,
                        IssuedDate = DateTime.Now
                    };
                    await _dbContext.ItemReceivalDetails.AddAsync(itemReceivalDetail);
                    await _dbContext.SaveChangesAsync();

                    int totalQuantity = Convert.ToInt32(reciverDetail.Quantity);

                    var currentTags  = await _dbContext.ProductTags.Where(x => x.ProductId == reciverDetail.ProductId && (x.ProductStatus == ProductStatus.GOODCONDITION || x.ProductStatus == ProductStatus.fIXED || x.ProductStatus == ProductStatus.RETURNED)).OrderBy(x => x.TagNumber).Take(totalQuantity).ToListAsync();
                    foreach(var tag in currentTags)
                    {
                        ItemRecivalTags recivalTags = new ItemRecivalTags()
                        {
                            Id = Guid.NewGuid(),
                            CreatedById = storeRequest.UserId,
                            CreatedDate = DateTime.Now,
                            ItemReceivalDetailId = itemReceivalDetail.Id,
                            ProductTagId = tag.Id,
                            Rowstatus = RowStatus.ACTIVE,
                            UsedItemStatus = UsedItemsStatus.GIVEN,
                            ReturnApproved = false
                        };
                        tag.ProductStatus = ProductStatus.GIVEN;
                        await _dbContext.ItemRecivalTags.AddAsync(recivalTags);
                        await _dbContext.SaveChangesAsync();
                    }
                }
                CurrentItem.IsIssued = true;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Success Giving Item", Success = true };
            }
            return new ResponseMessage { Message = "Item Could Not be found", Success = false };
        }

  

        public async Task<ResponseMessage> ReciveApprovedItems(ReceiveItems receiveItems)
        {
            var issuedItems = await _dbContext.ItemReceivals.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(receiveItems.ItemRecivalId)));
            if(issuedItems != null)
            {
                issuedItems.ReceiverEmployeeId = Guid.Parse(receiveItems.EmployeeId);
                issuedItems.ReceivedStatus = ItemReceivedStatus.RECIVED;
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage { Success = true, Message = "Success" };
        }

        public async Task<List<EmployeeReceivedITemsDto>> GetEmployeeReceivedItems(string EmployeeId)
        {
            var itemRequests = await (from x in _dbContext.ItemReceivals.Include(x => x.StoreRequestList.Item)
                                      .Include(x => x.StoreRequestList.MeasurementUnit)
                                      .Include(x => x.StoreRequestList.ApproverEmployee)
                                      .Include(x => x.StoreRequestList.StoreRequest)
                                      where x.StoreRequestList.StoreRequest.RequesterEmployeeId.Equals(Guid.Parse(EmployeeId)) &&
                                      x.ReceivedStatus == ItemReceivedStatus.RECIVED
                                      select new EmployeeReceivedITemsDto
                                      {
                                          Id = x.Id.ToString(),
                                          ItemName = x.StoreRequestList.Item.Name,
                                          MeasurementUnit = x.StoreRequestList.MeasurementUnit.Name,
                                          IssuedQuantity = x.TotalItems,
                                      }).ToListAsync();

            foreach (var items in itemRequests)
            {

                items.EmployeeRecivedProducts = await _dbContext.ItemRecivalTags.Where(x => x.ItemReceivalDetail.ItemReceivalId == Guid.Parse(items.Id)).Include(x => x.ProductTag.Product)
                        .Select(x => new EmployeeRecivedProductsDto
                        {
                            Id = x.Id.ToString(),
                            ProductDetailName = x.ProductTag.Product.ItemDetailName,
                            SerialNumber = x.ProductTag.SerialNumber,
                            TagNumber = x.ProductTag.TagNumber,
                            Status = x.UsedItemStatus.ToString(),
                        }).ToListAsync();
            }

            return itemRequests;
        }

        public async Task<ResponseMessage> AdjustReceivedItems(AdjustReceivedITemsDto receivedITemsDto)
        {
            var CurrentItem = await _dbContext.ItemRecivalTags.Include(x => x.ProductTag.Product.Item.Category).FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(receivedITemsDto.Id)));
            if (CurrentItem == null)
                return new ResponseMessage { Success = false, Message = "Item Not Found" };


            var currentTag = await _dbContext.ProductTags.FirstOrDefaultAsync(x => x.Id == CurrentItem.ProductTagId);
            if (currentTag == null)
                return new ResponseMessage { Success = false, Message = "Item Not Found" };

          

            if (receivedITemsDto.UsedItemStatus == UsedItemsStatus.LOST)
            {
                currentTag.ProductStatus = ProductStatus.LOST;
            }
            else if (receivedITemsDto.UsedItemStatus == UsedItemsStatus.DAMAGED)
            {
                currentTag.ProductStatus = ProductStatus.DAMAGED;
            }
            else if (receivedITemsDto.UsedItemStatus == UsedItemsStatus.MAINTAINABLE)
            {
                currentTag.ProductStatus = ProductStatus.MAINTENANCE;
            }
            else if (receivedITemsDto.UsedItemStatus == UsedItemsStatus.RETURNED)
            {
                currentTag.ProductStatus = ProductStatus.RETURNED;
            }

            if (CurrentItem.ProductTag.Product.Item.Category.CategoryType == CategoryType.ASSET && receivedITemsDto.UsedItemStatus == UsedItemsStatus.MAINTAINABLE)
            {
                MaintainableItems maintainableItems = new MaintainableItems()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = receivedITemsDto.CreatedById,
                    CreatedDate = DateTime.UtcNow,
                    FromStore = true,
                    IssueDetailId = CurrentItem.Id,
                    Rowstatus = RowStatus.ACTIVE
                };
                await _dbContext.MaintainableItems.AddAsync(maintainableItems);
            }

            else if (CurrentItem.ProductTag.Product.Item.Category.CategoryType == CategoryType.ASSET && receivedITemsDto.UsedItemStatus == UsedItemsStatus.RETURNED)
            {
               var currProduct = await _dbContext.Products.FirstOrDefaultAsync(x => x.Id == CurrentItem.ProductTag.ProductId);

                if (currProduct != null)
                {
                    currProduct.RemainingQuantity += 1;
                }
                await _dbContext.SaveChangesAsync();
            }

            CurrentItem.UsedItemStatus = receivedITemsDto.UsedItemStatus;
            CurrentItem.Remark = receivedITemsDto.Remark;
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Adjusted Successfully", Data = CurrentItem.Id.ToString() };
        }


    }
}
