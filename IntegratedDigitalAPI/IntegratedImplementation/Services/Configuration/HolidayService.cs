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
    public class HolidayService : IHolidayService
    {

        private readonly ApplicationDbContext _dbContext;

        public HolidayService(ApplicationDbContext dbContext) 
        { 
            _dbContext = dbContext; 
        }
        public async Task<ResponseMessage> AddHoliday(AddHolidayDto addHoliday)
        {
            HolidayLst holiday = new HolidayLst
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                Name = addHoliday.HolidayName, 
                Date = addHoliday.HolidayDate,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.Holidays.AddAsync(holiday);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = holiday,
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<HolidayListDto>> GetHolidayList()
        {
            return await _dbContext.Holidays.AsNoTracking().Select(x => new HolidayListDto
            {
                Id = x.Id,
                HolidayDate = DateOnly.FromDateTime(x.Date),
                HolidayName = x.Name
            }).ToListAsync();
        }

        public async Task<ResponseMessage> UpdateHoliday(UpdateHolidayDto updateHoliday)
        {
            var currentHoliday = await _dbContext.Holidays.FirstOrDefaultAsync(x => x.Id == updateHoliday.Id);

            if (currentHoliday != null)
            {
                currentHoliday.Name = updateHoliday.HolidayName;
                currentHoliday.Date = updateHoliday.HolidayDate;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentHoliday, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Holiday" };
        }
    }
}
