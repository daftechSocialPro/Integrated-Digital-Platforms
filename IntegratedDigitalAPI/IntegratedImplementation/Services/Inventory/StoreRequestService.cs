using Azure.Core;
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
using System.Diagnostics.Metrics;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    public class StoreRequestService: IStoreRequestService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IStoreReceivalService _receivalService;
        public StoreRequestService(ApplicationDbContext dbContext, IGeneralConfigService generalConfigService, IStoreReceivalService receivalService) 
        {
            _dbContext = dbContext;
            _generalConfig = generalConfigService;
            _receivalService = receivalService;
        }

        public async Task<ResponseMessage> AddStoreRequest(AddStoreRequestDto addStoreRequest)
        {
            string MessageLists = "Success";
            var requestNo = await _generalConfig.GenerateCode(GeneralCodeType.STOREREQUEST);
            
            StoreRequest store = new StoreRequest
            {
                Id = Guid.NewGuid(),
                CreatedById = addStoreRequest.CreatedById,
                CreatedDate = DateTime.Now,
                RequesterEmployeeId = Guid.Parse(addStoreRequest.RequesterEmployeeId),
                Rowstatus = RowStatus.ACTIVE,
                StoreRequestNumber = requestNo,
            };
          
            await _dbContext.StoreRequests.AddAsync(store);
            await _dbContext.SaveChangesAsync();

            foreach (var items in addStoreRequest.RequestLists)
            {
                var itemRequestNo = await _generalConfig.GenerateCode(GeneralCodeType.STOREITEMS);

                var currentItem = await _dbContext.Items.FirstOrDefaultAsync(x => x.Id == Guid.Parse(items.ItemId));
                if (currentItem == null)
                    continue;

                StoreRequestList storeRequest = new StoreRequestList
                {
                    Id = Guid.NewGuid(),
                    CreatedById = addStoreRequest.CreatedById,
                    CreatedDate = DateTime.Now,
                    ItemId = Guid.Parse(items.ItemId),
                    MeasurementUnitId = Guid.Parse(items.MeasurementUnitId),
                    StoreRequestId = store.Id,
                    Quantity = items.Quantity,
                    ApprovalStatus = ApprovalStatus.PENDING,
                    RequestNumber = itemRequestNo,
                    Rowstatus = RowStatus.ACTIVE
                };
                await _dbContext.StoreRequestLists.AddAsync(storeRequest);
                await _dbContext.SaveChangesAsync();

            }

            return new ResponseMessage { Success = true, Message = MessageLists };
        }



        public async Task<List<StoreRequestItems>> GetPendingStoreRequests()
        {
            List<StoreRequestItems> StoreRequestLists = new List<StoreRequestItems>();

            var itemRequests = await (from x in _dbContext.StoreRequestLists.Include(x => x.StoreRequest.RequesterEmployee)
                                      where x.ApprovalStatus == ApprovalStatus.PENDING 
                                      group x by new { x.ItemId, x.Item.Name, x.MeasurementUnit.MeasurementType } into It
                                      select new
                                      {
                                          It.Key.ItemId,
                                          It.Key.Name,
                                          It.Key.MeasurementType
                                      }).ToListAsync();

            foreach (var items in itemRequests)
            {
                double measuerement = 0.0;
                double StoreapprovedQuantity = 0.0;
                var currentProducts = await (from x in _dbContext.Products.Include(x => x.MeasurementUnit)
                                             where x.ItemId.Equals(items.ItemId) && x.RemainingQuantity > 0
                                             select new
                                             {
                                                 x.RemainingQuantity,
                                                 x.MeasurementUnit.ToSIUnit
                                             }).ToListAsync();

                foreach (var remainingItem in currentProducts)
                {
                    measuerement = measuerement + (remainingItem.RemainingQuantity * remainingItem.ToSIUnit);
                }


                var StoreApprovedProducts = await _dbContext.StoreRequestLists.Include(x => x.MeasurementUnit)
                                                 .Where(x => x.ApprovalStatus == ApprovalStatus.APPROVED &&
                                                 x.ItemId == items.ItemId && !x.IsIssued )
                                                .Select(x => new
                                                {
                                                   Quantity = x.Quantity,
                                                   x.MeasurementUnit.ToSIUnit,
                                                }).ToListAsync();

                foreach (var storeItems in StoreApprovedProducts)
                {
                    StoreapprovedQuantity = StoreapprovedQuantity + ((double)storeItems.Quantity * storeItems.ToSIUnit);
                }


                var requestLists = await _dbContext.StoreRequestLists.Include(x => x.MeasurementUnit).
                                          Include(x => x.StoreRequest.RequesterEmployee).AsNoTracking()
                                         .Where(x => x.ApprovalStatus == ApprovalStatus.PENDING && x.ItemId == items.ItemId)
                                         .Select(x => new StoreRequestLists
                                         {
                                             Id = x.Id.ToString(),
                                             MeasurementUnitName = x.MeasurementUnit.Name,
                                             Quantity = x.Quantity,
                                             ToSIUnit = x.MeasurementUnit.ToSIUnit,
                                             RequesterEmployee = $"{x.StoreRequest.RequesterEmployee.FirstName} {x.StoreRequest.RequesterEmployee.MiddleName} {x.StoreRequest.RequesterEmployee.LastName}"
                                         }).ToListAsync();

                StoreRequestItems requestItems = new StoreRequestItems
                {
                    ItemId = items.ItemId.ToString(),
                    ItemName = items.Name,
                    MeasurementUnitName = _dbContext.MeasurmentUnits.First(x => x.MeasurementType == items.MeasurementType && x.ToSIUnit == 1).Name,
                    RemainingQuantity = measuerement,
                    StoreApprovedQuantity = StoreapprovedQuantity,
                    StoreRequests = requestLists
                };
                StoreRequestLists.Add(requestItems);
            }

           return StoreRequestLists;
        }

        public async Task<ResponseMessage> RejectStoreRequest(RejectStoreRequest rejectRequest)
        {
            var request = await _dbContext.StoreRequestLists.FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(rejectRequest.Id)));
            if(request != null)
            {
                request.ApprovalStatus = ApprovalStatus.REJECTED;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Data = request };
            }

            return new ResponseMessage { Success = false, Message = "Could Not Find Item" };
        }

        public async Task<ResponseMessage> ApproveStoreRequest(ApproveStoreRequest approveRequest)
        {
            var request = await _dbContext.StoreRequestLists.Include(x => x.MeasurementUnit)
                        .FirstOrDefaultAsync(x => x.Id.Equals(Guid.Parse(approveRequest.Id)));
            
            if (request != null)
            {
                double measuerement = 0.0;
                double StoreapprovedQuantity = 0.0;
                var currentProducts = await (from x in _dbContext.Products.Include(x => x.MeasurementUnit)
                                             where x.ItemId.Equals(request.ItemId) && x.RemainingQuantity > 0
                                             select new
                                             {
                                                 x.RemainingQuantity,
                                                 x.MeasurementUnit.ToSIUnit,
                                                 x.Cartoon,
                                                 x.Packet
                                             }).ToListAsync();

                foreach (var remainingItem in currentProducts)
                {
                    measuerement = measuerement + (remainingItem.RemainingQuantity * remainingItem.ToSIUnit);
                }

                var StoreApprovedProducts = await _dbContext.StoreRequestLists.Include(x => x.MeasurementUnit)
                                                 .Where(x => x.ApprovalStatus == ApprovalStatus.APPROVED && x.ItemId == request.ItemId && !x.IsIssued)
                                         .Select(x => new
                                         {
                                             Quantity = x.Quantity,
                                             x.MeasurementUnit.ToSIUnit,
                                         }).ToListAsync();
                foreach (var storeItems in StoreApprovedProducts)
                {
                    StoreapprovedQuantity = StoreapprovedQuantity + ((double)storeItems.Quantity * storeItems.ToSIUnit);
                }

                if(StoreapprovedQuantity + measuerement < approveRequest.ApprovedQuantity)
                    return new ResponseMessage { Success = false, Message = "No stok in Item" };

                request.ApprovalStatus = ApprovalStatus.APPROVED;
                request.Quantity = approveRequest.ApprovedQuantity;
                request.ApproverEmployeeId = Guid.Parse(approveRequest.ApproverEmployeeId);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Data = request };
            }
            return new ResponseMessage { Success = false, Message = "Could Not Find Item" };
        }
    }
}
