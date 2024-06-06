using Implementation.Helper;
using IntegratedImplementation.DTOS.Finance.Action;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Finance.Action
{
    public interface IPayrollService
    {
        Task<ResponseMessage> CalculatePayroll(PayrollParams payrollParams);
        Task<List<PayrollDataListDto>> GetPayrollDataList();
        Task<ResponseMessage> CheckPayroll(ApprovePayrollDataDto payrollDataDto);
        Task<ResponseMessage> ApprovePayroll(ApprovePayrollDataDto payrollDataDto);
        Task<ResponseMessage> AutorizePayroll(ApprovePayrollDataDto payrollDataDto);
    }
}
