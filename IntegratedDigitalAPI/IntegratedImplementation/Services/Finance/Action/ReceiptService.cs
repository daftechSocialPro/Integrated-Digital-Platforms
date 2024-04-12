using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
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
    public class ReceiptService: IReceiptService
    {

        private readonly ApplicationDbContext _dbContext;

        public ReceiptService(ApplicationDbContext dbContext)
        {
                _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddReceipt(AddReceiptDto addReceipt)
        {
            var currentPeriod = await _dbContext.AccountingPeriods.FirstOrDefaultAsync(x => x.Rowstatus == RowStatus.ACTIVE );

            if (currentPeriod == null)
            {
                return new ResponseMessage { Success = false, Message = "Please Add Accounting Period" };
            }
         

            if (addReceipt.Date >= DateTime.Now)
            {
                return new ResponseMessage { Success = false, Message = "Please correct the Payment Date" };
            }

          

            Receipt receipt = new Receipt()
            {
                Id = Guid.NewGuid(),
                CreatedById = addReceipt.CreatedById,
                BankId = addReceipt.BankId,
                CreatedDate = DateTime.Now,
                Date = addReceipt.Date,
                ReceiptNumber = addReceipt.ReceiptNumber,
                ReferenceNumber = addReceipt.ReferenceNumber,
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.Receipts.AddAsync(receipt);
            await _dbContext.SaveChangesAsync();

            foreach (var items in addReceipt.AddReceiptDetails)
            {
                ReceiptDetail receiptDetail = new ReceiptDetail()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = addReceipt.CreatedById,
                    Quantity = items.Quantity,
                    Description = items.Description,
                    CreatedDate = DateTime.Now,
                    IsTaxable = items.IsTaxable,
                    ReceiptId = receipt.Id,
                    UnitPrice = items.UnitPrice,
                    Rowstatus = RowStatus.ACTIVE,
                };

                await _dbContext.ReceiptDetails.AddAsync(receiptDetail);
                await _dbContext.SaveChangesAsync();
            }


            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

        public async Task<List<ProgressViewDto>> GetFinanceProgress(Guid employeeId)
        {


            var progressView = await(from p in _dbContext.ActivityProgresses.Include(x=>x.Activity).Where(x => x.IsApprovedByFinance==ApprovalStatus.PENDING)
                                     select new ProgressViewDto
                                     {
                                         Id = p.Id,
                                         ActalWorked = p.ActualWorked,
                                         UsedBudget = p.ActualBudget,
                                         IsApprovedByManager = p.IsApprovedByManager.ToString(),
                                         IsApprovedByFinance = p.IsApprovedByFinance.ToString(),
                                         IsApprovedByDirector = p.IsApprovedByDirector.ToString(),
                                         ManagerApprovalRemark = p.CoordinatorApprovalRemark,
                                         FinanceApprovalRemark = p.FinanceApprovalRemark,
                                         DirectorApprovalRemark = p.DirectorApprovalRemark,
                                         FinanceDocument = p.FinanceDocumentPath,
                                         Documents = _dbContext.ProgressAttachments.Where(x => x.ActivityProgressId == p.Id).Select(y => y.FilePath).ToArray(),
                                         CreatedAt = p.CreatedDate,
                                         Activity =p.Activity.ActivityDescription,
                                         ActivityNumber =p.Activity.ActivityNumber

                                     }).ToListAsync();

            return progressView;



        }
    }
}
