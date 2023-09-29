using Azure.Core;
using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployementDetailService: IEmployementDetailService
    {
        private readonly ApplicationDbContext _dbContext;
        private IGeneralConfigService _generalConfig;
        public EmployementDetailService(ApplicationDbContext dbContext,IGeneralConfigService generalConfig) 
        { 
            _dbContext = dbContext;
            _generalConfig = generalConfig;
        }

        public async Task<List<ResignationRequestListDto>> GetResingationLists()
        {
            return await _dbContext.ResignationRequests.Include(x => x.Employee)
                                      .AsNoTracking().Where(x => !x.IsApproved).Select(x =>
                               new ResignationRequestListDto
                               {
                                   Id = x.Id,
                                   EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                   ReasonForResignation = x.ReasonForResignation,
                                   ResignationDate = x.ResignationDate,
                                   ResignationLetterPath = x.ResignationLetterPath
                               }).ToListAsync();
        }

        public async Task<ResponseMessage> RequestResignationLetter(ResignationRequestDto resignationRequest)
        {
            var currEmp = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == resignationRequest.EmployeeId);
            if (currEmp == null)
                return new ResponseMessage { Success = false, Message = "Employee Could not be found" };

            var id = Guid.NewGuid();
            var path = "";

            if (resignationRequest.ResignationLetterPath != null)
                path = _generalConfig.UploadFiles(resignationRequest.ResignationLetterPath, id.ToString(), "ResignationLetter").Result.ToString();


            ResignationRequest request = new ResignationRequest()
            {
                Id = id,
                EmployeeId = resignationRequest.EmployeeId,
                ReasonForResignation = resignationRequest.ReasonForResignation,
                ResignationDate = resignationRequest.ResignationDate,
                ResignationLetterPath = path,
                CreatedById = resignationRequest.CreatedById,
                CreatedDate = DateTime.Now,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.ResignationRequests.AddAsync(request);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully" };
        }

        public async Task<ResponseMessage> ApproveResignationRequest(Guid requestId, Guid approverId)
        {
            var request = await _dbContext.ResignationRequests.FirstOrDefaultAsync(x => x.Id == requestId);
            if (request == null)
                return new ResponseMessage { Success = false, Message = "Could not find Request" };

            request.IsApproved = true;
            request.ApproverId = approverId;
            request.ApprovedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Successfully" };
  
        }

        public async Task<List<ApprovedResignationListDto>> ApprovedResignationListDto()
        {
            return await _dbContext.ResignationRequests.Include(x => x.Employee).Include(x => x.Approver)
                                     .AsNoTracking().Where(x => x.IsApproved && !x.IsTerminated).Select(x =>
                              new ApprovedResignationListDto
                              {
                                  Id = x.Id,
                                  EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                  ApprovedDate = x.ApprovedDate,
                                  ApproverEmployee = $"{x.Approver.FirstName} {x.Approver.MiddleName} {x.Approver.LastName}",
                              }).ToListAsync();
        }

        public async Task<ResponseMessage> TerminateRequester(Guid requestId)
        {
            var request = await _dbContext.ResignationRequests.FirstOrDefaultAsync(x => x.Id == requestId && !x.IsTerminated);
            if (request == null)
                return new ResponseMessage { Success = false, Message = "Could not find Request" };
            var empReqst = await _dbContext.EmploymentDetails.FirstOrDefaultAsync(x => x.EmployeeId == request.EmployeeId && x.Rowstatus == RowStatus.ACTIVE);

            if (empReqst == null)
                return new ResponseMessage { Success = false, Message = "Could not find Current Position and Department" };

            var currentEmp = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == empReqst.EmployeeId);
            if(currentEmp == null)
                return new ResponseMessage { Success = false, Message = "Could not find employee" };


            request.IsTerminated = true;

            empReqst.EndDate = DateTime.Now;
            empReqst.EmploymentStatus = EmploymentStatus.RESIGNED;
            empReqst.Remark = request.ReasonForResignation;

            currentEmp.EmploymentStatus = EmploymentStatus.RESIGNED;
            currentEmp.TerminatedDate = DateTime.Now;
            
          
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Successfully" };

        }

        public async Task<List<TerminatedEmployeesDto>> TerminatedEmployeesList()
        {
            return await _dbContext.EmploymentDetails.Include(x => x.Employee)
                                      .Include(x => x.Department).Include(x => x.Position)
                                     .AsNoTracking().Where(x => x.Rowstatus == RowStatus.ACTIVE && x.EmploymentStatus == EmploymentStatus.TERMINATED || x.EmploymentStatus == EmploymentStatus.RESIGNED).Select(x =>
                              new TerminatedEmployeesDto
                              {
                                  Id = x.Id,
                                  Department = x.Department.DepartmentName,
                                  Position = x.Position.PositionName,
                                  FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                  TerminatedDate = x.EndDate,
                                  TerminationReason = x.EmploymentStatus.ToString(),
                                  Remark = x.Remark
                              }).ToListAsync();
        }

        public async Task<ResponseMessage> TerminateEmployee(Guid employementDetailId, string remark, bool blacListed)
        {
            var empReqst = await _dbContext.EmploymentDetails.FirstOrDefaultAsync(x => x.EmployeeId == employementDetailId && x.Rowstatus == RowStatus.ACTIVE);

            if (empReqst == null)
                return new ResponseMessage { Success = false, Message = "Could not find Current Position and Department" };

            var currentEmp = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == empReqst.EmployeeId);
            if (currentEmp == null)
                return new ResponseMessage { Success = false, Message = "Could not find employee" };


            empReqst.EndDate = DateTime.Now;
            empReqst.EmploymentStatus = EmploymentStatus.TERMINATED;
            empReqst.IsBlackListed = blacListed;
            empReqst.Remark = remark;

            currentEmp.EmploymentStatus = EmploymentStatus.RESIGNED;
            currentEmp.TerminatedDate = DateTime.Now;


            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Termination Requested Successfully" };

        }
    }
}
