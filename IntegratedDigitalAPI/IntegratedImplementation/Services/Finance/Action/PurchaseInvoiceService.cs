using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class PurchaseInvoiceService: IPurchaseInvoiceService
    {

        private readonly ApplicationDbContext _dbContext;

        public PurchaseInvoiceService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddPurchaseInvoice(AddPurchaseInvoiceDto addPurchaseInvoice)
        {
            var voucherExist = await _dbContext.PurchaseInvoices.AnyAsync(x => x.VocherNo == addPurchaseInvoice.VocherNo);

            if(voucherExist)
            {
                return new ResponseMessage { Success = false, Message = "Voucher Number already exists" };
            }

            PurchaseInvoice purchaseInvoice = new PurchaseInvoice()
            {
                Id = Guid.NewGuid(),
                CreatedById = addPurchaseInvoice.CreatedById,
                CreatedDate = DateTime.Now,
                Date = addPurchaseInvoice.Date,
                IsPurchaseRequested = addPurchaseInvoice.IsPurchaseRequested,
                Remark = addPurchaseInvoice.Remark,
                SupplierId = addPurchaseInvoice.SupplierId,
                VocherNo = addPurchaseInvoice.VocherNo,
                Rowstatus = RowStatus.ACTIVE
            };

            if(addPurchaseInvoice.PurchaseRequestId != null)
            {
                purchaseInvoice.PurchaseRequestId = addPurchaseInvoice.PurchaseRequestId;
            }

            await _dbContext.PurchaseInvoices.AddAsync(purchaseInvoice);
            await _dbContext.SaveChangesAsync();

            foreach(var items in addPurchaseInvoice.PurchaseInvoiceDetails)
            {
                PurchaseInvoiceDetail purchaseInvoiceDetail = new PurchaseInvoiceDetail()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = addPurchaseInvoice.CreatedById,
                    CreatedDate = DateTime.Now,
                    ItemId = items.ItemId,
                    Price = items.UnitPrice,
                    PurchaseInvoiceId = purchaseInvoice.Id,
                    Quantity = items.Quantity,
                    Rowstatus = RowStatus.ACTIVE,
                };

                await _dbContext.PurchaseInvoiceDetails.AddAsync(purchaseInvoiceDetail);
                await _dbContext.SaveChangesAsync();
            }

            return new ResponseMessage { Success = true, Message = "Added Succesfully" };

        }

        public async Task<ResponseMessage> ApprovePurchaseInvoice(Guid PurchaseInvoiceId, Guid EmployeeId)
        {
            var currentInvoice = await _dbContext.PurchaseInvoices.FirstOrDefaultAsync(x => x.Id == PurchaseInvoiceId);
            if(currentInvoice == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find PurchaseInvoice" };
            }

            currentInvoice.IsApproved = true;
            currentInvoice.ApprovedById = EmployeeId;

            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Updated Succesfully" };
        }

        public async Task<List<PurchaseInvoiceDto>> GetPendingPurchaseInvoices()
        {
            var purchaseLis = await _dbContext.PurchaseInvoices.Include(x => x.PurchaseRequest)
                                    .Include(x => x.Supplier).Include(x => x.PurchaseInvoiceDetails)
                                    .ThenInclude(x => x.Item).Where(x => !x.IsApproved).AsNoTracking().Select(x => new PurchaseInvoiceDto
                                    {
                                        IsApproved = x.IsApproved,
                                        Date = x.Date,
                                        PurchaseRequestNo = x.PurchaseRequest.RequestNumber,
                                        Remark = x.Remark,
                                        Supplier = x.Supplier.Name,
                                        IsPurchaseRequested = x.IsPurchaseRequested,
                                        VocherNo = x.VocherNo,
                                        PurchaseInvoiceDetails = x.PurchaseInvoiceDetails.Select(y => new PurchaseInvoiceDetailDto
                                        {
                                            ItemName = y.Item.Name,
                                            ItemNo = y.Item.ItemCode,
                                            Quantity = y.Quantity,
                                            UnitPrice = y.Price,
                                            TotalPrice = y.Price * y.Quantity,
                                        }).ToList()

                                    }).ToListAsync();

            return purchaseLis;
        }

        public async Task<List<PurchaseInvoiceDto>> GetPurchaseInvoices()
        {
            var purchaseLis = await _dbContext.PurchaseInvoices.Include(x => x.PurchaseRequest)
                                    .Include(x => x.Supplier).Include(x => x.PurchaseInvoiceDetails)
                                    .ThenInclude(x => x.Item).Where(x => x.IsApproved).AsNoTracking().Select(x => new PurchaseInvoiceDto
                                    {
                                        IsApproved = x.IsApproved,
                                        Date = x.Date,
                                        PurchaseRequestNo = x.PurchaseRequest.RequestNumber,
                                        Remark = x.Remark,
                                        Supplier = x.Supplier.Name,
                                        IsPurchaseRequested = x.IsPurchaseRequested,
                                        VocherNo = x.VocherNo,
                                        PurchaseInvoiceDetails = x.PurchaseInvoiceDetails.Select(y => new PurchaseInvoiceDetailDto
                                        {
                                            ItemName = y.Item.Name,
                                            ItemNo = y.Item.ItemCode,
                                            Quantity = y.Quantity,
                                            UnitPrice = y.Price,
                                            TotalPrice = y.Price * y.Quantity,
                                        }).ToList()

                                    }).ToListAsync();

            return purchaseLis;
        }
    }
}
