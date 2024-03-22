using IntegratedImplementation.DTOS.Finance.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Report
{
    public interface IPayrollReports
    {
        public Task<List<PayrollReportDto>> GetPayrollReport(DateTime payrollMonth);
    }
}
