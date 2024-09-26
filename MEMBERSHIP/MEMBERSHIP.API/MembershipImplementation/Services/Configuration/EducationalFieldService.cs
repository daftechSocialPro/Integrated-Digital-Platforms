using Implementation.Helper;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Interfaces.Configuration;
using MembershipInfrustructure.Model.Configuration;
using MembershipInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipImplementation.Services.Configuration
{
    public class EducationalFieldService : IEducationalFieldService
    {

        private readonly ApplicationDbContext _dbContext;

        public EducationalFieldService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> AddEducationalField(EducationalFieldPostDto EducationalFieldPost)
        {

            try
            {
                EducationalField educationalField = new EducationalField
                {
                    Id = Guid.NewGuid(),
                    EducationalFieldName = EducationalFieldPost.EducationalFieldName,
                    Remark = EducationalFieldPost.Remark,
                    CreatedById = EducationalFieldPost.CreatedById,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.EducationalFields.AddAsync(educationalField);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Data = educationalField,
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


        public async Task<List<EducationalFieldGetDto>> GetEducationalFieldList()
        {
            var EducationalFieldList = await _dbContext.EducationalFields.AsNoTracking().Select(x => new EducationalFieldGetDto
            {
                Id = x.Id,
                EducationalFieldName = x.EducationalFieldName,
                Remark = x.Remark,
            }).ToListAsync();
            return EducationalFieldList;
        }

        public async Task<ResponseMessage> UpdateEducationalField(EducationalFieldGetDto educationalFieldGet)
        {
            try
            {
                var currentEducationalField = await _dbContext.EducationalFields.FirstOrDefaultAsync(x => x.Id == educationalFieldGet.Id);

                if (currentEducationalField != null)
                {
                    currentEducationalField.EducationalFieldName = educationalFieldGet.EducationalFieldName;
                    currentEducationalField.Remark = educationalFieldGet.Remark;

                    await _dbContext.SaveChangesAsync();
                    return new ResponseMessage { Data = currentEducationalField, Success = true, Message = "Updated Successfully" };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find EducationalField" };
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

        public async Task<ResponseMessage> DeleteEducationalField(Guid educationalFieldId)
        {
            var currentEducationalField = await _dbContext.EducationalFields.FindAsync(educationalFieldId);

            if (currentEducationalField != null)
            {
                _dbContext.Remove(currentEducationalField);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentEducationalField, Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Educational Field" };


        }
    }
}
