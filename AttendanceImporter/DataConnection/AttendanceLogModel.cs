using System;

namespace ConnData
{
    public class AttendanceLogModel
    {
        public string EnrollNo { get; set; }
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
        public int Hour { get; set; }
        public int Minute { get; set; }
        public int Second { get; set; }
        public int VerifyMode { get; set; }
        public int InOutMode { get; set; }
        public int WorkCode { get; set; }
        public string DeviceId { get; set; }
        public DateTime AttendanceDate { get; set; }
    }
}
