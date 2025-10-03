using IntegratedInfrustructure.Model.Training;
using IntegratedReport.DataSet;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedReport.Interface
{
    public interface IAttendanceReportService
    {
        Task<byte[]> GetDailyAttendanceReport(DateTime attendanceDate,string fileType);
        Task<byte[]> GetDailyOvertimeReport(DateTime attendanceDate, string fileType);
        Task<byte[]> GetMonthlyReport(DateTime attendanceDate, string fileType);
    }
}
