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
    public class PaymentRequsitionService: IPaymentRequsitionService
    {
        private readonly ApplicationDbContext _dbContext;
        public PaymentRequsitionService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<ResponseMessage> AddPaymentRequisition(PaymentRequisitionPostDto paymentRequisitionPostDto)
        {
            try
            {
                var activityExists = await _dbContext.PaymetRequisitions.AnyAsync(x => paymentRequisitionPostDto.ActivityId == x.ActivityId);

                if (activityExists)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = "Payment Requsition for this activity already exists"
                    };
                }

                var payment = new PaymetRequisitions
                {
                    Id = new Guid(),
                    CreatedDate = DateTime.Now,
                    CreatedById = paymentRequisitionPostDto.CreatedById,
                    BudgetLine = paymentRequisitionPostDto.BudgetLine,
                    PaymentType = paymentRequisitionPostDto.PaymentType,
                    Description = paymentRequisitionPostDto.Description,
                    RequsitionType = paymentRequisitionPostDto.RequsitionType,
                    Purpose = paymentRequisitionPostDto.Purpose,
                    Ammount = paymentRequisitionPostDto.Ammount,
                    Rowstatus = RowStatus.ACTIVE
                };

                if (paymentRequisitionPostDto.purchaseRequestId != null)
                {
                    payment.purchaseRequestId = paymentRequisitionPostDto.purchaseRequestId;
                }
                if (paymentRequisitionPostDto.ProjectId != null)
                {
                    payment.ProjectId = paymentRequisitionPostDto.ProjectId;
                }
                if (paymentRequisitionPostDto.ActivityId != null)
                {
                    payment.ActivityId = paymentRequisitionPostDto.ActivityId;
                }

                await _dbContext.PaymetRequisitions.AddAsync(payment);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Success = true,
                    Message = "Payment Requisition Requested Successfully"
                };

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }


        public async Task<List<PaymentRequisitionGetDto>> GetPendingPaymentRequisitions()
        {
            var pendingPaymentRequisitions = await _dbContext.PaymetRequisitions.Include(x => x.Project)
                .Include(x => x.Activity).Include(x => x.PurchaseRequest)
                .Include(x => x.CreatedBy).Where(x => x.ApproverId != null && x.AuthorizerId == null).Select(x => new PaymentRequisitionGetDto
                {
                    Id = x.Id,
                    Activity = x.Activity != null ? x.Activity.ActivityNumber : "",
                    BudgetLine = x.BudgetLine,
                    Description = x.Description,
                    Ammount = x.Ammount,
                    PaymentType = x.PaymentType.ToString(),
                    Project = x.Project != null ? x.Project.ProjectName: "",
                    PurchaseRequest = x.PurchaseRequest != null?  x.PurchaseRequest.RequestNumber : "",
                    ActivityId = x.ActivityId,
                    Purpose = x.Purpose,
                    RequsitionType = x.RequsitionType.ToString(),
                    Requester =  _dbContext.Employees.Any(z => z.Id == x.CreatedBy.EmployeeId) ? _dbContext.Employees.Select(y => new { y.Id, y.FirstName,y.MiddleName,y.LastName}).First(z => z.Id == x.CreatedBy.EmployeeId).FirstName : "",
                }).ToListAsync();

            return pendingPaymentRequisitions;
        }

        public async Task<List<PaymentRequisitionGetDto>> GetAuthorizedPaymentRequisitions()
        {
            var pendingPaymentRequisitions = await _dbContext.PaymetRequisitions.Where(x => x.AuthorizerId != null).Select(x => new PaymentRequisitionGetDto
            {
                Id = x.Id,
                Activity = x.Activity != null ? x.Activity.ActivityNumber : "",
                BudgetLine = x.BudgetLine,
                Description = x.Description,
                PaymentType = x.PaymentType.ToString(),
                Project = x.Project != null ? x.Project.ProjectName : "",
                PurchaseRequest = x.PurchaseRequest != null ? x.PurchaseRequest.RequestNumber : "",
                Purpose = x.Purpose,
                RequsitionType = x.RequsitionType.ToString(),
                Requester = _dbContext.Employees.Any(z => z.Id == x.CreatedBy.EmployeeId) ? _dbContext.Employees.Select(y => new { y.Id, y.FirstName, y.MiddleName, y.LastName }).First(z => z.Id == x.CreatedBy.EmployeeId).FirstName : "",
                ApprovedDate = x.ApprovedDate,
                Approver = $"{x.Approver.FirstName} {x.Approver.MiddleName} {x.Approver.LastName}"
            }).ToListAsync();

            return pendingPaymentRequisitions;
        }

        public async Task<ResponseMessage> ApprovePaymentRequisition(ApprovePaymentRequsition paymentRequsition)
        {
            var currentRequsition = await _dbContext.PaymetRequisitions.FirstOrDefaultAsync(x => x.Id == paymentRequsition.Id);

            if (currentRequsition == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Payment Requisition" };
            }
            if (paymentRequsition.Approve)
            {
                currentRequsition.ApproverId = paymentRequsition.EmployeeId;
                currentRequsition.ApprovedDate = DateTime.Now;
            }
            else
            {
                if (currentRequsition.ApproverId == null)
                {
                    return new ResponseMessage { Success = false, Message = "First Approve Before Authorizing" };
                }
                currentRequsition.AuthorizerId = paymentRequsition.EmployeeId;
                currentRequsition.AuthorizedDate = DateTime.Now;
            }
            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Approved Succesfully!!" };
        }

        public async Task<List<ActivityForSettlementDto>> GetEmployeePaymentSettlements()
        {
            DateTime todayDate = DateTime.Now.AddDays(-7);
            var activities = await (from p in _dbContext.PaymetRequisitions
                                    join t in _dbContext.Activities on p.ActivityId equals t.Id
                                    join b in _dbContext.ActivityProgresses on t.Id equals b.ActivityId
                                    join e in _dbContext.Users on p.CreatedById equals e.Id
                                    where p.IsSettled == false
                                    group new { p, t, b, e} by new {t.Id,t.PlanedBudget,t.ActivityDescription,t.ActivityNumber} into grouped
                                    select new ActivityForSettlementDto
                                    {
                                        ActivityId = grouped.Key.Id,
                                        ActivityDescription = grouped.Key.ActivityDescription,
                                        ActivityNumber = grouped.Key.ActivityNumber,
                                        TotalAmount = grouped.Key.PlanedBudget,
                                        UsedAmmount = grouped.Sum(l => l.p.Ammount),
                                       RequsitionSettlementsDtos = grouped.Select(g => new RequsitionSettlementsDto
                                        {
                                            RequsitionId = g.p.Id,
                                            RequestedAmmount = g.p.Ammount,
                                            UsedAmmount = grouped.Sum(y => y.b.ActualWorked),
                                            Employee = g.e.UserName,
                                           IsExpired = g.p.CreatedDate <= todayDate ? true : false,
                                       }).ToList()
                                    }).Where(y => y.TotalAmount > y.UsedAmmount).ToListAsync();
            return activities;
        }

        public async Task<List<EmployeeRequsitionsDto>> GetEmployeeRequsitions(string userId)
        {
            var pendingPaymentRequisitions = await _dbContext.PaymetRequisitions.Include(x => x.Project)
               .Include(x => x.Activity).Include(x => x.PurchaseRequest).Include(x => x.Authorizer)
               .Include(x => x.Approver).Where(x => x.CreatedById == userId)
               .Select(x => new EmployeeRequsitionsDto
               {
                   Id = x.Id,
                   Activity = x.Activity != null ? x.Activity.ActivityNumber : "",
                   BudgetLine = x.BudgetLine,
                   Description = x.Description,
                   Ammount = x.Ammount,
                   PaymentType = x.PaymentType.ToString(),
                   Project = x.Project != null ? x.Project.ProjectName : "",
                   PurchaseRequest = x.PurchaseRequest != null ? x.PurchaseRequest.RequestNumber : "",
                   Purpose = x.Purpose,
                   RequsitionType = x.RequsitionType.ToString(),
                   Approver = x.Approver != null ? $"{x.Approver.FirstName} {x.Approver.MiddleName} {x.Approver.LastName}" : "",
                   Authorizer = x.Authorizer != null ? $"{x.Authorizer.FirstName} {x.Authorizer.MiddleName} {x.Authorizer.LastName}" : "",
                   ApprovedDate = x.ApprovedDate,
                   AuthorizedDate = x.AuthorizedDate,
                   RequestStatus = x.Approver == null && x.Authorizer == null ? "Pending" : x.Approver != null && x.Authorizer == null ? "Approved" : "Authorized",
                   SettlmentStatus = x.IsSettled ? "Settled" : "Pending"
               }).ToListAsync();

            return pendingPaymentRequisitions;
        } 
        
        public async Task<List<PendingRequestAmmountDto>> GetPendignRequestsByProjectManager(Guid employeeId)
        {
            var pendingPaymentRequisitions = await _dbContext.PaymetRequisitions.Include(x => x.Project)
               .Include(x => x.Activity).Include(x => x.PurchaseRequest).Include(x => x.Authorizer)
               .Include(x => x.Approver).Where(x => x.Project.ProjectManagerId == employeeId && x.ApproverId == null)
               .Select(x => new PendingRequestAmmountDto
               {
                   Id = x.Id,
                   Activity = x.Activity != null ? x.Activity.ActivityNumber : "",
                   Description = x.Description,
                   Ammount = x.Ammount,
                   Project = x.Project != null ? x.Project.ProjectName : "",
                   AllocatedBudget = x.Activity.PlanedBudget,
                   UsedBudget = _dbContext.PaymetRequisitions.Where(y => y.ActivityId == x.ActivityId && x.ApproverId != null).Sum(x => x.Ammount)
               }).ToListAsync();

            return pendingPaymentRequisitions;
        }
        public async Task<BudgetByActivityDto> GetBudgetByActivity(Guid activityId)
        {
            var currentActivity = await _dbContext.Activities.Where(x => x.Id == activityId).Select(x => new BudgetByActivityDto
            {
                ActivityId = x.Id,
                AllocatedBudget = x.PlanedBudget
            }).FirstOrDefaultAsync();
            if (currentActivity != null)
            {
                currentActivity.UsedBudget = await _dbContext.PaymetRequisitions.Where(x => x.ActivityId == currentActivity.ActivityId && x.AuthorizerId != null).SumAsync(x => x.Ammount);
                return currentActivity;
            }

            return new BudgetByActivityDto();
        }

    }
}
