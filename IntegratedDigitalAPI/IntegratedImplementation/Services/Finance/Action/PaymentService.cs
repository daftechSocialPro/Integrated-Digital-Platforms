using Implementation.Helper;
using IntegratedDigitalAPI.DTOS.PM;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.EntityFrameworkCore;
using System.Linq.Dynamic.Core;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class PaymentService : IPaymentsService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;

        public PaymentService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
        }

        public async Task<ResponseMessage> AddPayments(AddPaymentDto addPayment)
        {
            var currentPeriod = await _dbContext.PeriodDetails.Include(x => x.AccountingPeriod).FirstOrDefaultAsync(x => x.AccountingPeriod.Rowstatus == RowStatus.ACTIVE && x.PeriodStart.Date <= addPayment.PaymentDate.Date && x.PeriodEnd.Date.Date >= addPayment.PaymentDate.Date);

            if (currentPeriod == null)
            {
                return new ResponseMessage { Success = false, Message = "Please Add Accounting Period" };
            }
            else if (!(currentPeriod.AccountingPeriod.StartDate <= addPayment.PaymentDate && currentPeriod.AccountingPeriod.EndDate >= addPayment.PaymentDate))
            {
                return new ResponseMessage { Success = false, Message = "The accounting Period is not consistent with the payment date " };
            }

            if (addPayment.PaymentDate >= DateTime.Now)
            {
                return new ResponseMessage { Success = false, Message = "Please correcft the Payment Date" };
            }

            var path = "";
            var Id = Guid.NewGuid();

            if (addPayment.DocumentPath != null)
                path = _generalConfig.UploadFiles(addPayment.DocumentPath, Id.ToString(), "PaymentDocument").Result.ToString();


            Payment payment = new Payment()
            {
                Id = Id,
                CreatedById = addPayment.CreatedById,
                AccountingPeriodId = currentPeriod.Id,
                BankId = addPayment.BankId,
                CreatedDate = DateTime.Now,
                DocumentPath = path,
                PaymentDate = addPayment.PaymentDate,
                PaymentNumber = addPayment.PaymentNumber,
                PaymentType = Enum.Parse<PaymentType>(addPayment.PaymentType),
                Rowstatus = RowStatus.ACTIVE,
                Remark = addPayment.Remark,
                TypeOfPayee = addPayment.TypeOfPayee,
                BeneficiaryAccountNumber = addPayment.BeneficiaryAccountNumber
            };
            if (addPayment.SupplierId == Guid.Empty)
            {
                payment.SupplierId = addPayment.SupplierId;
            }
            if (addPayment.EmployeeId == Guid.Empty)
            {
                payment.EmployeeId = addPayment.EmployeeId;
            }
            if (!string.IsNullOrEmpty(payment.OtherBeneficiary))
            {
                payment.OtherBeneficiary = addPayment.OtherBeneficiary;
            }

            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();

            foreach (var items in addPayment.AddPaymentDetails)
            {
                PaymentDetail paymentDetail = new PaymentDetail()
                {
                    Id = Guid.NewGuid(),
                    ChartOfAccountId = items.ChartOfAccountId,
                    CreatedById = addPayment.CreatedById,
                    CreatedDate = DateTime.Now,
                    Description = items.Description,
                    ItemId = items.ItemId,
                    PaymentId = payment.Id,
                    Price = items.Price,
                    Quantity = items.Quantity,
                    TotalPrice = items.Price * items.Quantity,
                    Remark = items.Remark,
                    Rowstatus = RowStatus.ACTIVE,
                };

                await _dbContext.PaymentDetails.AddAsync(paymentDetail);
                await _dbContext.SaveChangesAsync();
            }


            return new ResponseMessage { Success = true, Message = "Added Succesfully" };
        }

        public async Task<ResponseMessage> ApprovePayment(ApprovePaymentDto approvePayment)
        {
            var currentPayment = await _dbContext.Payments.FirstOrDefaultAsync(x => x.Id == approvePayment.Id);

            if (currentPayment == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not Find Payment" };
            }

            currentPayment.ApprovedById = approvePayment.ApprovedById;
            currentPayment.ApprovedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Succesfully" };
        }

        public async Task<ResponseMessage> AuthorizePayment(ApprovePaymentDto approvePayment)
        {
            var currentPayment = await _dbContext.Payments.FirstOrDefaultAsync(x => x.Id == approvePayment.Id);

            if (currentPayment == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not Find Payment" };
            }

            //if (currentPayment.ApprovedById == approvePayment.ApprovedById)
            //{
            //    return new ResponseMessage { Success = false, Message = "Approver Can not be authorizer" };
            //}

            currentPayment.AuthorizedById = approvePayment.ApprovedById;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Authorized  Succesfully" };
        }

        public async Task<List<PaymentListDto>> GetPendingPayments()
        {
            var payments = await _dbContext.Payments.AsNoTracking()
                                 .Include(X => X.AccountingPeriod).Include(x => x.Supplier)
                                 .Include(X => X.Bank).Include(x => x.PaymentDetails).ThenInclude(x => x.ChartofAccount)
                                .Where(x => x.ApprovedById == null).Select(x => new PaymentListDto
                                {
                                    Id = x.Id,
                                    AccountingPeriod = $"{x.AccountingPeriod.PeriodNo} {x.AccountingPeriod.PeriodStart.ToString("dd/MM/yyyy")} - {x.AccountingPeriod.PeriodEnd.ToString("dd/MM/yyyy")}",
                                    Bank = x.Bank.BankName,
                                    PaymentDate = x.PaymentDate,
                                    PaymentNumber = x.PaymentNumber,
                                    PaymentType = x.PaymentType.ToString(),
                                    Remark = x.Remark,
                                    DocumentPath = x.DocumentPath,
                                    Supplier = x.Supplier.Name,
                                    TypeOfPayee = x.TypeOfPayee.ToString(),
                                    PaymentDetailLists = x.PaymentDetails.Select(y => new PaymentDetailListDto
                                    {
                                        ChartOfAccount = $"{y.ChartofAccount.Description} ({y.ChartofAccount.AccountNo})",
                                        Description = y.Description,
                                        Item = y.Item.Name,
                                        Price = y.Price,
                                        Quantity = y.Quantity,
                                        Remark = y.Remark,
                                        TotalPrice = y.TotalPrice
                                    }).ToList()

                                }).ToListAsync();

            return payments;
        }

        public async Task<List<PaymentListDto>> GetApprovedPayments()
        {
            var payments = await _dbContext.Payments.AsNoTracking()
                                 .Include(X => X.AccountingPeriod).Include(x => x.Supplier)
                                 .Include(X => X.Bank).Include(x => x.PaymentDetails).ThenInclude(x => x.ChartofAccount)
                                .Where(x => x.ApprovedById != null && x.AuthorizedById == null).Select(x => new PaymentListDto
                                {
                                    Id = x.Id,
                                    AccountingPeriod = $"{x.AccountingPeriod.PeriodNo} {x.AccountingPeriod.PeriodStart.ToString("dd/MM/yyyy")} - {x.AccountingPeriod.PeriodNo.ToString("dd/MM/yyyy")}",
                                    Bank = x.Bank.BankName,
                                    PaymentDate = x.PaymentDate,
                                    PaymentNumber = x.PaymentNumber,
                                    PaymentType = x.PaymentType.ToString(),
                                    Remark = x.Remark,
                                    DocumentPath = x.DocumentPath,
                                    Supplier = x.Supplier.Name,
                                    PaymentDetailLists = x.PaymentDetails.Select(y => new PaymentDetailListDto
                                    {
                                        ChartOfAccount = y.ChartofAccount.AccountNo,
                                        Description = y.Description,
                                        Item = y.Item.Name,
                                        Price = y.Price,
                                        Quantity = y.Quantity,
                                        Remark = y.Remark,
                                        TotalPrice = y.TotalPrice
                                    }).ToList()

                                }).ToListAsync();

            return payments;
        }
        public async Task<List<PaymentListDto>> GetAuthorizedPayments()
        {
            var payments = await _dbContext.Payments.AsNoTracking()
                                 .Include(X => X.AccountingPeriod).Include(x => x.Supplier)
                                 .Include(X => X.Bank).Include(x => x.PaymentDetails).ThenInclude(x => x.ChartofAccount)
                                .Where(x => x.AuthorizedById != null).Select(x => new PaymentListDto
                                {
                                    Id = x.Id,
                                    AccountingPeriod = $"{x.AccountingPeriod.PeriodNo} {x.AccountingPeriod.PeriodStart.ToString("dd/MM/yyyy")} - {x.AccountingPeriod.PeriodNo.ToString("dd/MM/yyyy")}",
                                    Bank = x.Bank.BankName,
                                    PaymentDate = x.PaymentDate,
                                    PaymentNumber = x.PaymentNumber,
                                    PaymentType = x.PaymentType.ToString(),
                                    Remark = x.Remark,
                                    DocumentPath = x.DocumentPath,
                                    Supplier = x.Supplier.Name,
                                    PaymentDetailLists = x.PaymentDetails.Select(y => new PaymentDetailListDto
                                    {
                                        ChartOfAccount = y.ChartofAccount.AccountNo,
                                        Description = y.Description,
                                        Item = y.Item.Name,
                                        Price = y.Price,
                                        Quantity = y.Quantity,
                                        Remark = y.Remark,
                                        TotalPrice = y.TotalPrice
                                    }).ToList()

                                }).ToListAsync();

            return payments;
        }

        public async Task<PaymentLetterDto> GetPaymentLetter(Guid paymentId)
        {
            PaymentLetterDto ltr = new PaymentLetterDto();

            var payments = await _dbContext.Payments.AsNoTracking()
                                  .Include(X => X.ApprovedBy).Include(x => x.Supplier).Include(x => x.AuthorizedBy)
                                  .Include(X => X.Bank).Include(x => x.PaymentDetails).ThenInclude(x => x.ChartofAccount)
                                 .FirstOrDefaultAsync(x => x.Id.Equals(paymentId));
            if (payments != null)
            {
                double totalAmmount = Math.Round(payments.PaymentDetails.Sum(x => x.TotalPrice), 2);
                ltr = new PaymentLetterDto()
                {
                    AccountNumber = payments.Bank.AccountNumber,
                    AmmountInWords = Helper.NumberExtensions.toWords(totalAmmount),
                    BankAddress = payments.Bank.Address,
                    BankName = payments.Bank.BankName,
                    BranchName = payments.Bank.Branch,
                    Receiver = payments.Supplier != null ? payments.Supplier.Name : payments.Employee != null ? $"{payments.Employee.FirstName} {payments.Employee.MiddleName} {payments.Employee.LastName}" : payments.OtherBeneficiary,
                    ReciverAccountNumber = payments.BeneficiaryAccountNumber,
                    TotalAmmount = totalAmmount,
                };

                if (payments.ApprovedBy != null)
                {
                    ltr.Approver = $"{payments.ApprovedBy.FirstName} {payments.ApprovedBy.MiddleName} {payments.ApprovedBy.LastName}";
                    var currentPosition = await _dbContext.EmploymentDetails.Include(x => x.Position).AsNoTracking().FirstOrDefaultAsync(x => x.EmployeeId == payments.ApprovedById && x.Rowstatus == RowStatus.ACTIVE);
                    if (currentPosition != null)
                    {
                        ltr.ApproverPosition = currentPosition.Position.PositionName;
                    }
                }

                if (payments.AuthorizedBy != null)
                {
                    ltr.Authorizer = $"{payments.AuthorizedBy.FirstName} {payments.AuthorizedBy.MiddleName} {payments.AuthorizedBy.LastName}";
                    var currentPosition = await _dbContext.EmploymentDetails.Include(x => x.Position).AsNoTracking().FirstOrDefaultAsync(x => x.EmployeeId == payments.AuthorizedById && x.Rowstatus == RowStatus.ACTIVE);
                    if (currentPosition != null)
                    {
                        ltr.AuthorizerPosition = currentPosition.Position.PositionName;
                    }
                }
            }

            return ltr;
        }

        public async Task<List<PendingFinanceRequestDto>> GetPendingProjectFinanceRequests()
        {

            var activities = await (from p in _dbContext.Projects
                                    join t in _dbContext.Tasks on p.Id equals t.ProjectId
                                    join ap in _dbContext.ActivitiesParents on t.Id equals ap.TaskId
                                    join a in _dbContext.Activities on ap.Id equals a.ActivityParentId
                                    join b in _dbContext.ActivityProgresses on a.Id equals b.ActivityId
                                    where b.IsApprovedByFinance == ApprovalStatus.PENDING
                                    group new { p, t, ap, a, b } by new { p.Id, p.ProjectName, p.PlannedBudget } into grouped
                                    select new PendingFinanceRequestDto
                                    {
                                        Id = grouped.Key.Id,
                                        ProjectName = grouped.Key.ProjectName,
                                        AllocatedBudget = grouped.Key.PlannedBudget,
                                        FinanceActivities = grouped.GroupBy(g => new { g.a.Id, g.a.ActivityNumber, g.a.ActivityDescription, g.a.PlanedBudget, g.a.Indicator, g.a.Goal })
                                            .Select(actGroup => new FinanceActivitiesDto
                                            {
                                                ActivityNumber = actGroup.Key.ActivityNumber,
                                                ActivityDescription = actGroup.Key.ActivityDescription,
                                                AllocatedBudget = actGroup.Key.PlanedBudget,
                                                Indicator = actGroup.Key.Indicator,
                                                PlannedWork = actGroup.Key.Goal,
                                                FinanceWorkedBudgets = actGroup.Select(x => new FinanceWorkedBudgetDto
                                                {
                                                    Id = x.b.Id,
                                                    Date = x.b.CreatedDate,
                                                    ActualWorked = x.b.ActualWorked,
                                                    DocumentPath = x.b.FinanceDocumentPath,
                                                    FinanceDocument = x.b.FinanceDocumentPath,
                                                    Documents = _dbContext.ProgressAttachments.Where(pa => pa.ActivityProgressId == x.b.Id).Select(pa => pa.FilePath).ToList(),
                                                    EmployeeId = x.b.EmployeeValueId.ToString(),
                                                    EmployeeName = $"{x.b.EmployeeValue.FirstName} {x.b.EmployeeValue.MiddleName} {x.b.EmployeeValue.LastName}",
                                                    Activity = x.b.Activity.ActivityDescription,
                                                    ActivityNumber = x.b.Activity.ActivityNumber,
                                                    Remark = x.b.Remark,
                                                    UsedBudget = x.b.ActualBudget,
                                                    IsApprovedByManager = x.b.IsApprovedByManager.ToString(),
                                                    IsApprovedByFinance = x.b.IsApprovedByFinance.ToString(),
                                                    IsApprovedByDirector = x.b.IsApprovedByDirector.ToString(),
                                                    ManagerApprovalRemark = x.b.CoordinatorApprovalRemark,
                                                    FinanceApprovalRemark = x.b.FinanceApprovalRemark,
                                                    DirectorApprovalRemark = x.b.DirectorApprovalRemark
                                                }).ToList()
                                            }).ToList()
                                    }).ToListAsync();


            return activities;


        }

        public async Task<ResponseMessage> AddPayeeDetail(AddPayeeDetailsDto addPayeeDetails)
        {
            var accountexists = await _dbContext.PayeeDetailesPayments.AnyAsync(x => x.PaymentId == addPayeeDetails.PaymentId && x.AccountNumber == addPayeeDetails.AccountNumber);

            if (accountexists)
            {
                return new ResponseMessage { Success = false, Message = "Account already Exists" };
            }

            PayeeDetailesPayment payeeDetailes = new PayeeDetailesPayment()
            {
                Id = Guid.NewGuid(),
                AccountNumber = addPayeeDetails.AccountNumber,
                Ammount = addPayeeDetails.Ammount,
                CreatedById = addPayeeDetails.CreatedById,
                CreatedDate = DateTime.Now,
                FullName = addPayeeDetails.FullName,
                PaymentId = addPayeeDetails.PaymentId,
                Remark = addPayeeDetails.Remark,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.PayeeDetailesPayments.AddAsync(payeeDetailes);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Succesfully", Data = payeeDetailes.Id };
        }

        public async Task<List<PayeeDetailListsDto>> GetPayeeDetails(Guid PaymentId)
        {
            var payeeLists = await _dbContext.PayeeDetailesPayments.Where(x => x.PaymentId == PaymentId).Select(x => new PayeeDetailListsDto
            {
                Id = x.Id,
                AccountNumber = x.AccountNumber,
                Ammount = x.Ammount,
                FullName = x.FullName,
                Remark = x.Remark
            }).ToListAsync();

            return payeeLists;
        }

        public async Task<ResponseMessage> RemovePayeeDetail(Guid id)
        {
            int payeeDetail = await _dbContext.PayeeDetailesPayments.Where(x => x.Id == id).ExecuteDeleteAsync();

            return new ResponseMessage
            {
                Success = payeeDetail > 0 ? true : false,
                Message = "Removed Succesfully"
            };
        }
    }
}
