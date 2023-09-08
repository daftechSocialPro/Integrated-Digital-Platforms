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

        public async Task<List<SelectListDto>> GetLeaveTypeDropdownList()
        {
            var LeaveTypeList = await _dbContext.LeaveTypes.AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.Name,
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
                    currentLeaveType.LeaveCategory = Enum.Parse<LeaveCategory>( LeaveType.LeaveCategory );
                    currentLeaveType.MinDate = LeaveType.MinDate;
                    currentLeaveType.MaxDate =LeaveType.MaxDate;
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
    }
}
