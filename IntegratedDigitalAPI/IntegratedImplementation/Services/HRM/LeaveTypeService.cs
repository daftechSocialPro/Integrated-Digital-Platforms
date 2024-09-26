using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
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
    public class LeaveTypeService : ILeaveTypeService
    {
        private readonly ApplicationDbContext _dbContext;

        public LeaveTypeService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddLeaveType(LeaveTypePostDto LeaveTypePost)
        {
            try
            {

                var exists = await _dbContext.LeaveTypes.AnyAsync(x => x.Name == LeaveTypePost.Name);

                if (exists)
                    return new ResponseMessage { Success = false, Message = "Leave Type already exists" };

                if (Enum.Parse<LeaveCategory>(LeaveTypePost.LeaveCategory) == LeaveCategory.ANNUAL)
                {
                    var anualExist = await _dbContext.LeaveTypes.AnyAsync(x => x.LeaveCategory == LeaveCategory.ANNUAL);

                    if (anualExist)
                        return new ResponseMessage { Success = false, Message = "Leave Type already exists" };
                }


                LeaveType LeaveType = new LeaveType
                {
                    Id = Guid.NewGuid(),
                    Name = LeaveTypePost.Name,
                    AmharicName = LeaveTypePost.AmharicName,
                    LeaveCategory = Enum.Parse<LeaveCategory>(LeaveTypePost.LeaveCategory),
                    MinDate = LeaveTypePost.MinDate,
                    MaxDate = LeaveTypePost.MaxDate,
                    IncrementValue = LeaveTypePost.IncrementValue,
                    CreatedById = LeaveTypePost.CreatedById,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.LeaveTypes.AddAsync(LeaveType);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Data = LeaveType,
                    Message = "Leave TypeAdded Successfully",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = false
                };
            }
        }


        public async Task<List<LeaveTypeGetDto>> GetLeaveTypeList()
        {
            var LeaveTypeList = await _dbContext.LeaveTypes.AsNoTracking().Select(x => new LeaveTypeGetDto
            {
                Id = x.Id,
                Name = x.Name,
                AmharicName = x.AmharicName,
                LeaveCategory = x.LeaveCategory.ToString(),
                MinDate = x.MinDate,
                MaxDate = x.MaxDate,
                IncrementValue = x.IncrementValue,
                LeaveDetailLists = _dbContext.LeaveTypeDetails.Include(t => t.TakeFromLeaveType).Where(y => y.LeaveTypeId == x.Id).Select(z => new LeaveDetailListDto
                {
                    Id = z.Id,
                    LeaveType = z.TakeFromLeaveType.Name,
                    Order = z.order
                }).ToList()

            }).ToListAsync();

            return LeaveTypeList;
        }




        public async Task<ResponseMessage> UpdateLeaveType(LeaveTypeGetDto LeaveType)
        {

            try
            {

                var exists = await _dbContext.LeaveTypes.AnyAsync(x => x.Name == LeaveType.Name && x.Id != LeaveType.Id);

                if (exists)
                    return new ResponseMessage { Success = false, Message = "Leave Type already exists" };


                if (Enum.Parse<LeaveCategory>(LeaveType.LeaveCategory) == LeaveCategory.ANNUAL)
                {
                    var anualExist = await _dbContext.LeaveTypes.AnyAsync(x => x.LeaveCategory == LeaveCategory.ANNUAL && x.Id != LeaveType.Id);

                    if (anualExist)
                        return new ResponseMessage { Success = false, Message = "Leave Type already exists" };
                }

                var currentLeaveType = await _dbContext.LeaveTypes.FirstOrDefaultAsync(x => x.Id.Equals(LeaveType.Id));

                if (currentLeaveType != null)
                {
                    currentLeaveType.Name = LeaveType.Name;
                    currentLeaveType.AmharicName = LeaveType.AmharicName;
                    currentLeaveType.LeaveCategory = Enum.Parse<LeaveCategory>(LeaveType.LeaveCategory);
                    currentLeaveType.MinDate = LeaveType.MinDate;
                    currentLeaveType.MaxDate = LeaveType.MaxDate;
                    currentLeaveType.IncrementValue = LeaveType.IncrementValue;
                    await _dbContext.SaveChangesAsync();
                    return new ResponseMessage { Data = currentLeaveType, Success = true, Message = "Updated Successfully" };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find LeaveType" };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = false
                };
            }
        }


        public async Task<ResponseMessage> AddLeaveDetail(AddLeaveDetailDto addLeaveDetail)
        {
            if(addLeaveDetail.LeaveTypeId == addLeaveDetail.TakeFromLeaveTypeId)
                return new ResponseMessage { Success = false, Message = "You can not take from the same leave type" };

            var currentDetail = await _dbContext.LeaveTypeDetails.AnyAsync(x => x.LeaveTypeId == addLeaveDetail.LeaveTypeId && (x.order == addLeaveDetail.Order || x.TakeFromLeaveTypeId == addLeaveDetail.TakeFromLeaveTypeId));
            if (currentDetail)
                return new ResponseMessage { Success = false, Message = "Order or leave type already exists" };

            LeaveTypeDetails leaveType = new LeaveTypeDetails()
            {
                Id = Guid.NewGuid(),
                CreatedById = addLeaveDetail.CreatedById,
                CreatedDate = DateTime.Now,
                LeaveTypeId = addLeaveDetail.LeaveTypeId,
                TakeFromLeaveTypeId = addLeaveDetail.TakeFromLeaveTypeId,
                order = addLeaveDetail.Order,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.LeaveTypeDetails.AddAsync(leaveType);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully!!" };
        }

        public async Task<ResponseMessage> UpdateLeaveDetail(UpdateLeaveDetailDto updateLeaveDetail)
        {
            if (updateLeaveDetail.LeaveTypeId == updateLeaveDetail.TakeFromLeaveTypeId)
                return new ResponseMessage { Success = false, Message = "You can not take from the same leave type" };

            var currentLeave = await _dbContext.LeaveTypeDetails.FirstOrDefaultAsync(x => x.Id == updateLeaveDetail.Id);
            if (currentLeave == null)
                return new ResponseMessage { Success = false, Message = "Could not find leave detail" };

            var exists = await _dbContext.LeaveTypeDetails.AnyAsync(x => x.LeaveTypeId == currentLeave.LeaveTypeId && x.order == updateLeaveDetail.Order && x.Id != currentLeave.Id);
            if (exists)
                return new ResponseMessage { Success = false, Message = "Order already exists" };

            currentLeave.TakeFromLeaveTypeId = updateLeaveDetail.TakeFromLeaveTypeId;
            currentLeave.order = updateLeaveDetail.Order;

            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Updated Successfully" };
           
        }

        public async Task<List<LeavePlanSettingGetDto>> GetEmployeeLeavePlan(Guid employeeId)
        {
            var employeeLeavePlan = await _dbContext.LeavePlanSetting.Include(x => x.Employee.EmployeeDetail).ThenInclude(x=>x.Department).Where(x=>x.EmployeeId==employeeId).OrderByDescending(x => x.CreatedDate).Select(x => new LeavePlanSettingGetDto
            {
                Id = x.Id,
                FromDate = x.FromDate,
                ToDate = x.ToDate,
                EmployeeId = x.EmployeeId,
                Rejectedremark = x.Rejectedremark,
                LeavePlanSettingStatus = x.LeavePlanSettingStatus.ToString(),
                EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                Department = x.Employee.EmployeeDetail != null ? $"{x.Employee.EmployeeDetail.FirstOrDefault().Department.DepartmentName}":"",

            }).ToListAsync();
            return employeeLeavePlan;
        }
        public async Task<List<LeavePlanSettingGetDto>> GetEmployeeLeavePlans()
        {
            var employeeLeavePlan = await _dbContext.LeavePlanSetting
                .Where(x=>x.LeavePlanSettingStatus == LeavePlanSettingStatus.REQUESTED)
                .Include(x => x.Employee.EmployeeDetail).ThenInclude(x => x.Department).OrderByDescending(x => x.CreatedDate).Select(x => new LeavePlanSettingGetDto
            {
                Id = x.Id,
                FromDate = x.FromDate,
                ToDate = x.ToDate,
                EmployeeId = x.EmployeeId,
                Rejectedremark = x.Rejectedremark,
                LeavePlanSettingStatus = x.LeavePlanSettingStatus.ToString(),
                EmployeeName = $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
                Department = x.Employee.EmployeeDetail != null ? $"{x.Employee.EmployeeDetail.FirstOrDefault().Department.DepartmentName}" : "",

            }).ToListAsync();
            return employeeLeavePlan;
        }
        public async Task<ResponseMessage> AddEmployeeLeavePlan(LeavePlanSettingPostDto leavePlanSettingPost) {

            try
            {

                LeavePlanSetting employeeLeavePlan = new LeavePlanSetting
                {
                    Id = Guid.NewGuid(),
                    ToDate = leavePlanSettingPost.ToDate,
                    FromDate = leavePlanSettingPost.FromDate,
                    LeavePlanSettingStatus = LeavePlanSettingStatus.REQUESTED,
                    EmployeeId = leavePlanSettingPost.EmployeeId,

                    CreatedById = leavePlanSettingPost.CreatedById,
                    CreatedDate = DateTime.Now,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.LeavePlanSetting.AddAsync(employeeLeavePlan);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Data = employeeLeavePlan,
                    Message = "Leave plan Setting Added Successfully !!!",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = false
                };
            }



        }
        public async Task<ResponseMessage> UpdateEmployeeLeavePlan(LeavePlanSettingUpdateDto leaveplan) {

            var currentEmployeeLeavePlan = await _dbContext.LeavePlanSetting.FirstOrDefaultAsync(x => x.Id.Equals(leaveplan.Id));

            if (currentEmployeeLeavePlan != null)
            {
     
                if (leaveplan.LeavePlanSettingStatus != null)
                {
                    currentEmployeeLeavePlan.LeavePlanSettingStatus = Enum.Parse<LeavePlanSettingStatus>(leaveplan.LeavePlanSettingStatus);

                }
                if (leaveplan.Rejectedremark != null)
                {
                    currentEmployeeLeavePlan.Rejectedremark = leaveplan.Rejectedremark;

                }



                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Updated Employee Leave Plan", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Leave Plan !!!" };
        }

      
    }
}
