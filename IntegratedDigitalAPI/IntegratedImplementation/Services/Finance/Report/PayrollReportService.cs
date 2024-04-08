using DocumentFormat.OpenXml.Wordprocessing;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.DTOS.Finance.Report;
using IntegratedImplementation.Interfaces.Finance.Report;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Report
{
    public class PayrollReportService : IPayrollReportService
    {
        private readonly ApplicationDbContext _dbContext;

        public PayrollReportService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<List<PayrollReportDto>> GetPayrollReport(DateTime payrollMonth)
        {

            List<PayrollReportDto> reports = new List<PayrollReportDto>();
            int lastDayDetail = DateTime.DaysInMonth(payrollMonth.Year, payrollMonth.Month);
            DateTime toDate = new DateTime(payrollMonth.Year, payrollMonth.Month, lastDayDetail);

            var q = await (from x in _dbContext.EmployeePayrolls.Include(x => x.Employee)
                     where x.PayStart.Date.Equals(payrollMonth.Date) && x.PayEnd.Date.Equals(toDate.Date)
                     select x).ToListAsync();
            

            foreach (var item in q)
            {
                int totalDays = 26;
                if (item.Employee.TerminatedDate > payrollMonth && item.Employee.TerminatedDate < toDate)
                {
                    totalDays = Convert.ToInt32((toDate - item.Employee.TerminatedDate.Value).TotalDays);
                }
                else if (item.Employee.EmploymentDate > payrollMonth && item.Employee.EmploymentDate < toDate)
                {
                    totalDays = Convert.ToInt32((toDate - item.Employee.EmploymentDate).TotalDays);
                }
                var basicSallary = (item.BasicSallary / totalDays) * 26;

                var currentPosition = _dbContext.EmploymentDetails.Include(x => x.Position).FirstOrDefault(x => x.EmployeeId == item.EmployeeId && x.Rowstatus == RowStatus.ACTIVE);

                reports.Add(new PayrollReportDto
                {
                    EmployeeName = $"{item.Employee.FirstName} {item.Employee.MiddleName} {item.Employee.LastName}",
                    DaysWorked = totalDays,
                    SourceOfFund = "",
                    CommunicationAllowance = item.CommunicationAllowance,
                    EmployeePension = item.EmployeePension,
                    IncomeTax = item.IncomeTax,
                    Loan = item.Loan,
                    NetPay = item.NetPay,
                    Pension = item.EmployeePension + item.ProvidentFund + item.CompanyPension,
                    PFEmployerPension = item.CompanyPension + item.ProvidentFund,
                    Position = currentPosition == null ? "" : currentPosition.Position.PositionName,
                    PositionAllowanceOT = item.PositionAllowance + item.OverTime,
                    Salary = basicSallary,
                    TaxableIncome = item.TaxableIncome,
                    TotalDeduction = item.Loan + item.IncomeTax + item.Penalty,
                    TotalEarning = item.TotalEarning,
                    TransportFuelAllowance = item.TransportFuelAllowance
                });
                   
            }

            return reports;
        }

        public async Task<PensionReportDto> GetPensionReport(DateTime payrollMonth)
        {

            PensionReportDto pensionReport = new PensionReportDto();
            pensionReport.PensionEmployees = new List<PensionEmployeesDto>();
            pensionReport.TerminatedEmployees = new List<TerminatedEmployeesDto>();

            int lastDayDetail = DateTime.DaysInMonth(payrollMonth.Year, payrollMonth.Month);
            DateTime toDate = new DateTime(payrollMonth.Year, payrollMonth.Month, lastDayDetail);
            var q = await (from x in _dbContext.EmployeePayrolls.Include(x => x.Employee)
                           where x.PayStart.Date.Equals(payrollMonth.Date) && x.PayEnd.Date.Equals(toDate.Date)
                           select x).ToListAsync();

            foreach(var item in q)
            {
                if(item.Employee.EmploymentStatus != EmploymentStatus.ACTIVE && item.Employee.TerminatedDate >= payrollMonth && item.Employee.TerminatedDate <= toDate)
                {
                    pensionReport.TerminatedEmployees.Add(new TerminatedEmployeesDto
                    {
                        TinNumber = item.Employee.TinNumber,
                        EmployeeName = $"{item.Employee.FirstName} {item.Employee.MiddleName} {item.Employee.LastName}"
                    });
                }

                pensionReport.PensionEmployees.Add(new PensionEmployeesDto
                {
                    EmployeeName = $"{item.Employee.FirstName} {item.Employee.MiddleName} {item.Employee.LastName}",
                    TinNumber = item.Employee.TinNumber,
                    EmployeePension = item.EmployeePension,
                    EmployerPension = item.CompanyPension,
                    EmploymentDate = item.Employee.EmploymentDate.ToString(),
                    Salary = item.BasicSallary,
                    Total = item.EmployeePension + item.CompanyPension               
                });
            }

            pensionReport.TotalPension = pensionReport.PensionEmployees.Sum(x => x.Total);
            pensionReport.TotalEmployerPension = pensionReport.PensionEmployees.Sum(x => x.EmployerPension);
            pensionReport.TotalEmployeePension = pensionReport.PensionEmployees.Sum(x => x.EmployeePension);
            pensionReport.TotalEmployees = q.Count();

            return pensionReport;

        }


        public async Task<IncomeTaxReportDto> GetIncomeTaxReport(DateTime payrollMonth)
        {

            IncomeTaxReportDto incomeTax = new IncomeTaxReportDto();
            incomeTax.IncomeTaxEmployeeDto = new List<IncomeTaxEmployeeDto>();
            incomeTax.TerminatedEmployees = new List<TerminatedEmployeesDto>();

            int lastDayDetail = DateTime.DaysInMonth(payrollMonth.Year, payrollMonth.Month);
            DateTime toDate = new DateTime(payrollMonth.Year, payrollMonth.Month, lastDayDetail);
            var q = await (from x in _dbContext.EmployeePayrolls.Include(x => x.Employee)
                           where x.PayStart.Date.Equals(payrollMonth.Date) && x.PayEnd.Date.Equals(toDate.Date)
                           select x).ToListAsync();

            foreach (var item in q)
            {
                if (item.Employee.EmploymentStatus != EmploymentStatus.ACTIVE && item.Employee.TerminatedDate >= payrollMonth && item.Employee.TerminatedDate <= toDate)
                {
                    incomeTax.TerminatedEmployees.Add(new TerminatedEmployeesDto
                    {
                        TinNumber = item.Employee.TinNumber,
                        EmployeeName = $"{item.Employee.FirstName} {item.Employee.MiddleName} {item.Employee.LastName}"
                    });
                }

                incomeTax.IncomeTaxEmployeeDto.Add(new IncomeTaxEmployeeDto
                {
                    EmployeeName = $"{item.Employee.FirstName} {item.Employee.MiddleName} {item.Employee.LastName}",
                    TinNumber = item.Employee.TinNumber,
                    BasicSalary = item.BasicSallary,
                    HireDate = item.Employee.EmploymentDate.ToString(),
                    IncomeTax = item.IncomeTax,
                    NetIncome = item.NetPay,
                    OverTime = item.OverTime,
                    TotalIncome = item.TotalEarning,
                    TransportAllowance = item.TransportFuelAllowance,
                    CostSharing = 0,
                    Allowance = item.CommunicationAllowance,
                    OtherAllowance = item.PositionAllowance,
                });
            }

            incomeTax.TotalTax = incomeTax.IncomeTaxEmployeeDto.Sum(x => x.IncomeTax);
            incomeTax.TotalIncome = incomeTax.IncomeTaxEmployeeDto.Sum(x => x.TotalIncome);
            incomeTax.TotalNoEmployee = q.Count();

            return incomeTax;

        }
    }
}

