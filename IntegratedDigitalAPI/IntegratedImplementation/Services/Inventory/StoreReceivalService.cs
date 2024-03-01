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

        public async Task<List<ApprovedItemsDto>> GetTransportableItems()
        {
            var itemRequests = await (from x in _dbContext.ItemReceivals.Include(x => x.StoreRequestList.Item)
                                      .Include(x => x.StoreRequestList.MeasurementUnit)
                                      .Include(x => x.StoreRequestList.ApproverEmployee)
                                      .Include(x => x.StoreRequestList.StoreRequest)
                                     where x.ReceivedStatus == ItemReceivedStatus.PENDING 
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
                    TotalItems = (double)CurrentItem.Quantity,
                    RemainingItems = (double)storeRequest.Quantity

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
                        IssuedDate = storeRequest.Date.AddDays(1)
                    };
                    await _dbContext.ItemReceivalDetails.AddAsync(itemReceivalDetail);
                    await _dbContext.SaveChangesAsync();
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
                if (!receiveItems.IsBranch)
                {
                    issuedItems.ReceiverEmployeeId = Guid.Parse(receiveItems.EmployeeId);
                    issuedItems.ReceivedStatus = ItemReceivedStatus.RECIVED;
                    await _dbContext.SaveChangesAsync();
                }
               else
                {
                    var itemDetails = await _dbContext.ItemReceivalDetails.Include(x => x.Product).Where(x => x.ItemReceivalId.Equals(issuedItems.Id)).ToListAsync();
                    foreach(var items in itemDetails)
                    {
                        AddProductDto products = new AddProductDto
                        {
                            VendorId = items.Product.VendorId.ToString(),
                            ApprovedForBranchUse = true,
                            ColumnName = receiveItems.ColumnName,
                            RowName = receiveItems.RowName,
                            CreatedById = receiveItems.UserId,
                            Description = items.Product.Description,
                            ExpireDateTime = items.Product.ExpireDateTime,
                            ItemDetailName = items.Product.ItemDetailName,
                            ManufactureDate = items.Product.ManufactureDate,
                            ItemId = items.Product.ItemId.ToString(),
                            MeasurementUnitId = items.MeasurementUnitId.ToString(),
                            Quantity = items.Quantity,
                            Cartoon = 1,
                            Packet = 1,
                            RecivingDateTime = DateTime.Now,
                            SinglePrice = items.Product.SinglePrice
                        };

                       await _productService.AddProduct(products);
                    }
                    _dbContext.ItemReceivalDetails.RemoveRange(itemDetails);
                    _dbContext.ItemReceivals.Remove(issuedItems);
                    await _dbContext.SaveChangesAsync();
                }
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
                                          RemainingQuantity = x.RemainingItems,
                                      }).ToListAsync();
            return itemRequests;
        }

        public async Task<ResponseMessage> AdjustReceivedItems(AdjustReceivedITemsDto receivedITemsDto)
        {
            var CurrentItem = await _dbContext.ItemReceivals.Include(x => x.StoreRequestList.Item.Category).FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(receivedITemsDto.Id)));
            if (CurrentItem == null)
                return new ResponseMessage { Success = false, Message = "Item Not Found" };

            UsedItems usedItems = new UsedItems()
            {
                Id = Guid.NewGuid(),
                CreatedById = receivedITemsDto.CreatedById,
                ItemReceivalId = CurrentItem.Id,
                CreatedDate = DateTime.Now,
                Remark = receivedITemsDto.Remark,
                Rowstatus = RowStatus.ACTIVE,
                TotalItems = CurrentItem.TotalItems - receivedITemsDto.usedQuantity,
                UsedItemStatus = receivedITemsDto.UsedItemStatus
            };

            if (CurrentItem.StoreRequestList.Item.Category.CategoryType == CategoryType.ASSET && receivedITemsDto.UsedItemStatus == UsedItemsStatus.MAINTAINABLE)
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

            await _dbContext.UsedItems.AddAsync(usedItems);
            CurrentItem.RemainingItems -= receivedITemsDto.usedQuantity;
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Adjusted Successfully", Data = CurrentItem.Id.ToString() };
        }


    }
}
