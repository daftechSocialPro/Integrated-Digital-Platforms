
using IntegratedReport.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;

namespace IntegratedDigitalAPI.Controllers.HRM
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AttendanceReportController : ControllerBase
    {
        private readonly IAttendanceReportService _attendanceReport;
        public AttendanceReportController(IAttendanceReportService attendanceReport)
        {
            _attendanceReport = attendanceReport;
        }

        [HttpGet]
        public async Task<IActionResult> GetDailyAttendanceReport( DateTime date,string fileType)
        {
            try
            {
                var report = await _attendanceReport.GetDailyAttendanceReport(date,fileType);
                if (fileType == "PDF")
                {
                    return File(report, "application/pdf", $"DailyAttendance_{date:yyyyMMdd}.pdf");
                }
                else if (fileType == "EXCELOPENXML")
                {
                    return File(report, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"DailyAttendance_{date:yyyyMMdd}.xlsx");
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error generating report: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetDailyOvertimeReport(DateTime date, string fileType)
        {
            try
            {
                var report = await _attendanceReport.GetDailyOvertimeReport(date, fileType);
                if (fileType == "PDF")
                {
                    return File(report, "application/pdf", $"OverTime_{date:yyyyMMdd}.pdf");
                }
                else if (fileType == "EXCELOPENXML")
                {
                    return File(report, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"OverTime_{date:yyyyMMdd}.xlsx");
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error generating report: {ex.Message}" });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetMonthlyReport(DateTime date, string fileType)
        {
            try
            {
                var report = await _attendanceReport.GetMonthlyReport(date, fileType);
                if (fileType == "PDF")
                {
                    return File(report, "application/pdf", $"MonthlyAttendance_{date:yyyyMMMM}.pdf");
                }
                else if (fileType == "EXCELOPENXML")
                {
                    return File(report, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", $"MonthlyAttendance_{date:yyyyMMMM}.xlsx");
                }
                else
                    return null;
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = $"Error generating report: {ex.Message}" });
            }
        }
    }
}

