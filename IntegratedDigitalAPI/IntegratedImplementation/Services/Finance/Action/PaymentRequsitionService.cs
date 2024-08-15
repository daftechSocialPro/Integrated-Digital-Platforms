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
        private readonly ApplicationDbContext _dbcontxt;
        public PaymentRequsitionService(ApplicationDbContext dbcontxt)
        {
            _dbcontxt = dbcontxt;
        }
        public async Task<ResponseMessage> AddPaymentRequisition(PaymentRequisitionPostDto paymentRequisitionPostDto)
        {
            try
            {
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

                await _dbcontxt.PaymetRequisitions.AddAsync(payment);
                await _dbcontxt.SaveChangesAsync();

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
            var pendingPaymentRequisitions = await _dbcontxt.PaymetRequisitions.Include(x => x.Project)
                .Include(x => x.Activity).Include(x => x.PurchaseRequest)
                .Include(x => x.CreatedBy).Where(x => x.ApproverId == null).Select(x => new PaymentRequisitionGetDto
                {
                    Id = x.Id,
                    Activity = x.Activity != null ? x.Activity.ActivityNumber : "",
                    BudgetLine = x.BudgetLine,
                    Description = x.Description,
                    Ammount = x.Ammount,
                    PaymentType = x.PaymentType.ToString(),
                    Project = x.Project != null ? x.Project.ProjectName: "",
                    PurchaseREquest = x.PurchaseRequest != null?  x.PurchaseRequest.RequestNumber : "",
                    Purpose = x.Purpose,
                    RequsitionType = x.RequsitionType.ToString(),
                    Requester =  _dbcontxt.Employees.Any(z => z.Id == x.CreatedBy.EmployeeId) ? _dbcontxt.Employees.Select(y => new { y.Id, y.FirstName,y.MiddleName,y.LastName}).First(z => z.Id == x.CreatedBy.EmployeeId).FirstName : "",
                }).ToListAsync();

            return pendingPaymentRequisitions;
        }

        public async Task<List<PaymentRequisitionGetDto>> GetAuthorizedPaymentRequisitions()
        {
            var pendingPaymentRequisitions = await _dbcontxt.PaymetRequisitions.Where(x => x.ApproverId != null).Select(x => new PaymentRequisitionGetDto
            {
                Id = x.Id,
                Activity = x.Activity != null ? x.Activity.ActivityNumber : "",
                BudgetLine = x.BudgetLine,
                Description = x.Description,
                PaymentType = x.PaymentType.ToString(),
                Project = x.Project != null ? x.Project.ProjectName : "",
                PurchaseREquest = x.PurchaseRequest != null ? x.PurchaseRequest.RequestNumber : "",
                Purpose = x.Purpose,
                RequsitionType = x.RequsitionType.ToString(),
                Requester = _dbcontxt.Employees.Any(z => z.Id == x.CreatedBy.EmployeeId) ? _dbcontxt.Employees.Select(y => new { y.Id, y.FirstName, y.MiddleName, y.LastName }).First(z => z.Id == x.CreatedBy.EmployeeId).FirstName : "",
                ApprovedDate = x.ApprovedDate,
                Approver = $"{x.Approver.FirstName} {x.Approver.MiddleName} {x.Approver.LastName}"
            }).ToListAsync();

            return pendingPaymentRequisitions;
        }

        public async Task<ResponseMessage> ApprovePaymentRequisition(ApprovePaymentRequsition paymentRequsition)
        {
            var currentRequsition = await _dbcontxt.PaymetRequisitions.FirstOrDefaultAsync(x => x.Id == paymentRequsition.Id);

            if(currentRequsition == null)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Payment Requisition" };
            }

            currentRequsition.ApproverId = paymentRequsition.EmployeeId;
            currentRequsition.ApprovedDate = DateTime.Now;

            await _dbcontxt.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Succesfully!!" };
        }
    }
}
