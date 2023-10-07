using Implementation.Helper;
using IntegratedImplementation.DTOS.Configuration;
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
        Task<ResponseMessage> UpdateEmployee(EmployeePostDto addEmployee);
        Task<ResponseMessage> UpdateEmployeeData(EmployeeUpdateDto updateEmployee);
        Task<EmployeeGetDto> GetEmployee(Guid employeeId);
        Task<List<SelectListDto>> GetEmployeesNoUserSelectList();

        //history
        Task<List<EmployeeHistoryDto>> GetEmployeeHistory(Guid employeeId);
        Task<ResponseMessage> AddEmployeeHistory(EmployeeHistoryPostDto addEmployeeHistory);
        Task<ResponseMessage> UpdateEmployeeHistory(EmployeeHistoryPostDto updateEmployeeHistory);
        Task<ResponseMessage> deleteEmployeeHistory(Guid employeeHistoryId);
        
        //salary History
        Task<List<EmployeeSalaryGetDto>> GetEmployeeSalaryHistory(Guid employeeDetailId);
        Task<ResponseMessage> AddEmployeeSalaryHistory(EmployeeSalryPostDto addEmployeeHistory);
        Task<ResponseMessage> UpdateEmployeeSalaryHistory(EmployeeSalaryGetDto updateEmployeeHistory);
        Task<ResponseMessage> deleteEmployeeSalaryHistory(Guid employeeHistoryId);

        //family
        Task<List<EmployeeFamilyGetDto>> GetEmployeeFamily(Guid employeeId);
        Task<ResponseMessage> AddEmployeeFamily(EmployeeFamilyPostDto addEmployeeFamily);
        Task<ResponseMessage> UpdateEmployeeFamily(EmployeeFamilyGetDto updateEmployeeFamily);
        Task<ResponseMessage> deleteEmployeeFamily(Guid employeeFamilyId);

        //education
        Task<List<EmployeeEducationGetDto>> GetEmployeeEducation(Guid employeeId);
        Task<ResponseMessage> AddEmployeeEducation(EmployeeEducationPostDto addEmployeeEducation);
        Task<ResponseMessage> UpdateEmployeeEducation(EmployeeEducationPostDto updateEmployeeEducation);
        Task<ResponseMessage> deleteEmployeeEducation(Guid employeeEducationId);

    }
}
