using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.DTOS.Configuration
{
    public class HolidayListDto
    {
        public Guid Id { get; set; }
        public DateOnly HolidayDate { get; set; }
        public string HolidayName { get; set; } = null!;
    }

    public class AddHolidayDto
    {
        public DateTime HolidayDate { get; set; }
        public string HolidayName { get; set; } = null!;
    }

    public class UpdateHolidayDto : AddHolidayDto
    {
        public Guid Id { get; set; }
    }
}
