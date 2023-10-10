using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Helper;
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
    public class LeaveManagementService : ILeaveManagementService
    {
        private readonly IEmailService _emialService;
        private readonly ApplicationDbContext _dbContext;
        public LeaveManagementService(ApplicationDbContext dbContext ,IEmailService emailService)
        {
            _dbContext = dbContext;
            _emialService = emailService;
        }

        public async Task<ResponseMessage> AddLeaveBalance(AddLeaveBalanceDto addLeaveBalance)
        {
            var currEmployee = await _dbContext.Employees.AnyAsync(x => x.Id == addLeaveBalance.EmployeeId && x.ExistingEmployee);

            if (!currEmployee)
                return new ResponseMessage { Success = false, Message = "You can not add leave balance for the employee!!" };

            var currentLeave = await _dbContext.LeaveBalances.AnyAsync(x => x.EmployeeId == addLeaveBalance.EmployeeId);
            if(currentLeave)
                return new ResponseMessage { Success = false, Message = "Leave Balance already Exists" };

            LeaveBalance balance = new LeaveBalance()
            {
                Id = Guid.NewGuid(),
                CreatedById = addLeaveBalance.CreatedById,
                CreatedDate = DateTime.Now,
                CurrentBalance = addLeaveBalance.CurrentBalance,
                EmployeeId = addLeaveBalance.EmployeeId,
                LeavesTaken = addLeaveBalance.LeavesTaken,
                PreviousBalance = addLeaveBalance.PreviousBalance,
                PreviousExpDate = addLeaveBalance.PreviousExpDate,
                TotalBalance = addLeaveBalance.CurrentBalance + addLeaveBalance.PreviousBalance,
            };

            await _dbContext.AddAsync(balance);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Leave Balance Added Succesfully" };
        }

        public async Task<ResponseMessage> AddLeaveRequest(LeaveRequestDto leaveRequestDto)
        {
            int availableLeaveDate = 0;
            var leaveType = await _dbContext.LeaveTypes.FirstOrDefaultAsync(x => x.Id.Equals(leaveRequestDto.LeaveTypeId));
            var DayoffCount = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.NUMBEROFDAYOFFS);
            if (leaveType == null || DayoffCount == null)
                return new ResponseMessage
                {
                    Message = "Leave Type could not be found or Day off setting has not been set!!",
                    Success = false
                };

            if (leaveType.MinDate > leaveType.MaxDate)
                availableLeaveDate = leaveType.MinDate;
            else
                availableLeaveDate = Convert.ToInt32(leaveType.MaxDate);

            var currentLeaves = await _dbContext.EmployeeLeaves.Where(x =>
                                x.EmployeeId.Equals(leaveRequestDto.EmployeeId)
                                && x.LeaveTypeId.Equals(leaveType.Id) && x.ToDate.Year.Equals(DateTime.Now.Year)).SumAsync(x => x.TotalDate);


            if (leaveType.LeaveCategory == LeaveCategory.ANNUAL)
            {
                var annualLeave = await _dbContext.LeaveBalances.FirstOrDefaultAsync(x => x.EmployeeId.Equals(leaveRequestDto.EmployeeId));
                if (annualLeave == null)
                {
                    return new ResponseMessage
                    {
                        Message = "No balance for annual leave!!",
                        Success = false
                    };
                }
                else if (annualLeave.TotalBalance <= leaveRequestDto.TotalDate + currentLeaves)
                {
                    return new ResponseMessage
                    {
                        Message = "Remaining Annual leave balance is " + annualLeave.TotalBalance + " !!",
                        Success = false
                    };
                }
            }
            else if (availableLeaveDate < currentLeaves + leaveRequestDto.TotalDate)
            {
                return new ResponseMessage
                {
                    Message = "No balance for the requested leave!!",
                    Success = false
                };
            }

            var Holiday = await _dbContext.Holidays.Where(x => x.Date >= leaveRequestDto.FromDate && x.Date <= leaveRequestDto.FromDate.AddDays(leaveRequestDto.TotalDate)).CountAsync();


            var dayoffs = (leaveRequestDto.TotalDate / 7) * DayoffCount.Value;

            EmployeeLeave empLeave = new EmployeeLeave
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = leaveRequestDto.CreatedById,
                Rowstatus = RowStatus.ACTIVE,
                EmployeeId = leaveRequestDto.EmployeeId,
                FromDate = leaveRequestDto.FromDate,
                ToDate = leaveRequestDto.FromDate.AddDays(Holiday + dayoffs + leaveRequestDto.TotalDate),
                TotalDate = leaveRequestDto.TotalDate,
                LeaveTypeId = leaveRequestDto.LeaveTypeId,
                LeaveStatus = LeaveRequestStatus.PENDING,
                Reason = leaveRequestDto.Reason,
            };

            await _dbContext.EmployeeLeaves.AddAsync(empLeave);
            await _dbContext.SaveChangesAsync();

            var employeeApprovers = _dbContext.UserRoles.Where(x => x.RoleId == "8").Select(x => x.UserId).ToList();

            foreach (var employeeApprover in employeeApprovers)
            {
                var user = _dbContext.Users.Find(employeeApprover);

                if (user != null)
                {
                    var emp = _dbContext.Employees.Find(leaveRequestDto.EmployeeId);
                    if (emp != null) { }
                    var email = new EmailMetadata
                             (emp.Email, "Leave Approval",
                                 $"Dear {user.UserName},\n\nEmployee {emp.FirstName} {emp.MiddleName} {emp.LastName} has been requsted a leave from :{empLeave.FromDate} - To :{empLeave.ToDate}." +
                                 $" Please review the employee details and provide your approval.\n\nThank you.\n\nSincerely,\nEMIA");
                    await _emialService.Send(email);
                } }
        

            return new ResponseMessage
            {
                Data = empLeave,
                Message = "Request Added Successfully",
                Success = true
            };
        }

        public async Task<ResponseMessage> ApproveRequest(Guid leaveId, Guid employeeId)
        {
            var currentRequest = await _dbContext.EmployeeLeaves.Include(x=>x.LeaveType).FirstOrDefaultAsync(x => x.Id == leaveId && x.LeaveStatus == LeaveRequestStatus.PENDING);
            if (currentRequest == null)
                return new ResponseMessage { Success = false, Message = "Request Could not be found" };

            var leaveBalance = await _dbContext.LeaveBalances.FirstOrDefaultAsync(x => x.EmployeeId == currentRequest.EmployeeId);
            if (leaveBalance == null && currentRequest.LeaveType.LeaveCategory == LeaveCategory.ANNUAL)
            {
                return new ResponseMessage { Success = false, Message = "Please Manage the leave balance of the employee!!" };
            }
            else if (leaveBalance != null && currentRequest.LeaveType.LeaveCategory == LeaveCategory.ANNUAL)
            {
                if(leaveBalance.TotalBalance < currentRequest.TotalDate)
                {
                    return new ResponseMessage { Success = false, Message = "No leave balance found!!" };
                }
                else if(leaveBalance.PreviousBalance < currentRequest.TotalDate)
                {
                    var totDate = currentRequest.TotalDate - leaveBalance.PreviousBalance;
                    leaveBalance.PreviousBalance = 0;
                    leaveBalance.CurrentBalance -= totDate;
                }
                else
                {
                    leaveBalance.CurrentBalance -= currentRequest.TotalDate;
                }

                leaveBalance.TotalBalance -= currentRequest.TotalDate; 
                leaveBalance.LeavesTaken += currentRequest.TotalDate;
                await _dbContext.SaveChangesAsync();
            }
            currentRequest.LeaveStatus = LeaveRequestStatus.APPROVED;
            currentRequest.ApprovedDate = DateTime.Now;
            currentRequest.ApproverEmployeeId = employeeId;

            await _dbContext.SaveChangesAsync();

            
                var emp = _dbContext.Employees.Find(currentRequest.EmployeeId);
                if (emp != null) { }
                var email = new EmailMetadata
                         (emp.Email, "Leave Approved",
                             $"Dear {emp.FirstName} {emp.MiddleName} {emp.LastName},\n\n the Leave approval request that you sent has been accepted.\n\nThank you.\n\nSincerely,\nEMIA");
                await _emialService.Send(email);
            

            return new ResponseMessage { Success = true, Message = "Approved Request Successfully" };
        }

       

        public async Task<List<LeavesTakenDto>> GetEmployeeLeaves(Guid employeeId)
        {
            return await _dbContext.EmployeeLeaves.Include(x => x.Employee).Include(x => x.LeaveType).AsNoTracking()
                          .Where(x => x.EmployeeId == employeeId)
                          .Select(x => new LeavesTakenDto
                          {
                              Id = x.Id,
                              FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                              BackToWorkOn = x.ToDate,
                              EmployeeId = x.EmployeeId,
                              LeaveDate = x.FromDate,
                              TypeOfLeave = x.LeaveType.Name,
                              LeaveStatus = x.LeaveStatus.ToString(),
                              Reason = x.Reason,
                              Remark = x.Remark
                          }).ToListAsync();
        }

        public async Task<List<LeavesTakenDto>> GetLeaveRequests()
        {
            return await _dbContext.EmployeeLeaves.Include(x => x.Employee).Include(x => x.LeaveType).AsNoTracking()
                          .Where(x => x.LeaveStatus == LeaveRequestStatus.PENDING)
                          .Select(x => new LeavesTakenDto
                          {
                              Id = x.Id,
                              FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                              BackToWorkOn = x.ToDate,
                              EmployeeId= x.EmployeeId,
                              LeaveDate = x.FromDate,
                              TypeOfLeave = x.LeaveType.Name,
                              LeaveStatus = x.LeaveStatus.ToString(),
                              Reason = x.Reason,
                              Remark = x.Remark
                          }).ToListAsync();
        }

      public async  Task<LeavesTakenDto> GetSingleRequest(Guid Id)
        {
            var request = await _dbContext.EmployeeLeaves.Include(x => x.Employee).Include(x => x.LeaveType).AsNoTracking()
                      .Where(x => x.Id == Id)
                      .Select(x => new LeavesTakenDto
                      {
                          Id = x.Id,
                          FullName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                          BackToWorkOn = x.ToDate,
                          EmployeeId = x.EmployeeId,
                          LeaveDate = x.FromDate,
                          TypeOfLeave = x.LeaveType.Name,
                          Reason = x.Reason,
                          Remark = x.Remark,
                          LeaveStatus = x.LeaveStatus.ToString()
                      }).ToListAsync();

            if (request!=null)
            {
                return  request.FirstOrDefault();
            }
            else
            {
                return new LeavesTakenDto();
            }



        }

        public async Task<ResponseMessage> RejectRequest(Guid leaveId, string remark)
        {
            var currentRequest = await _dbContext.EmployeeLeaves.FirstOrDefaultAsync(x => x.Id == leaveId && x.LeaveStatus == LeaveRequestStatus.PENDING);
            if (currentRequest == null)
                return new ResponseMessage { Success = false, Message = "Request Could not be found" };
            currentRequest.LeaveStatus = LeaveRequestStatus.REJECTED;
            currentRequest.Remark = remark;

            await _dbContext.SaveChangesAsync();

            var emp = _dbContext.Employees.Find(currentRequest.EmployeeId);
            if (emp != null) { }
            var email = new EmailMetadata
                     (emp.Email, "Leave Rejected",
                         $"Dear {emp.FirstName} {emp.MiddleName} {emp.LastName},\n\n the Leave approval request that you sent has been rejected.\n\nThank you.\n\nSincerely,\nEMIA");
            await _emialService.Send(email);

            return new ResponseMessage { Success = true, Message = "Rejected Request Successfully" };
        }

        public async Task<AnnualLeaveBalanceDto> GetAnnualLeaveBalance(Guid employeeId)
        {
            var leaveBalance = await _dbContext.LeaveBalances.AsNoTracking()
                        .Where(x => x.EmployeeId == employeeId)
                        .Select(x => new AnnualLeaveBalanceDto
                        {
                            CurrentBalance = x.CurrentBalance,
                            LeavesTaken = x.LeavesTaken,
                            PreviousBalance = x.PreviousBalance,
                            PreviousExpDate = x.PreviousExpDate,
                            TotalBalance = x.TotalBalance
                        }).FirstOrDefaultAsync();

            if (leaveBalance == null)
                return new AnnualLeaveBalanceDto();

            return leaveBalance;

        }
    }
}
