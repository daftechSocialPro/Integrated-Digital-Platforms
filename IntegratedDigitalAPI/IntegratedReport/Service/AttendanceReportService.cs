
using IntegratedInfrustructure.Data;
using IntegratedReport.DataSet;
using IntegratedReport.Interface;
using Microsoft.EntityFrameworkCore;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedReport.Service
{
    public class AttendanceReportService : IAttendanceReportService
    {
        private readonly ApplicationDbContext _dbContext;

        public AttendanceReportService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<byte[]> GetDailyAttendanceReport(DateTime attendanceDate, string fileType)
        {
            try
            {
                HRMDataSet.DailyAttendanceReportDataTable dailyAttendance = new HRMDataSet.DailyAttendanceReportDataTable();


                var dailyReport = await _dbContext.EmployeeAttendances.Include(x => x.FingerPrint.Employee).Where(X => X.AttendanceDate.Date.Equals(attendanceDate)).Select(x =>
                dailyAttendance.AddDailyAttendanceReportRow(x.FingerPrint.Employee.EmployeeCode, $"{x.FingerPrint.Employee.FirstName} {x.FingerPrint.Employee.MiddleName} {x.FingerPrint.Employee.LastName}",
                x.AttencanceType, x.CheckIn, x.CheckOut, x.TotalTime
                )).ToListAsync();

                // var compProfile = await _dbContext.CompanyProfiles.Select(x => companyProfileRows.AddCompanyProfileRow(x.CompanyName, x.Logo)).FirstOrDefaultAsync();

                var currentDirectory = Directory.GetCurrentDirectory();
                var reportPath = currentDirectory + "\\Reports\\HRM\\DailyAttendance.rdlc";
                ReportParameter parameter = new ReportParameter("AttendanceDate", attendanceDate.ToString("dd/MM/yyyy"));
                ReportParameter totalEmp = new ReportParameter("TotalEmployees", dailyReport.Count().ToString());
                var localReport = new LocalReport();
                localReport.ReportPath = reportPath;
                ReportDataSource daata = new ReportDataSource();
                daata.Name = "AttendanceReport";
                daata.Value = dailyAttendance;
                localReport.DataSources.Add(daata);
                localReport.SetParameters(parameter);
                localReport.SetParameters(totalEmp);

               // var bytesEx = localReport.Render("EXCELOPENXML");
               // var bytespdf = localReport.Render("PDF");
                return  localReport.Render(fileType);
            }
            catch (Exception ex)
            {
                return null;
            }

        }

        public async Task<byte[]> GetDailyOvertimeReport(DateTime attendanceDate, string fileType)
        {
           
            HRMDataSet.OvertimeReportDataTable overtimes = new HRMDataSet.OvertimeReportDataTable();

            var dailyReport = await _dbContext.OverTimes.Include(x => x.Employee).Where(X => X.OverTimeDate.Date.Equals(attendanceDate)).Select(x =>
            overtimes.AddOvertimeReportRow(x.Employee.EmployeeCode, $"{x.Employee.FirstName} {x.Employee.MiddleName} {x.Employee.LastName}",
            Math.Round(x.NormalOT, 2), Math.Round(x.DayoffOT, 2), Math.Round(x.HolidayOT, 2)
            )).ToListAsync();

            
            var currentDirectory = Directory.GetCurrentDirectory();
            var reportPath = currentDirectory + "\\Reports\\HRM\\DailyOvertimeReport.rdlc";
            ReportParameter parameter = new ReportParameter("AttendanceDate", attendanceDate.ToString("dd/MM/yyyy"));

                var localReport = new LocalReport();
            localReport.ReportPath = reportPath;
            ReportDataSource daata = new ReportDataSource();
            daata.Name = "Overtime";
            daata.Value = overtimes;
            localReport.DataSources.Add(daata);
            localReport.SetParameters(parameter);

            var bytes = localReport.Render(fileType);
            return bytes;
        }

        public async Task<byte[]> GetMonthlyReport(DateTime attendanceDate, string fileType)
        {
          
            HRMDataSet.MonthlyAttendanceDataTable monthlyAttendances = new HRMDataSet.MonthlyAttendanceDataTable();
            var employee = await _dbContext.EmployeeFingerPrints.Include(x => x.Employee).AsNoTracking()
                .Where(x => x.Rowstatus == RowStatus.ACTIVE)
                  .OrderBy(x => x.Employee.EmployeeCode).ToListAsync();

            MonthlyAttReportDto monthlyAtt = new MonthlyAttReportDto();
            foreach (var items in employee)
            {
                var attendance = await _dbContext.EmployeeAttendances.
                    Where(x => x.FingerPrintId.Equals(items.Id)
                    && x.AttendanceDate.Month == attendanceDate.Month
                    && x.AttendanceDate.Year == attendanceDate.Year)
                    .ToListAsync();

                var overTime = await _dbContext.OverTimes.
                   Where(x => x.EmployeeId.Equals(items.EmployeeId)
                   && x.OverTimeDate.Month == attendanceDate.Month
                   && x.OverTimeDate.Year == attendanceDate.Year
                   && x.Approved).ToListAsync();
                monthlyAttendances.AddMonthlyAttendanceRow(
                    items.EmployeeId.ToString(),
                    items.Employee.EmployeeCode,
                    $"{items.Employee.FirstName} {items.Employee.MiddleName} {items.Employee.LastName}",
                    attendance.Count(x => x.AttencanceType.Equals("FD")),
                     attendance.Count(x => x.AttencanceType.Equals("NSB")),
                     attendance.Count(x => x.AttencanceType.Equals("day off")),
                      attendance.Count(x => x.AttencanceType.Equals("EP")),
                     attendance.Count(x => x.AttencanceType.Equals("HD")),
                       attendance.Count(x => x.AttencanceType.Equals("ON Leave")),
                       attendance.Count(x => x.AttencanceType.Equals("Holiday")),
                    attendance.Count(x => x.AttencanceType.Equals("AB")),
                    Math.Round(overTime.Sum(x => x.NormalOT)),
                    Math.Round(overTime.Sum(x => x.NightOT)),
                    Math.Round(overTime.Sum(x => x.DayoffOT)),
                    Math.Round(overTime.Sum(x => x.HolidayOT))
                );

            }

            var currentDirectory = Directory.GetCurrentDirectory();
            var reportPath = currentDirectory + "\\Reports\\HRM\\MonthlyAttendance.rdlc";
            ReportParameter parameter = new ReportParameter("AttendanceDate", attendanceDate.ToString("MMMM, yyyy"));

                var localReport = new LocalReport();
            localReport.ReportPath = reportPath;
            ReportDataSource daata = new ReportDataSource();
            daata.Name = "Monthly";
            daata.Value = monthlyAttendances;
            localReport.DataSources.Add(daata);
            localReport.SetParameters(parameter);
            var bytes = localReport.Render(fileType);
            return bytes;
        }
    }
}
