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

        public async Task<List<SelectListDto>> GetZoneDropdownList(Guid regionID)
        {
            var ZoneList = await _dbContext.Zones.Where(x => x.RegionId == regionID).AsNoTracking().Select(x => new SelectListDto
            {
                Id = x.Id,
                Name = x.ZoneName,
            }).ToListAsync();

            return ZoneList;
        }



        public async Task<ResponseMessage> AddZone(ZonePostDto zonePost)
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


        public async Task<List<ZoneGetDto>> GetZoneList()
        {
            var ZoneList = await _dbContext.Zones.AsNoTracking().Select(x => new ZoneGetDto
            {
                Id = x.Id,
                ZoneName = x.ZoneName,
                CountryName = x.Country.CountryName,

            }).ToListAsync();

            return ZoneList;
        }

        public async Task<ResponseMessage> UpdateZone(ZonePostDto ZonePost)
        {
            var currentZone = await _dbContext.Zones.FirstOrDefaultAsync(x => x.Id == ZonePost.Id);

            if (currentZone != null)
            {
                currentZone.ZoneName = ZonePost.ZoneName;
                currentZone.CountryId = ZonePost.CountryId;

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentZone, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Zone" };
        }
    }
}
