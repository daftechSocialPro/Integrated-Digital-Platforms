using IntegratedInfrustructure.Model.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedInfrustructure.Model.HRM
{
    public class AttendanceLogFile
    {
        public Guid Id { get; set; }
        public string EnrollNo { get; set; } = null!;
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
        public int VerifyMode { get; set; }
        public int InOutMode { get; set; }
        public int WorkCode { get; set; }
        public Guid DeviceSettingId { get; set; }
        public virtual DeviceSetting DeviceSetting { get; set; } = null!;
        public DateTime AttendanceDate { get; set; }
    }
}
