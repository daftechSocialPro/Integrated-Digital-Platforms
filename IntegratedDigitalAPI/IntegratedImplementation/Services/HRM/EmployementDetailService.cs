﻿using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployementDetailService : IEmployementDetailService
    {
        private readonly ApplicationDbContext _dbContext;
        private IGeneralConfigService _generalConfig;
        private IEmailService _emailService;
        private readonly IEmployeeSeveranceService _employeeSeveranceService;

        public EmployementDetailService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IEmailService emailService, IEmployeeSeveranceService employeeSeveranceService)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _emailService = emailService;
            _employeeSeveranceService = employeeSeveranceService;
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
            if (currentEmp == null)
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
                                  IsBlackListed = x.IsBlackListed,
                                  HasSeverance = x.HasSeverance,
                                  TotalSeveranceAmount = x.TotalSeveranceAmount,
                                  TerminationReason = x.EmploymentStatus.ToString(),
                                  Remark = x.Remark
                              }).ToListAsync();
        }

        public async Task<ResponseMessage> TerminateEmployee(Guid employementDetailId, string remark, bool blacListed, bool hasSeverance)
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
            empReqst.HasSeverance = hasSeverance;

            if (hasSeverance)
            {
                empReqst.TotalSeveranceAmount = await _employeeSeveranceService.GetEmployeeSeverance(empReqst.EmployeeId);
            }
            empReqst.Remark = remark;

            currentEmp.EmploymentStatus = EmploymentStatus.TERMINATED;
            currentEmp.TerminatedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();

            var email = new EmailMetadata
                   (currentEmp.Email, "Notice for Termination",
                       $"Dear {currentEmp.FirstName} {currentEmp.MiddleName} {currentEmp.LastName} \n You have been  terminated from your current job." +
                       $" Please come to the office and finish your termination \n regards ");
            await _emailService.Send(email);

            return new ResponseMessage { Success = true, Message = "Termination Requested Successfully" };

        }

        public async Task<List<EmployeeSupervisorsDto>> GetEmployeeSupervisors()
        {
            return await _dbContext.EmployeeSupervisors.Include(x => x.Employee)
                                     .Include(x => x.Supervisor).Include(x => x.SecondSupervisor)
                                    .AsNoTracking().Select(x =>
                             new EmployeeSupervisorsDto
                             {
                                 Id = x.Id,
                                 EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                 ImmidiateSupervisor = $"{x.Supervisor.FirstName} {x.Supervisor.MiddleName} {x.Supervisor.LastName}",
                                 SecondSupervisor = $"{x.SecondSupervisor.FirstName} {x.SecondSupervisor.MiddleName} {x.SecondSupervisor.LastName}",
                             }).ToListAsync();
        }

        public async Task<List<SelectListDto>> GetToBeSupervisedEmployees()
        {
            var EmployeeSelectList = await (from e in _dbContext.Employees
                                            where !(_dbContext.EmployeeSupervisors.Select(x => x.EmployeeId).Contains(e.Id))
                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = $"{e.FirstName} {e.MiddleName} {e.LastName}"

                                            }).ToListAsync();

            return EmployeeSelectList;
        }

        public async Task<EmployeeSupervisorsDto> GetSupervisorsByEmployee(Guid employeeId)
        {
            var supervisor = await _dbContext.EmployeeSupervisors.Include(x => x.Employee)
                                    .Include(x => x.Supervisor).Include(x => x.SecondSupervisor)
                                   .AsNoTracking().Where(x => x.EmployeeId == employeeId).Select(x =>
                            new EmployeeSupervisorsDto
                            {
                                Id = x.Id,
                                EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                ImmidiateSupervisor = $"{x.Supervisor.FirstName} {x.Supervisor.MiddleName} {x.Supervisor.LastName}",
                                SecondSupervisor = $"{x.SecondSupervisor.FirstName} {x.SecondSupervisor.MiddleName} {x.SecondSupervisor.LastName}",
                            }).FirstOrDefaultAsync();

            if (supervisor != null)
                return supervisor;

            return new EmployeeSupervisorsDto();
        }

        public async Task<ResponseMessage> AssignSupervisor(AssignSupervisorDto assignSupervisor)
        {
            var exists = await _dbContext.EmployeeSupervisors.AnyAsync(x => x.EmployeeId == assignSupervisor.EmployeeId);
            if (exists)
                return new ResponseMessage { Success = false, Message = "Employee Already Exists" };

            EmployeeSupervisors employee = new EmployeeSupervisors()
            {
                Id = Guid.NewGuid(),
                CreatedById = assignSupervisor.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = assignSupervisor.EmployeeId,
                SecondSupervisorId = assignSupervisor.SecondSuprvisorId,
                SupervisorId = assignSupervisor.SupervisorId,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.EmployeeSupervisors.AddAsync(employee);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Assigned Successfully!" };
        }

        public async Task<ResponseMessage> DeleteSupervisee(Guid employeeId)
        {
            var exists = await _dbContext.EmployeeSupervisors.FirstOrDefaultAsync(x => x.EmployeeId == employeeId);
            if (exists == null)
                return new ResponseMessage { Success = false, Message = "Employee Could Not be found" };

            _dbContext.EmployeeSupervisors.Remove(exists);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Deleted Successfully!!" };
        }

        public async Task<List<EmployeeDisciplinaryListDto>> GetEmployeeDisciplinaries()
        {
            var EmployeeSelectList = await (from e in _dbContext.Employees

                                           where e.EmployeeDisplinaryCases.Any()
                                           select new EmployeeDisciplinaryListDto
                                           {
                                               EmployeeId = e.Id,
                                               EmployeeName = $"{e.FirstName} {e.MiddleName} {e.LastName}",
                                               ImagePath = e.ImagePath,
                                               TotalWarnings = e.EmployeeDisplinaryCases.Count(),
                                               DisciplinaryCaseLists = e.EmployeeDisplinaryCases.Select(x =>  new DisciplinaryCaseListDto
                                               {
                                                   Id = x.Id,
                                                   ApprovedDate = x.ApprovedDate,
                                                   ApproverEmployee = $"{x.ApprovedBy.FirstName} {x.ApprovedBy.MiddleName} {x.ApprovedBy.LastName}",
                                                   Date = x.Date,
                                                   Fault = x.Fault,
                                                   DetailDescription = x.DetailDescription,
                                                   WarningType = x.WarningType.ToString(),
                                               }).ToList()
                                           }).ToListAsync();


            return EmployeeSelectList;
        }

        public async Task<ResponseMessage> AddDisciplinaryCase(AddDisciplinaryCaseDto addDisciplinary)
        {
            EmployeeDisciplinaryCase disciplinaryCase = new EmployeeDisciplinaryCase()
            {
                Id = Guid.NewGuid(),
                CreatedById = addDisciplinary.CreatedById,
                CreatedDate = DateTime.Now,
                Date = addDisciplinary.Date,
                DetailDescription = addDisciplinary.DetailDescription,
                EmployeeId = addDisciplinary.EmployeeId,
                Fault = addDisciplinary.Fault,
                WarningType = addDisciplinary.WarningType,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.EmployeeDisciplinaryCases.AddAsync(disciplinaryCase);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Registered Successfully" };
        }

        public async Task<ResponseMessage> ApproveCase(ApproveDisciplinaryCase approveDisplinary)
        {
            var currentCase = await _dbContext.EmployeeDisciplinaryCases.FirstOrDefaultAsync(x => x.Id == approveDisplinary.Id);
            if (currentCase == null)
                return new ResponseMessage { Success = false, Message = "Could not find case!!" };

            currentCase.ApprovedById = approveDisplinary.ApproverId;
            currentCase.ApprovedDate = DateTime.Now;

            await _dbContext.SaveChangesAsync();
            return new ResponseMessage { Success = true, Message = "Approved Successfully!!" };
        }

        public async Task<List<EmployeeBenefitListDto>> GetEmployeeBenefits(Guid employeeId)
        {
            return await _dbContext.EmployeeBenefits.AsNoTracking().Include(x => x.Benefit)
                           .Where(x => x.EmployeeId == employeeId).Select(x => new EmployeeBenefitListDto
                           {
                               Id = x.Id,
                               TypeofBenefit = x.TypeOfBenefit.ToString(),
                               BenefitName = x.Benefit.Name,
                               Amount = x.Amount,
                               Recursive = x.Recursive,
                               AllowanceEndDate = x.AllowanceEndDate
                           }).ToListAsync();
        }

        public async Task<ResponseMessage> AddEmployeeBenefit(AddEmployeeBenefitDto addBenefit)
        {

            if (addBenefit.TypeOfBenefit == TypeOfBenefit.PERCENTILE && addBenefit.Ammount > 100)
                return new ResponseMessage { Success = false, Message = "Value can not be greater than 100" };

            var exists = await _dbContext.EmployeeBenefits.AnyAsync(x => x.EmployeeId == addBenefit.EmployeeId && x.BenefitId == addBenefit.BenefitListId);
            if (exists)
            {
                return new ResponseMessage { Success = false, Message = "The benefit already Exists" };
            }

            EmployeeBenefits emp = new EmployeeBenefits
            {
                Id = Guid.NewGuid(),
                CreatedById = addBenefit.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = addBenefit.EmployeeId,
                Amount = addBenefit.Ammount,
                BenefitId = addBenefit.BenefitListId,
                TypeOfBenefit = addBenefit.TypeOfBenefit,
                Recursive = addBenefit.Recursive,
                AllowanceEndDate = addBenefit.AllowanceEndDate,
                Rowstatus = RowStatus.ACTIVE,

            };

            var benefitTaxableAmount = await _dbContext.BenefitLists.Where(x => x.Id == emp.BenefitId).Select(x => x.TaxableAmount).FirstOrDefaultAsync();
            if (emp.Amount > benefitTaxableAmount)
            {
                emp.Taxable = true;
            }

            await _dbContext.EmployeeBenefits.AddAsync(emp);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Successfully added Employee Benefit" };
        }

        public async Task<ResponseMessage> DeleteEmployeeBenefit(Guid benefitId)
        {
            var empBenefit = await _dbContext.EmployeeBenefits.FindAsync(benefitId);

            if (empBenefit == null)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Employee Benefit Not Found!!!"
                };
            }

            _dbContext.EmployeeBenefits.Remove(empBenefit);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Success = true,
                Message = "Employee Benefit Deleted Successfully!!!"
            };
        }

        public async Task<ResponseMessage> RehireEmployee(RehireEmployeeDto rehireEmployee)
        {
            var curEmployee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == rehireEmployee.EmployeeId);

            if (curEmployee == null)
                return new ResponseMessage { Success = false, Message = "Employee Could not be found" };

            var currentHistories = await _dbContext.EmploymentDetails.Where(x => x.EmployeeId == rehireEmployee.EmployeeId && x.Rowstatus == RowStatus.ACTIVE).ToListAsync();

            currentHistories.ForEach(x =>
            {
                x.Rowstatus = RowStatus.INACTIVE;
            });

            await _dbContext.SaveChangesAsync();

            curEmployee.IsApproved = false;
            curEmployee.EmploymentStatus = EmploymentStatus.ACTIVE;
            curEmployee.ContractEndDate = curEmployee.ContractEndDate;
            curEmployee.EmploymentType = rehireEmployee.EmploymentType;

            EmploymentDetail newDetail = new EmploymentDetail()
            {
                Id = Guid.NewGuid(),
                EmploymentStatus = curEmployee.EmploymentStatus,
                CreatedById = rehireEmployee.CreatedById,
                CreatedDate = DateTime.Now,
                DepartmentId = rehireEmployee.DepartmentId,
                EmployeeId = rehireEmployee.EmployeeId,
                PositionId = rehireEmployee.PositionId,
                Remark = rehireEmployee.Remark,
                Salary = rehireEmployee.Salary,
                SourceOfSalary = rehireEmployee.SourceOfSalary,
                EndDate = rehireEmployee.ContractEndDate,
                StartDate = rehireEmployee.EmploymentDate,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.EmploymentDetails.AddAsync(newDetail);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Employee Added Succesfully" };

        }

        public async Task<List<ContractEndEmployeesDto>> GetContractEndEmployees()
        {
            var currentEmps = await _dbContext.EmploymentDetails.Include(x => x.Employee)
                                    .AsNoTracking().Where(x => DateTime.Now.AddMonths(1) >= x.EndDate && x.Rowstatus == RowStatus.ACTIVE)
                                    .Select(x => new ContractEndEmployeesDto
                                    {
                                        EmployeeId = x.EmployeeId,
                                        StartDate = x.StartDate,
                                        EndDate = x.EndDate,
                                        FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                                        RemainingDays = x.EndDate.HasValue ? Convert.ToInt32(x.EndDate.Value.Subtract(DateTime.Now).TotalDays) : 0
                                    }).ToListAsync();

            return currentEmps;
        }

        public async Task<ResponseMessage> ExtendContract(ExtendContractDto extendContract)
        {
            var currentEmployee = await _dbContext.Employees.AnyAsync(x => x.Id == extendContract.EmployeeId);
            if(!currentEmployee)
            {
                return new ResponseMessage { Success = false, Message = "Could not find Employee" };
            }

            var employementDetail = await _dbContext.EmploymentDetails.FirstOrDefaultAsync(x => x.EmployeeId == extendContract.EmployeeId && x.Rowstatus == RowStatus.ACTIVE);

            if(employementDetail == null)
            {
                return new ResponseMessage { Success = false, Message = "Employement Detail is not correct" };
            }

            var employees = await _dbContext.ContractExtentionEmployees
                     .Where(x => x.EmploymentDetailId == employementDetail.Id && x.Rowstatus == RowStatus.ACTIVE)
                     .ToListAsync();

            foreach (var employee in employees)
            {
                employee.Rowstatus = RowStatus.INACTIVE;
            }

            await _dbContext.SaveChangesAsync();

            ContractExtentionEmployee contractExtention = new ContractExtentionEmployee()
            {
                Id = Guid.NewGuid(),
                CreatedById = extendContract.CreatedById,
                CreatedDate = DateTime.Now,
                EmploymentDetailId = employementDetail.Id,
                PreviousStartDate = employementDetail.StartDate,
                PreviousEndDate = employementDetail.EndDate,
                Rowstatus = RowStatus.ACTIVE,
                Remark = extendContract.Remark
            };

            await _dbContext.ContractExtentionEmployees.AddAsync(contractExtention);
            employementDetail.StartDate = extendContract.StartDate;
            employementDetail.EndDate = extendContract.EndDate;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Contract Extended Succesfully!!" };
        } 
        
        
        public async Task<ContractExtentionLetterDto> GetContractExtentionLetter(Guid employeeId)
        {
            var currentEmployee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == employeeId);
            if(currentEmployee == null)
            {
                return new ContractExtentionLetterDto();
            }

            var employementDetail = await _dbContext.EmploymentDetails.Include(x => x.Position).FirstOrDefaultAsync(x => x.EmployeeId == employeeId && x.Rowstatus == RowStatus.ACTIVE);

            if(employementDetail == null)
            {
                return new ContractExtentionLetterDto();
            }

            var history = await _dbContext.ContractExtentionEmployees.Where(x => x.EmploymentDetailId == employementDetail.Id && x.Rowstatus == RowStatus.ACTIVE).FirstOrDefaultAsync();
            if(history == null)
            {
                return new ContractExtentionLetterDto();
            }

            ContractExtentionLetterDto contractExtentionLetter = new ContractExtentionLetterDto()
            {
                EmployeeName = $"{currentEmployee.FirstName} {currentEmployee.MiddleName} {currentEmployee.LastName}",
                Position = employementDetail.Position.PositionName,
                PreviousStartDate = history.PreviousStartDate,
                PreviousEndDate = history.PreviousEndDate,
                StartDate = employementDetail.StartDate,
                EndDate = employementDetail.EndDate,
                TodaysDate = DateTime.Now,

            };

            return contractExtentionLetter;
        }
    }
}
