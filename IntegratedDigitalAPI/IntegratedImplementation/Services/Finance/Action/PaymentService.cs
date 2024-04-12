using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class PaymentService: IPaymentsService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;

        public PaymentService(ApplicationDbContext dbContext,IGeneralConfigService generalConfig)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
        }

        public async Task<ResponseMessage> AddPayments(AddPaymentDto addPayment)
        {
            var currentPeriod = await _dbContext.PeriodDetails.Include(x => x.AccountingPeriod).FirstOrDefaultAsync(x => x.AccountingPeriod.Rowstatus == RowStatus.ACTIVE && addPayment.AccountingPeriodId == x.Id);

            if(currentPeriod == null) 
            {
                    return new ResponseMessage { Success = false, Message = "Please Add Accounting Period" };            
            }
            else if(!(currentPeriod.AccountingPeriod.StartDate <= addPayment.PaymentDate && currentPeriod.AccountingPeriod.EndDate >= addPayment.PaymentDate))
            {
                return new ResponseMessage { Success = false, Message = "The accounting Period is not consistent with the payment date " };
            }
            
            if(addPayment.PaymentDate >= DateTime.Now)
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
                CreatedById =  addPayment.CreatedById,
                AccountingPeriodId = currentPeriod.Id,
                BankId = addPayment.BankId,
                CreatedDate = DateTime.Now,
                DocumentPath = path,
                PaymentDate = addPayment.PaymentDate,
                PaymentNumber = addPayment.PaymentNumber,
                PaymentType = Enum.Parse<PaymentType>(addPayment.PaymentType),
                Rowstatus = RowStatus.ACTIVE,
                Remark = addPayment.Remark,
                SupplierId = addPayment.SupplierId,
            };

            await _dbContext.Payments.AddAsync(payment);
            await _dbContext.SaveChangesAsync();

            foreach(var items in addPayment.AddPaymentDetails)
            {
                PaymentDetail paymentDetail = new PaymentDetail()
                {
                    Id = Guid.NewGuid(),
                    ChartOfAccountId  = items.ChartOfAccountId,
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

        public async Task<List<PaymentListDto>> GetPendingPayments()
        {
            var payments = await _dbContext.Payments.AsNoTracking()
                                 .Include(X => X.AccountingPeriod).Include(x => x.Supplier)
                                 .Include(X => X.Bank).Include(x => x.PaymentDetails).ThenInclude(x => x.ChartofAccount)
                                .Where(x => x.ApprovedById == null).Select(x => new PaymentListDto
                                {
                                    Id = x.Id,
                                    AccountingPeriod = $"{x.AccountingPeriod.PeriodNo} {x.AccountingPeriod.PeriodStart.ToString("dd/MM/yyyy")} - {x.AccountingPeriod.PeriodNo.ToString("dd/MM/yyyy")}" ,
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

        public async Task<List<PaymentListDto>> GetApprovedPayments()
        {
            var payments = await _dbContext.Payments.AsNoTracking()
                                 .Include(X => X.AccountingPeriod).Include(x => x.Supplier)
                                 .Include(X => X.Bank).Include(x => x.PaymentDetails).ThenInclude(x => x.ChartofAccount)
                                .Where(x => x.ApprovedById != null).Select(x => new PaymentListDto
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
    }
}
