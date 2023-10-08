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

                LeaveType LeaveType = new LeaveType
                {
                    Id = Guid.NewGuid(),
                    Name = LeaveTypePost.Name,
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
                LeaveCategory = x.LeaveCategory.ToString(),
                MinDate = x.MinDate,
                MaxDate = x.MaxDate,
                IncrementValue = x.IncrementValue

            }).ToListAsync();

            return LeaveTypeList;
        }




        public async Task<ResponseMessage> UpdateLeaveType(LeaveTypeGetDto LeaveType)
        {

            try
            {
                var currentLeaveType = await _dbContext.LeaveTypes.FirstOrDefaultAsync(x => x.Id.Equals(LeaveType.Id));

                if (currentLeaveType != null)
                {
                    currentLeaveType.Name = LeaveType.Name;
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


        public async Task<List<LeavePlanSettingGetDto>> GetEmployeeLeavePlan(Guid employeeId)
        {
            var employeeLeavePlan = await _dbContext.LeavePlanSetting.Include(x => x.Employee.EmployeeDetail).ThenInclude(x=>x.Department).OrderByDescending(x => x.CreatedDate).Select(x => new LeavePlanSettingGetDto
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
