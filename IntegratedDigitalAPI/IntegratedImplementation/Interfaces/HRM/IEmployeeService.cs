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

        Task<List<EmployeeListDto>> GetEmployees();
        Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee);
        Task<ResponseMessage> UpdateEmployee(EmployeePostDto addEmployee);
        Task<ResponseMessage> UpdateEmployeeData(EmployeeUpdateDto updateEmployee);
        Task<EmployeeGetDto> GetEmployee(Guid employeeId);
        Task<List<SelectListDto>> GetEmployeesNoUserSelectList();
        Task<List<SelectListDto>> GetEmployeeswithContractend();
        Task<ResponseMessage> ApproveEmployee(Guid employeeId);

        Task<List<EmployeeBankListDto>> EmployeeBanks(Guid employeeId);
        Task<ResponseMessage> AddEmployeeBank(AddEmployeeBankDto employeeBank);
      

        //history
        Task<List<EmployeeHistoryDto>> GetEmployeeHistory(Guid employeeId);
        Task<ResponseMessage> AddEmployeeHistory(EmployeeHistoryPostDto addEmployeeHistory);
        Task<ResponseMessage> UpdateEmployeeHistory(EmployeeHistoryPostDto updateEmployeeHistory);
        Task<ResponseMessage> deleteEmployeeHistory(Guid employeeHistoryId);

        //employee files 

        Task<List<EmployeeFileGetDto>> GetEmployeeFiles(Guid employeeId);
        Task<ResponseMessage> AddEmployeeFiles(EmployeeFilePostDto addEmployeeFile);
        Task<ResponseMessage> UpdateEmployeeFiles(EmployeeFileGetDto updateEmployeeFile);
        Task<ResponseMessage> DeleteEmployeeFiles(Guid employeeFileId);

        //employeesurety
        Task<List<EmployeeSuertyGetDto>> GetEmployeeSurety(Guid employeeId);
        Task<ResponseMessage> AddEmployeeSurety(EmployeeSuretyPostDto addEmployeeSurety);
        Task<ResponseMessage> UpdateEmployeeSurety(EmployeeSuretyPostDto updateEmployeeSurety);
        Task<ResponseMessage> DeleteEmployeeSurety(Guid employeeSuretyId);


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


        //volunter 

        Task<List<VolunterGetDto>> GetVolunters();
        Task<VolunterGetDto> GetVolunter(Guid employeeId);
        Task<ResponseMessage> AddVolunter(VolunterPostDto addVolunter);
        Task<ResponseMessage> UpdateVolunter(VolunterPostDto addVolunter);

    }
}
