using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Configuration;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Configuration
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
                CountryId = RegionPost.CountryId,
             
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
            var RegionList = await _dbContext.Regions.Include(x=>x.Country).AsNoTracking().Select(x => new RegionGetDto
            {
                Id = x.Id,
                RegionName = x.RegionName,
                CountryName = x.Country.CountryName,
                CountryId = x.CountryId
                
            }).ToListAsync();

            return RegionList;
        }

        public async Task<ResponseMessage> UpdateRegion(RegionPostDto RegionPost)
        {
            var currentRegion = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == RegionPost.Id);

            if (currentRegion != null)
            {
                currentRegion.RegionName = RegionPost.RegionName;
                currentRegion.CountryId = RegionPost.CountryId;
              
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentRegion, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Region" };
        }

    }
}
