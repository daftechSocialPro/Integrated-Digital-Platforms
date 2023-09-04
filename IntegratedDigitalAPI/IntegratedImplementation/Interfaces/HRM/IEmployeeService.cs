using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IEmployeeService
    {

        Task<List<EmployeeGetDto>> GetEmployees();
        Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee);
        Task<EmployeeGetDto> GetEmployee(Guid employeeId);

        Task<List<EmployeeHistoryDto>> GetEmployeeHistory(Guid employeeId);

        Task<ResponseMessage> AddEmployeeHistory(EmployeeHistoryPostDto addEmployeeHistory);
        Task<ResponseMessage> UpdateEmployeeHistory(EmployeeHistoryPostDto updateEmployeeHistory);
        Task<ResponseMessage> deleteEmployeeHistory(Guid employeeHistoryId);

        Task<List<EmployeeFamilyGetDto>> GetEmployeeFamily(Guid employeeId);

        Task<ResponseMessage> AddEmployeeFamily(EmployeeFamilyPostDto addEmployeeFamily);
        Task<ResponseMessage> UpdateEmployeeFamily(EmployeeFamilyGetDto updateEmployeeFamily);
        Task<ResponseMessage> deleteEmployeeFamily(Guid employeeFamilyId);

    }
}
