using Implementation.Helper;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.EntityFrameworkCore;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployeeSeveranceService : IEmployeeSeveranceService
    {
        private readonly ApplicationDbContext _dbContext;

        public EmployeeSeveranceService(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<ResponseMessage> CalculateEmployeeSeverance(Guid employmentDetailId)
        {
            var salaryAndPercentage = await _dbContext.EmploymentDetails.Where(x => x.Employee.EmploymentStatus == EnumList.EmploymentStatus.ACTIVE && x.Id == employmentDetailId)
                .Select(x => new { x.Salary, x.Position.HasSeverance, x.Position.SeverancePercentage }).FirstOrDefaultAsync();

            if (salaryAndPercentage == null)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "Could not Find Active Employment Detail For this Employee"
                };
            }

            if (!salaryAndPercentage.HasSeverance)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = "This Employee's Postion does not have severance"

                };
            }

            EmployeeSeverance severance = new()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                Rowstatus = EnumList.RowStatus.ACTIVE,
                EmploymentDetailId = employmentDetailId,
                Amount = salaryAndPercentage.Salary * (double)salaryAndPercentage.SeverancePercentage / 100
            };

            await _dbContext.EmployeeSeverances.AddAsync(severance);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Success = true,
                Message = "Employee Severance Calculated Suceessfully"
            };
        }

        public async Task<double> GetEmployeeSeverance(Guid employeeId)
        {
            var employeeSeverance = await _dbContext.EmployeeSeverances.Where(x => x.EmploymentDetail.EmployeeId == employeeId).SumAsync(x => x.Amount);
            return employeeSeverance;
        }
    }
}
