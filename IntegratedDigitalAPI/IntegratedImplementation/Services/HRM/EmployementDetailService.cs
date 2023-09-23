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

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Successfully" };

                
        }

        public Task<ResponseMessage> ApproveResignationRequest(Guid requestId)
        {
            throw new NotImplementedException();
        }
    }
}
