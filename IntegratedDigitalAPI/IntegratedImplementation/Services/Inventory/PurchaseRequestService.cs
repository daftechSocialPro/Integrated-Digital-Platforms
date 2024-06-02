using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.Inventory;
using IntegratedInfrustructure.Models.Inventory;
using Microsoft.AspNetCore.Identity;
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
        private UserManager<ApplicationUser> _userManager;
        private readonly IGeneralConfigService _generalConfig;

        public PurchaseRequestService(ApplicationDbContext dbContext, IMapper mapper, IGeneralConfigService generalConfig, UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _mapper = mapper;
            _generalConfig = generalConfig;
            _userManager = userManager;
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
            if (!String.IsNullOrEmpty(addPurchase.ProjectId))
            {
                purchase.ProjectId = Guid.Parse(addPurchase.ProjectId);
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

        public async Task<List<ApprovedPurchaseRequestsDto>> GetApproveItems()
        {
            var requests = await _dbContext.PurchaseRequestLists.Include(x => x.Item)
                          .Include(x => x.MeasurementUnit).Include(x => x.PerformaDetails).ThenInclude(x => x.Vendor).AsNoTracking().
                          Where(x => x.ApprovalStatus == ApprovalStatus.APPROVED && !x.IsFinalApproved)
                          .Select(x => new ApprovedPurchaseRequestsDto
                          {
                              Id = x.Id,
                              ItemName = x.Item.Name,
                              Quantitiy = x.Quantity,
                              RequestNumber = x.ItemRequestNo,
                              ApproverEmployee = x.ApproverEmployee != null ? $"{x.ApproverEmployee.FirstName} {x.ApproverEmployee.MiddleName} {x.ApproverEmployee.LastName}" : "",
                              PerformaDetails = x.PerformaDetails.Select(y => new ApprovedPerformaDetailDto
                                                {
                                                    Id = y.Id,
                                                    VendorName = y.Vendor.Name,
                                                    Description = y.Description,
                                                    FromDate = y.FromDate,
                                                    ToDate = y.ToDate,
                                                    SinglePrice = y.SinglePrice,
                                                    
                                                }).ToList()
                          }).ToListAsync();

            return requests;
        }


        public async Task<ResponseMessage> AddPerforma(AddPerformaDto addPerforma)
        {
            var performaExists = await _dbContext.PerformaDetails.AnyAsync(x => x.PurchaseRequestListId == addPerforma.PurchaseRequestListId && x.VendorId == addPerforma.VendorId);

            if (performaExists)
            {
                return new ResponseMessage { Success = false, Message = "Vendor Already Exists for this performa" };
            }

            PerformaDetail performaDetail = new PerformaDetail()
            {
                Id = Guid.NewGuid(),
                CreatedById = addPerforma.CreatedById,
                CreatedDate = DateTime.Now,
                Description = addPerforma.Description,
                FromDate = addPerforma.FromDate,
                PurchaseRequestListId = addPerforma.PurchaseRequestListId,
                Rowstatus = RowStatus.ACTIVE,
                SinglePrice = addPerforma.SinglePrice,
                ToDate = addPerforma.ToDate,
                VendorId = addPerforma.VendorId,
                IsWinner = false
            };

            await _dbContext.PerformaDetails.AddAsync(performaDetail);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Performa Added Succesfully" };


        }


        public async Task<ResponseMessage> ApproveFinalRequest(ApprovePerformaDto approvePerforma)
        {
            var currentRequest = await _dbContext.PurchaseRequestLists.Include(x => x.PerformaDetails).FirstOrDefaultAsync(x => x.Id == approvePerforma.PurchaseRequestListId);

            if(currentRequest == null)
            {
                return new ResponseMessage { Success = false, Message = "Could Not Find Purchase Request Lis" };
            }

            var approverEmployee = await _dbContext.Employees.FindAsync(approvePerforma.EmployeeId);

            if(approverEmployee == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Employee" };
            }

            var currentUSer = await _userManager.Users.FirstOrDefaultAsync(X => X.EmployeeId == approverEmployee.Id);
            if(currentUSer == null)
            {
                return new ResponseMessage { Success = false, Message = "User does not exist" };
            }

            if(currentRequest.PerformaDetails.Count() < 3 )
            {
              
                if (_userManager.IsInRoleAsync(currentUSer, "ED").Result == false &&  (_userManager.IsInRoleAsync(currentUSer, "DED")).Result == false)
                {
                    return new ResponseMessage { Success = false, Message = "Since the Performa is less than three items the ED or DED need to approve the request" };
                }
            }

            var winnerVendor = await _dbContext.PerformaDetails.FirstOrDefaultAsync(x => x.VendorId ==  approvePerforma.VendorId && x.PurchaseRequestListId == approvePerforma.PurchaseRequestListId);



            if(winnerVendor == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Vendor" };
            }
             
            if(winnerVendor.ToDate <= DateTime.Now)
            {
                return new ResponseMessage { Success = false, Message = "Please Check the end Date of the vendor" };
            }

            winnerVendor.IsWinner = true;
            currentRequest.IsFinalApproved = true;
            currentRequest.FinalApproverId = approvePerforma.EmployeeId;
            currentRequest.ApprovedQuantity = approvePerforma.ApprovedQuantity;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Performa Succesfully" };

        }


    }
}
