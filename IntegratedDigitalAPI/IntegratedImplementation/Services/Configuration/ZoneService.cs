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
    public class ZoneService :IZoneService
    {

        private readonly ApplicationDbContext _dbContext;

        public ZoneService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       

        public async Task<ResponseMessage> AddZone(ZonePostDto zonePost)
        {
            try
            {
                 Zone zone = new Zone
                {
                    Id = Guid.NewGuid(),
                    ZoneName = zonePost.ZoneName,
                    RegionId = zonePost.RegionId,
                    CreatedById = zonePost.CreatedById,
                    Rowstatus = RowStatus.ACTIVE
                };

                await _dbContext.Zones.AddAsync(zone);
                await _dbContext.SaveChangesAsync();

                return new ResponseMessage
                {
                    Data = zone,
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


        public async Task<List<ZoneGetDto>> GetZoneList()
        {
            var ZoneList = await _dbContext.Zones.AsNoTracking().Select(x => new ZoneGetDto
            {
                Id = x.Id,
                ZoneName = x.ZoneName,
                RegionName = x.Region.RegionName,
                CountryName = x.Region.Country.CountryName,
                RegionId = x.RegionId,
                CountryId = x.Region.CountryId
                

            }).ToListAsync();

            return ZoneList;
        }

        public async Task<ResponseMessage> UpdateZone(ZonePostDto ZonePost)
        {

            try
            {
                var currentZone = await _dbContext.Zones.FirstOrDefaultAsync(x => x.Id == ZonePost.Id);

                if (currentZone != null)
                {
                    currentZone.ZoneName = ZonePost.ZoneName;
                    currentZone.RegionId = ZonePost.RegionId;

                    await _dbContext.SaveChangesAsync();
                    return new ResponseMessage { Data = currentZone, Success = true, Message = "Updated Successfully" };
                }
                return new ResponseMessage { Success = false, Message = "Unable To Find Zone" };
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
