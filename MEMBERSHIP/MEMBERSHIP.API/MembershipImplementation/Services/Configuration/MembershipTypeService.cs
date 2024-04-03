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
    public class MembershipTypeService : IMembershipTypeService
    {
        private readonly ApplicationDbContext _dbContext;

        public MembershipTypeService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<ResponseMessage> AddMembershipType(MembershipTypePostDto MembershipTypePost)
        {
            MembershipType MembershipType = new MembershipType
            {
                Id = Guid.NewGuid(),
                Name = MembershipTypePost.Name,
                ShortCode = MembershipTypePost.ShortCode,
                Years = MembershipTypePost.Years,
                Money  = MembershipTypePost.Money,
                Description = MembershipTypePost.Description,
                MembershipCategory = Enum.Parse<MembershipCategory>(MembershipTypePost.MembershipCategory),               
                Currency = Enum.Parse<Currency>(MembershipTypePost.Currency),               
                CreatedById = MembershipTypePost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.MembershipTypes.AddAsync(MembershipType);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = MembershipType,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<MembershipTypeGetDto>> GetMembershipTypeList()
        {
            var MembershipTypeList = await _dbContext.MembershipTypes.AsNoTracking().Select(x => new MembershipTypeGetDto
            {
                Id = x.Id,
                Name = x.Name,
                ShortCode  = x.ShortCode,
                Years = x.Years,
                Money =x.Money,
                Currency = x.Currency.ToString(),
                Description =x.Description,
                MembershipCategory = x.MembershipCategory.ToString(),
            }).ToListAsync();

            return MembershipTypeList;
        }

        public async Task<ResponseMessage> UpdateMembershipType(MembershipTypeGetDto MembershipTypePost)
        {
            var currentMembershipType = await _dbContext.MembershipTypes.FirstOrDefaultAsync(x => x.Id == MembershipTypePost.Id);

            if (currentMembershipType != null)
            { 
                currentMembershipType.Name = MembershipTypePost.Name;
                currentMembershipType.Description = MembershipTypePost.Description;
                currentMembershipType.Years = MembershipTypePost.Years;
                currentMembershipType.ShortCode = MembershipTypePost.ShortCode;
                currentMembershipType.Money = MembershipTypePost.Money;
                currentMembershipType.Currency = Enum.Parse<Currency>(MembershipTypePost.Currency);
                currentMembershipType.MembershipCategory = Enum.Parse<MembershipCategory>(MembershipTypePost.MembershipCategory);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMembershipType, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find MembershipType" };
        }


        public async Task<ResponseMessage> DeleteMembershipType(Guid MembershipTypeId)
        {
            var currentMembershipType = await _dbContext.MembershipTypes.FindAsync(MembershipTypeId);

            if (currentMembershipType != null)
            {
                _dbContext.Remove(currentMembershipType);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentMembershipType, Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find MembershipType" };


        }
    }
}
