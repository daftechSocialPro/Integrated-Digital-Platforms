using DocumentFormat.OpenXml.Drawing.Charts;
using DocumentFormat.OpenXml.Wordprocessing;
using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using IntegratedImplementation.Interfaces.Finance.Action;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.FInance.Actions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Finance.Action
{
    public class PayrollService : IPayrollService
    {
        private readonly ApplicationDbContext _dbContext;

        public PayrollService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

       

        public async Task<List<PayrollDataListDto>> GetPayrollDataList()
        {
            var payrollDatas = await _dbContext.PayrollDatas.AsNoTracking().Include(x => x.ApprovedBy)
                                       .Select(x => new PayrollDataListDto
                                       {
                                           Id = x.Id.ToString(),
                                           PayrollMonth = x.PayStart.ToString("MMMM"),
                                           ApprovedBy = x.ApprovedBy == null ? "" : $"{x.ApprovedBy.FirstName} {x.ApprovedBy.FirstName} {x.ApprovedBy.FirstName}",
                                           CalculatedCount = x.CalculatedCount,
                                           TotalAmount = x.TotalAmount,
                                           IsActive = x.Rowstatus == RowStatus.ACTIVE ? true : false,
                                           UserId = x.CreatedById
                                       }).ToListAsync();

            foreach (var item in payrollDatas)
            {
                var userId = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id == item.UserId);
                if (userId != null)
                {
                    var currEmployee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == userId.EmployeeId);
                    if (currEmployee != null)
                    {
                        item.PreparedBy = currEmployee.FirstName + " " + currEmployee.MiddleName + " " + currEmployee.LastName;
                    }
                }

            }
            return payrollDatas;
        }

        public async Task<ResponseMessage> ApprovePayroll(ApprovePayrollDataDto payrollDataDto)
        {
            var currEmp = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == Guid.Parse(payrollDataDto.EmployeeId));
            if (currEmp == null)
                return new ResponseMessage { Success = false, Message = "Employee could not be found" };

            var currData = await _dbContext.PayrollDatas.FirstOrDefaultAsync(x => x.Id == Guid.Parse(payrollDataDto.PayrollDataId));
            if (currData == null)
                return new ResponseMessage { Success = false, Message = "Payroll Data could not be found" };

            currData.ApprovedById = currEmp.Id;
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Approved Successfully" };
        }


        public async Task<ResponseMessage> CalculatePayroll(PayrollParams payrollParams)
        {
            var EmpPension = await _dbContext.GeneralPayrollSettings.FirstOrDefaultAsync(x => x.GeneralPSetting == GeneralPSett.PENSIONEMPLOYEE);
            var ComPension = await _dbContext.GeneralPayrollSettings.FirstOrDefaultAsync(x => x.GeneralPSetting == GeneralPSett.PENSIONCOMPANY);
            var ProvidentFund = await _dbContext.GeneralPayrollSettings.FirstOrDefaultAsync(x => x.GeneralPSetting == GeneralPSett.PROVIDENTFUND);

            if (EmpPension == null || ComPension == null || ProvidentFund == null)
            {
                return new ResponseMessage { Success = false, Message = "Set Pension Settings Please!!" };
            }


            int lastDayDetail = DateTime.DaysInMonth(payrollParams.PayrollMonth.Year, payrollParams.PayrollMonth.Month);
            DateTime toDate =  new DateTime(payrollParams.PayrollMonth.Year, payrollParams.PayrollMonth.Month, lastDayDetail); ;

            var q = (from x in _dbContext.EmployeePayrolls.Include(x => x.Employee)
                     where x.PayStart.Equals(payrollParams.PayrollMonth) && x.PayEnd.Equals(toDate) 
                     select x).ToList();
            if (q.Count > 0 && !payrollParams.Recalculate)
            {
                return new ResponseMessage { Success = false, Message = "Payroll For This Month has been calculated!!", Data = true };
            }
            int PensionEmployee = Convert.ToInt32(EmpPension.Value);
            int PensionCompany = Convert.ToInt32(ComPension.Value);

            bool result = await Calculate(payrollParams.PayrollMonth, toDate, PensionEmployee, PensionCompany, payrollParams.UserId, payrollParams.Recalculate);

            if (result)
                return new ResponseMessage { Success = true, Message = "Successfully calculated payroll!!" };

            return new ResponseMessage { Success = false, Message = "Error Calculating Payroll!!" };
        }
        public async Task<bool> Calculate(DateTime startdate, DateTime enddate,  int EmpPension, int CompPension, string UserId, bool recalculate)
        {
            var q = (from x in _dbContext.EmployeePayrolls.Include(x => x.Employee)
                     where x.PayStart.Equals(startdate)  && x.PayEnd.Equals(enddate)
                     select x).ToList();
            if (q.Count > 0)
            {
                if (!recalculate)
                    return false;
                _dbContext.EmployeePayrolls.RemoveRange(q);
                await _dbContext.SaveChangesAsync();
            }

            double NormalOt = _dbContext.GeneralPayrollSettings.Any(x => x.GeneralPSetting == GeneralPSett.NORMALOT) ?
                               _dbContext.GeneralPayrollSettings.First(x => x.GeneralPSetting == GeneralPSett.NORMALOT).Value : 0;
            double DayoffOt = _dbContext.GeneralPayrollSettings.Any(x => x.GeneralPSetting == GeneralPSett.DAYOFFOT) ?
                            _dbContext.GeneralPayrollSettings.First(x => x.GeneralPSetting == GeneralPSett.DAYOFFOT).Value : 0;
            double NightOt = _dbContext.GeneralPayrollSettings.Any(x => x.GeneralPSetting == GeneralPSett.NIGHTOT) ?
                            _dbContext.GeneralPayrollSettings.First(x => x.GeneralPSetting == GeneralPSett.NIGHTOT).Value : 0;
            double HolidayOt = _dbContext.GeneralPayrollSettings.Any(x => x.GeneralPSetting == GeneralPSett.HOLIDAYOT) ?
                            _dbContext.GeneralPayrollSettings.First(x => x.GeneralPSetting == GeneralPSett.HOLIDAYOT).Value : 0;

            double basicsalary = 0.0;
            double topUp = 0.0;
            bool topUpTaxable = false;
            double transportTaxable = 0.0;
            double transportNontaxable = 0.0;
            double representationAllowance = 0.0;
            bool representationTaxable = false;
            double grossSalary = 0.0;
            double overtime = 0.0;
            double penality = 0.0;
            double loan = 0.0;
            double incometax = 0.0;
            double pensionemployee = 0.0;
            double pensioncompany = 0.0;
            double netpay = 0.0;
            double totalnonTaxAllowance = 0.0;
            double ot125 = 0.0;
            double ot150 = 0.0;
            double ot200 = 0.0;
            double ot250 = 0.0;
            double TotalNetPay = 0.0;

            var emp = (from x in _dbContext.Employees
                       where (x.EmploymentStatus.Equals(EmploymentStatus.ACTIVE) || (x.TerminatedDate > startdate && x.TerminatedDate < enddate))
                       select x).ToList();
            foreach (var item in emp)
            {
                basicsalary = 0.0;
                topUp = 0.0;
                transportTaxable = 0.0;
                transportNontaxable = 0.0;
                overtime = 0.0;
                penality = 0.0;
                representationAllowance = 0.0;
                loan = 0.0;
                grossSalary = 0.0;
                incometax = 0.0;
                pensionemployee = 0.0;
                pensioncompany = 0.0;
                netpay = 0.0;
                transportTaxable = 0.0;
                transportNontaxable = 0.0;
                ot125 = 0.0;
                ot150 = 0.0;
                ot200 = 0.0;
                ot250 = 0.0;
                totalnonTaxAllowance = 0.0;
                topUpTaxable = false;
                representationTaxable = false;

                double Salary = _dbContext.EmployeeSalaries.Include(x => x.EmploymentDetail).Any(x => x.EmploymentDetail.EmployeeId == item.Id && x.Rowstatus == RowStatus.ACTIVE) ?
                                     _dbContext.EmployeeSalaries.Include(x => x.EmploymentDetail).First(x => x.EmploymentDetail.EmployeeId == item.Id  && x.Rowstatus == RowStatus.ACTIVE).Amount : 0.0;

                if (item.TerminatedDate > startdate && item.TerminatedDate < enddate)
                {
                    int totday = Convert.ToInt32((enddate - item.TerminatedDate.Value).TotalDays);
                    basicsalary = Salary / 26 * totday;
                }
                else if (item.EmploymentDate > startdate && item.EmploymentDate < enddate)
                {
                    int totday = Convert.ToInt32((enddate - item.EmploymentDate).TotalDays);
                    basicsalary = Salary / 26 * totday;
                }
                else
                {
                    basicsalary = Salary;
                }

                var qal = _dbContext.EmployeeBenefits.Include(x => x.Benefit).Where(P => P.EmployeeId.Equals(item.Id)).ToList();
                foreach (var allst in qal)
                {

                    if (allst.Benefit.Name == "Transport")
                        transportNontaxable += allst.Amount;
                    else if (allst.Benefit.Name == "Transport")
                        transportTaxable += allst.Amount;
                }


               

                var qot = _dbContext.OverTimes.Where(P => P.EmployeeId.Equals(item.Id) && P.OverTimeDate > startdate && P.OverTimeDate < enddate && P.Approved).ToList();
                foreach (var otlst in qot)
                {
                    ot125 += otlst.NormalOT != 0 ? otlst.NormalOT : 0;
                    ot150 += otlst.NightOT != 0 ? otlst.NightOT : 0;
                    ot200 += otlst.DayoffOT != 0 ? otlst.DayoffOT : 0;
                    ot250 += otlst.HolidayOT != 0 ? otlst.HolidayOT : 0;
                }
                overtime += ((((Salary / 26) / 8) * ot125) * NormalOt);
                overtime += ((((Salary / 26) / 8) * ot150) * NightOt);
                overtime += ((((Salary / 26) / 8) * ot200) * DayoffOt);
                overtime += ((((Salary / 26) / 8) * ot250) * HolidayOt);

                

                grossSalary = basicsalary + transportTaxable + overtime;
                if (topUpTaxable)
                    grossSalary += topUp;
                if (representationTaxable)
                    grossSalary += representationAllowance;

                pensioncompany = (basicsalary * (CompPension / 100.00));
                pensionemployee = (basicsalary * (EmpPension / 100.00));

                var qincomtax = _dbContext.IncomeTaxSettings.Where(P => P.StartingAmount <= grossSalary && (P.EndingAmount >= grossSalary || P.EndingAmount == 0)).ToList();
                if (qincomtax.Count > 0)
                {
                    foreach (var itemtax in qincomtax)
                    {
                        incometax = (grossSalary * (itemtax.Percent / 100)) - itemtax.Deductable;
                        break;
                    }
                }

                totalnonTaxAllowance = transportNontaxable;
                if (!topUpTaxable)
                    totalnonTaxAllowance += topUp;
                if (!representationTaxable)
                    totalnonTaxAllowance += representationAllowance;

                netpay = grossSalary + totalnonTaxAllowance - (incometax + pensionemployee) - penality;
                TotalNetPay += netpay;
                EmployeePayroll payrol = new EmployeePayroll()
                {
                    Id = Guid.NewGuid(),
                    CreatedById = UserId,
                    CreatedDate = DateTime.Now,
                    BasicSallary = basicsalary,
                    EmployeeId = item.Id,
                    PayStart = startdate,
                    PayEnd = enddate,
                    GrossSallary = grossSalary,
                    Loan = loan,
                    NetPay = netpay,
                    OverTime = overtime,
                    Penality = penality,
                    Tax = incometax,
                    Rowstatus = RowStatus.ACTIVE,
                };

                await _dbContext.EmployeePayrolls.AddAsync(payrol);
                await _dbContext.SaveChangesAsync();

            }

            var previous = await _dbContext.PayrollDatas.Where(x => x.Rowstatus == RowStatus.ACTIVE).ToListAsync();
            previous.ForEach(x =>
            {
                x.Rowstatus = RowStatus.INACTIVE;
            });
            await _dbContext.SaveChangesAsync();

            var payrollData = await _dbContext.PayrollDatas.FirstOrDefaultAsync(x => x.PayStart == startdate && x.PayEnd == enddate);
            if (payrollData == null)
            {
                PayrollData payroll = new PayrollData
                {
                    Id = Guid.NewGuid(),
                    PayStart = startdate,
                    PayEnd = enddate,
                    CreatedById = UserId,
                    CalculatedCount = 1,
                    CreatedDate = DateTime.Now,
                    Rowstatus = RowStatus.ACTIVE,
                    TotalAmount = TotalNetPay
                };
                await _dbContext.PayrollDatas.AddAsync(payroll);
            }
            else
            {
                payrollData.CalculatedCount = payrollData.CalculatedCount + 1;
                payrollData.ApprovedById = Guid.Empty;
                payrollData.TotalAmount = TotalNetPay;

            }
            await _dbContext.SaveChangesAsync();
            return true;
        }
    }
  
}
