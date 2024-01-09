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
    public class RegionService : IRegionService
    {

        private readonly ApplicationDbContext _dbContext;

        public RegionService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }


        public async Task<ResponseMessage> AddRegion(RegionPostDto RegionPost)
        {
            Region Region = new Region
            {
                Id = Guid.NewGuid(),
                RegionName = RegionPost.RegionName,
                CountryType = Enum.Parse<CountryType>(RegionPost.CountryType),
                CreatedById = RegionPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.Regions.AddAsync(Region);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = Region,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<RegionGetDto>> GetRegionList()
        {
            var RegionList = await _dbContext.Regions.AsNoTracking().Select(x => new RegionGetDto
            {
                Id = x.Id,
                RegionName = x.RegionName,
                CountryName = x.CountryType.ToString(),


            }).ToListAsync();

            return RegionList;
        }

        public async Task<ResponseMessage> UpdateRegion(RegionPostDto RegionPost)
        {
            var currentRegion = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == RegionPost.Id);

            if (currentRegion != null)
            {
                currentRegion.RegionName = RegionPost.RegionName;
                currentRegion.CountryType = Enum.Parse<CountryType>(RegionPost.CountryType);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentRegion, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Region" };
        }
        public async Task<ResponseMessage> DeleteRegion(Guid regionId)
        {
            var currentRegion = await _dbContext.Regions.FindAsync(regionId);

            if (currentRegion != null)
            {
                _dbContext.Remove(currentRegion);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentRegion, Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Region" };


        }

    }
}
