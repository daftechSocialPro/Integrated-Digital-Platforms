using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IAttendanceReportService
    {
        Task<byte[]> GetDailyAttendanceReport(DateTime attendanceDate, string branchId);
        Task<byte[]> GetDailyOvertimeReport(DateTime attendanceDate, string branchId);
        Task<byte[]> GetLateReport(DateTime attendanceDate, string branchId);
        Task<byte[]> GetMonthlyReport(DateTime attendanceDate, string branchId);
        Task<byte[]> GetMonthlyLateReport(DateTime attendanceDate, string branchId);
    }
}
