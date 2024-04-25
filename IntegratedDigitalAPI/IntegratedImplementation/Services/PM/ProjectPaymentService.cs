using Implementation.Helper;
using IntegratedImplementation.DTOS.PM;
using IntegratedImplementation.Interfaces.PM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.PM;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.PM
{
    public class ProjectPaymentService : IProjectPaymentService
    {
        private readonly ApplicationDbContext _dbcontxt;
        public ProjectPaymentService(ApplicationDbContext dbcontxt)
        {
            _dbcontxt = dbcontxt;
        }
        public async Task<ResponseMessage> AddPaymentRequisition(PaymentRequisitionPostDto paymentRequisitionPostDto)
        {
            try
            {
                var payment = new PaymentRequisition
                {
                    Id = new Guid(),
                    CreatedDate = DateTime.Now,
                    CreatedById = paymentRequisitionPostDto.CreatedById,

                    Date = paymentRequisitionPostDto.Date,
                    Name = paymentRequisitionPostDto.Name,
                    PurposeOfRequest = paymentRequisitionPostDto.PurposeOfRequest,
                    AmountInWord = paymentRequisitionPostDto.AmountInWord,
                    Amount = paymentRequisitionPostDto.Amount,
                    ProjectId = paymentRequisitionPostDto.ProjectId,
                    BudgetReference = paymentRequisitionPostDto.BudgetReference,
                    PageNumber = paymentRequisitionPostDto.PageNumber,
                    CheckNumber = paymentRequisitionPostDto.CheckNumber,
                    RequestedById = paymentRequisitionPostDto.RequestedById,


                };

                await _dbcontxt.PaymentRequisitions.AddAsync(payment);
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
            var pendingPaymentRequisitions = await _dbcontxt.PaymentRequisitions.Where(x => x.AuthorizedById == null).Select(x => new PaymentRequisitionGetDto
            {
                Id = x.Id,
                Date = x.Date,
                Name = x.Name,
                PurposeOfRequest = x.PurposeOfRequest,
                Amount = x.Amount,
                AmountInWord = x.AmountInWord,
                Project = x.Project.ProjectName,
                BudgetReference = x.BudgetReference,
                PageNumber = x.PageNumber,
                CheckNumber = x.CheckNumber,
                IsRejected = x.IsRejected,
                RejectedRemark = x.RejectedRemark,
                RequestedBy = $"{x.RequestedBy.FirstName} {x.RequestedBy.MiddleName} {x.RequestedBy.LastName}",
                SupportedBy = x.SupportedById != null ? $"{x.RequestedBy.FirstName} {x.RequestedBy.MiddleName} {x.RequestedBy.LastName}" : "",
                CheckedBy = x.CheckedById != null ? $"{x.CheckedBy.FirstName} {x.CheckedBy.MiddleName} {x.CheckedBy.LastName}" : "",
                ApprovedBy = x.ApprovedById != null ? $"{x.ApprovedBy.FirstName} {x.ApprovedBy.MiddleName} {x.ApprovedBy.LastName}" : "",
                AuthorizedBy = x.AuthorizedById != null ? $"{x.AuthorizedBy.FirstName} {x.AuthorizedBy.MiddleName} {x.AuthorizedBy.LastName}" : "",


            }).ToListAsync();

            return pendingPaymentRequisitions;
        }

        public async Task<List<PaymentRequisitionGetDto>> GetAuthorizedPaymentRequisitions()
        {
            var pendingPaymentRequisitions = await _dbcontxt.PaymentRequisitions.Where(x => x.AuthorizedById != null).Select(x => new PaymentRequisitionGetDto
            {
                Id = x.Id,
                Date = x.Date,
                Name = x.Name,
                PurposeOfRequest = x.PurposeOfRequest,
                Amount = x.Amount,
                AmountInWord = x.AmountInWord,
                Project = x.Project.ProjectName,
                BudgetReference = x.BudgetReference,
                PageNumber = x.PageNumber,
                CheckNumber = x.CheckNumber,
                IsRejected = x.IsRejected,
                RejectedRemark = x.RejectedRemark,
                RequestedBy = $"{x.RequestedBy.FirstName} {x.RequestedBy.MiddleName} {x.RequestedBy.LastName}",
                SupportedBy = x.SupportedById != null ? $"{x.RequestedBy.FirstName} {x.RequestedBy.MiddleName} {x.RequestedBy.LastName}" : "",
                CheckedBy = x.CheckedById != null ? $"{x.CheckedBy.FirstName} {x.CheckedBy.MiddleName} {x.CheckedBy.LastName}" : "",
                ApprovedBy = x.ApprovedById != null ? $"{x.ApprovedBy.FirstName} {x.ApprovedBy.MiddleName} {x.ApprovedBy.LastName}" : "",
                AuthorizedBy = x.AuthorizedById != null ? $"{x.AuthorizedBy.FirstName} {x.AuthorizedBy.MiddleName} {x.AuthorizedBy.LastName}" : "",


            }).ToListAsync();

            return pendingPaymentRequisitions;
        }
    }
}
