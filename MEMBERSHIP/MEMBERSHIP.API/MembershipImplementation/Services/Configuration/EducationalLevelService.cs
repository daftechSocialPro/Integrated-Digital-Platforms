using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Interfaces.Configuration;
using MembershipInfrustructure.Data;
using MembershipInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipImplementation.Services.Configuration
{
    public class EducationalLevelService :IEducationalLevelService
    {
        private readonly ApplicationDbContext _dbContext;

        public EducationalLevelService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddEducationalLevel(EducationalLevelPostDto EducationalLevelPost)
        {

            try
            {
                EducationalLevel EducationalLevel = new EducationalLevel
                {
                    Id = Guid.NewGuid(),
                    EducationalLevelName = EducationalLevelPost.EducationalLevelName,
                    Remark = EducationalLevelPost.Remark,
                    CreatedById = EducationalLevelPost.CreatedById,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.EducationalLevels.AddAsync(EducationalLevel);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Data = EducationalLevel,
                    Message = "Added Successfully",
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


        public async Task<List<EducationalLevelGetDto>> GetEducationalLevelList()
        {
            var EducationalLevelList = await _dbContext.EducationalLevels.AsNoTracking().Select(x => new EducationalLevelGetDto
            {
                Id = x.Id,
                EducationalLevelName = x.EducationalLevelName,
                Remark = x.Remark,
            }).ToListAsync();
            return EducationalLevelList;
        }

        public async Task<ResponseMessage> UpdateEducationalLevel(EducationalLevelGetDto EducationalLevelGet)
        {
            try
            {
                var currentEducationalLevel = await _dbContext.EducationalLevels.FirstOrDefaultAsync(x => x.Id == EducationalLevelGet.Id);

                if (currentEducationalLevel != null)
                {
                    currentEducationalLevel.EducationalLevelName = EducationalLevelGet.EducationalLevelName;
                    currentEducationalLevel.Remark = EducationalLevelGet.Remark;

                    await _dbContext.SaveChangesAsync();
                    return new ResponseMessage { Data = currentEducationalLevel, Success = true, Message = "Updated Successfully" };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find EducationalLevel" };
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

        public async Task<ResponseMessage> DeleteEducationalLevel(Guid educationalLevelId)
        {
            var currentEducationalLevel = await _dbContext.EducationalLevels.FindAsync(educationalLevelId);

            if (currentEducationalLevel != null)
            {
                _dbContext.Remove(currentEducationalLevel);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentEducationalLevel, Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Educational Level" };


        }
    }
}
