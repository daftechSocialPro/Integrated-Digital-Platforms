using IntegratedImplementation.DTOS.Finance.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Report
{
    public interface IPayrollReportService
    {
        public Task<List<PayrollReportDto>> GetPayrollReport(DateTime payrollMonth);

        public Task<PensionReportDto> GetPensionReport(DateTime payrollMonth);
        public Task<IncomeTaxReportDto> GetIncomeTaxReport(DateTime payrollMonth);
    }
}
