using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployeePerformanceService
    {
        Task<ResponseMessage> GetPerformanceTime();
        Task<List<SelectListDto>> GetToBeFilledEmployees(Guid employeeId);
        Task<EmploeePerformanceDto> GetEmployeePerformance(Guid employeeId, int monthIndex);
        Task<ResponseMessage> StartEvaluation(Guid employeeId, int monthIndex, string createdById);
        Task<List<EmployeePerformancePlanDto>> EmployeePerformancePlan(Guid performanceId);

    }
}
