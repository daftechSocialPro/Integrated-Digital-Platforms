using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class ReceiptService : IReceiptService
    {

        private readonly ApplicationDbContext _dbContext;

        public ReceiptService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddReceipt(AddReceiptDto addReceipt)
        {
            var currentPeriod = await _dbContext.PeriodDetails.Include(x => x.AccountingPeriod).FirstOrDefaultAsync(x => x.PeriodStart.Date <= addReceipt.Date.Date && x.PeriodEnd.Date >= addReceipt.Date.Date);


            if (currentPeriod == null)
            {
                return new ResponseMessage { Success = false, Message = "Please Add Accounting Period" };
            }

            if (currentPeriod.AccountingPeriod.Rowstatus == RowStatus.INACTIVE)
            {
                return new ResponseMessage { Success = false, Message = "This Accounting Period has passed please contact your Administrator" };
            }


            if (addReceipt.Date.Date >= DateTime.Now.Date)
            {
                return new ResponseMessage { Success = false, Message = "Please correct the Payment Date" };
            }

            Receipt receipt = new Receipt()
            {
                Id = Guid.NewGuid(),
                CreatedById = addReceipt.CreatedById,
                BankId = addReceipt.BankId,
                CreatedDate = DateTime.Now,
                AccountingPeriodId = currentPeriod.Id,
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
                    ChartOfAccountId = items.ChartOfAccountId,
                    SubsidiaryAccountId = items.SubsidiaryAccountId


                };
                if (items.ItemId != null)
                {
                    receiptDetail.ItemId = items.ItemId;
                }
                if (items.ProjectId != null)
                {
                    receiptDetail.ProjectId = items.ProjectId;
                }

                await _dbContext.ReceiptDetails.AddAsync(receiptDetail);
                await _dbContext.SaveChangesAsync();
            }


            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

        public async Task<List<ReceiptGetDto>> GetReceipts()
        {
            var receipt = await _dbContext.Receipts.Select(x => new ReceiptGetDto()
            {
                Id = x.Id,
                BankId = x.BankId,
                ReferenceNumber = x.ReferenceNumber,
                ReceiptNumber = x.ReceiptNumber,
                Date = x.Date,
                BankName = x.Bank.BankName,
                ReceiptDetails = x.ReceiptDetails.Select(x => new ReceiptDetailGetDto()
                {
                    ItemId = x.ItemId,
                    ItemName = x.Item.Name,
                    ChartOfAccountId = x.ChartOfAccountId,
                    ChartOfAccountName = $"{x.ChartOfAccount.AccountNo} ( {x.ChartOfAccount.Description} )",
                    SubsidiaryAccountId = x.SubsidiaryAccountId,
                    SubsidiaryAccountName = $"{x.SubsidiaryAccount.AccountNo} ( {x.SubsidiaryAccount.Description} )",
                    Description = x.Description,
                    UnitPrice = x.UnitPrice,
                    Quantity = x.Quantity,
                    IsTaxable = x.IsTaxable,
                    ProjectId = x.ProjectId,
                    ProjectName = x.Project.ProjectName
                }).ToList()
            }).ToListAsync();


            return receipt;
        }

        public async Task<List<ProgressViewDto>> GetFinanceProgress(Guid employeeId)
        {


            var progressView = await (from p in _dbContext.ActivityProgresses
                                     .Include(x => x.Activity)
                                     .Include(x => x.EmployeeValue)
                                     .Where(x => x.IsApprovedByFinance == ApprovalStatus.PENDING)
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
                                          Activity = p.Activity.ActivityDescription,
                                          ActivityNumber = p.Activity.ActivityNumber,
                                          EmployeeId = p.EmployeeValueId.ToString(),
                                          EmployeeName = $"{p.EmployeeValue.FirstName} {p.EmployeeValue.MiddleName} {p.EmployeeValue.LastName}",


                                      }).ToListAsync();

            return progressView;



        }
    }
}
