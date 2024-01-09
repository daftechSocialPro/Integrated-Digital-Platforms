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
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    public class PurchaseRequestService : IPurchaseRequestService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IMapper _mapper;
        private readonly IGeneralConfigService _generalConfig;

        public PurchaseRequestService(ApplicationDbContext dbContext, IMapper mapper, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _generalConfig = generalConfig;
        }

        public async Task<ResponseMessage> AddPurchaseRequest(AddPurchaseRequestDto addPurchase)
        {
            var requestNo = await _generalConfig.GenerateCode(GeneralCodeType.PURCHASEREQUEST);
            PurchaseRequest purchase = new PurchaseRequest
            {
                Id = Guid.NewGuid(),
                CreatedById = addPurchase.CreatedById,
                CreatedDate = DateTime.Now,
                IsStoreRequested = addPurchase.IsStoreRequested,
                RequesterEmployeeId = Guid.Parse(addPurchase.RequesterEmployeeId),
                RequestNumber = requestNo,
                Rowstatus = RowStatus.ACTIVE,
            };
            if (!String.IsNullOrEmpty(addPurchase.StoreRequestId))
            {
                purchase.StoreRequestId = Guid.Parse(addPurchase.StoreRequestId);
            }

            await  _dbContext.PurchaseRequests.AddAsync(purchase);
            await _dbContext.SaveChangesAsync();

            foreach(var items in addPurchase.RequestLists)
            {
                var itemRequestNo = await _generalConfig.GenerateCode(GeneralCodeType.PURCHASEITEMS);
                PurchaseRequestList requestList = new PurchaseRequestList
                {
                    Id = Guid.NewGuid(),
                    CreatedById = addPurchase.CreatedById,
                    CreatedDate = DateTime.Now,
                    ItemId = Guid.Parse(items.ItemId),
                    MeasurementUnitId = Guid.Parse(items.MeasurementUnitId),
                    PurchaseRequestId = purchase.Id,
                    SinglePrice = items.SinglePrice,
                    ApprovalStatus = ApprovalStatus.PENDING,
                    Quantity = items.Quantity,
                    ItemRequestNo = itemRequestNo,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.PurchaseRequestLists.AddAsync(requestList);
                await _dbContext.SaveChangesAsync();
            }

           return new ResponseMessage { Success = true , Message = "Sucess"};
        }

        public async Task<ResponseMessage> ApproveItems(List<ApprovePurchaseRequestDto> requestDtos)
        {
            var items = requestDtos.Select(x => x.Id).ToList();
            var ApproveLists = _dbContext.PurchaseRequestLists.Where(x => items.Contains(x.Id.ToString()));
            foreach(var appLs in ApproveLists)
            {
                appLs.ApprovalStatus = ApprovalStatus.APPROVED;
                appLs.ApproverEmployeeId = Guid.Parse(requestDtos.Find(x => Guid.Parse(x.Id) == appLs.Id).ApproverEmployeeId);
                appLs.APrrovedQuantity = requestDtos.Find(x => Guid.Parse(x.Id) == appLs.Id).APrrovedQuantity;
            }
           await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Sucess" };
        }

        public async Task<List<PurchaseRequestListDto>> GetPendingRequests()
        {
            var requests = await _dbContext.PurchaseRequestLists.Include(x => x.Item)
                                .Include(x => x.MeasurementUnit).AsNoTracking().
                                Where(x => x.ApprovalStatus == ApprovalStatus.PENDING)
                            .ProjectTo<PurchaseRequestListDto>(_mapper.ConfigurationProvider).ToListAsync();
            return requests;
        }

       
    }
}
