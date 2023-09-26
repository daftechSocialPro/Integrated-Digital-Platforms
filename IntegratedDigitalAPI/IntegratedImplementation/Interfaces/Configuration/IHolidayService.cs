using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Configuration
{
    public interface IHolidayService
    {
        Task<ResponseMessage> AddHoliday(AddHolidayDto addHoliday);
        Task<List<HolidayListDto>> GetHolidayList();
        Task<ResponseMessage> UpdateHoliday(UpdateHolidayDto updateHoliday);
    }
}
