using Implementation.Helper;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployeeSeveranceService
    {
        Task<double> GetEmployeeSeverance(Guid employeeId);
        Task<ResponseMessage> CalculateEmployeeSeverance(Guid employmentDetailId);
    }
}
