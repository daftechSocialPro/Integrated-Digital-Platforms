using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.Helper;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployeeService : IEmployeeService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IMapper _mapper;
        public EmployeeService(ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IMapper mapper)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _mapper = mapper;
        }

        public async Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee)
        {
            var id = Guid.NewGuid();
            var path = "";

            if (addEmployee.ImagePath != null)
                path = _generalConfig.UploadFiles(addEmployee.ImagePath, id.ToString(), "Employee").Result.ToString();


            var probationPeriod = await _dbContext.HrmSettings.FirstOrDefaultAsync(x => x.GeneralSetting == GeneralHrmSetting.PROBATIONPERIOD);
            if (probationPeriod == null)
                return new ResponseMessage { Success = false, Message = "Could Not Find Prohbation Period" };


            var code = await _generalConfig.GenerateCode(GeneralCodeType.EMPLOYEEPREFIX);
            EmployeeList employee = new EmployeeList
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = addEmployee.CreatedById,
                EmployeeCode = code,
                Woreda = addEmployee.Woreda,
                Email = addEmployee.Email,
                RegionId = addEmployee.RegionId,
                EmploymentStatus = Enum.Parse<EmploymentStatus>(addEmployee.EmploymentStatus),
                EmploymentType = Enum.Parse<EmploymentType>(addEmployee.EmploymentType),
                FirstName = addEmployee.FirstName,
                MiddleName = addEmployee.MiddleName,
                LastName = addEmployee.LastName,               
                BirthDate = addEmployee.BirthDate,
                Gender =Enum.Parse<Gender>(addEmployee.Gender),
                IsPension = addEmployee.IsPension,
                MaritalStatus = Enum.Parse<MaritalStatus>(addEmployee.MaritalStatus),
                PaymentType = Enum.Parse<PaymentType>(addEmployee.PaymentType),               
                BankAccountNo = addEmployee.BankAccountNo,                
                EmploymentDate = addEmployee.EmploymentDate,
                ImagePath = path,
                PhoneNumber = addEmployee.PhoneNumber,
                PensionCode = addEmployee.PensionCode,             
                TinNumber = addEmployee.TinNumber,
                ContractEndDate = addEmployee.EmploymentDate.AddDays(addEmployee.ContractDays),
                Rowstatus = RowStatus.ACTIVE,
            
            };
            await _dbContext.Employees.AddAsync(employee);
            await _dbContext.SaveChangesAsync();

            EmploymentDetail employmentDetail = new EmploymentDetail()
            {
                Id = Guid.NewGuid(),
                CreatedById = addEmployee.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = employee.Id,
                EmploymentStatus = EmploymentStatus.ACTIVE,
                DepartmentId = addEmployee.DepartmentId,               
                PositionId = addEmployee.PositionId,
               
            };
            await _dbContext.EmploymentDetails.AddAsync(employmentDetail);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                
                Message = "Added Successfully",
                Success = true
            };
        }

        public async Task<List<EmployeeGetDto>> GetEmployees()
        {
            var employeeList = await _dbContext.Employees.AsNoTracking()
                                    .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return employeeList;
        }

        public async Task<EmployeeGetDto> GetEmployee(Guid employeeId)
        {
            var employee = await _dbContext.Employees
                .Include(x=>x.Region.Country)
                .Include(x=>x.EmployeeDetail).ThenInclude(x=>x.Department)
                .Include(x => x.EmployeeDetail).ThenInclude(x => x.Position)
                .Where(x=>x.Id == employeeId)
                .AsNoTracking()
                .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider).FirstAsync();

            return employee;
        }

        public async Task<List<EmployeeHistoryDto>> GetEmployeeHistory(Guid employeeId)
        {
            var employeeHistories = await _dbContext.EmploymentDetails.Where(x=>x.EmployeeId == employeeId).Include(x=>x.Department).Include(x=>x.Position).AsNoTracking()
                                .ProjectTo<EmployeeHistoryDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();
            return employeeHistories;
        }

        public async Task<ResponseMessage> AddEmployeeHistory(EmployeeHistoryPostDto addEmployeeHistory)
        {


            EmploymentDetail employmentDetail = new EmploymentDetail()
            {
                Id = Guid.NewGuid(),
                CreatedById = addEmployeeHistory.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = addEmployeeHistory.EmployeeId,
                EmploymentStatus = EmploymentStatus.ACTIVE,
                DepartmentId = addEmployeeHistory.DepartmentId,
                PositionId = addEmployeeHistory.PositionId,
                StartDate = addEmployeeHistory.StartDate,
                EndDate = addEmployeeHistory.EndDate,
                Salary = addEmployeeHistory.Salary

            };
            await _dbContext.EmploymentDetails.AddAsync(employmentDetail);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };

        }


       public async Task<ResponseMessage> UpdateEmployeeHistory(EmployeeHistoryPostDto updateEmployeeHistory)
        {
            var currentEmployeeHistory = await _dbContext.EmploymentDetails.FirstOrDefaultAsync(x => x.Id.Equals(updateEmployeeHistory.Id));

            if (currentEmployeeHistory != null)
            {

                currentEmployeeHistory.DepartmentId = updateEmployeeHistory.DepartmentId;
                currentEmployeeHistory.PositionId = updateEmployeeHistory.PositionId;
                currentEmployeeHistory.Salary = updateEmployeeHistory.Salary;
                currentEmployeeHistory.StartDate = updateEmployeeHistory.StartDate;
                currentEmployeeHistory.EndDate = updateEmployeeHistory.EndDate;
               

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Deleted", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee History" };
        }

        public async Task<ResponseMessage> deleteEmployeeHistory(Guid employeeHistoryId)
        {

            var currentEmployeeHistory = await _dbContext.EmploymentDetails.FindAsync(employeeHistoryId);

            if (currentEmployeeHistory != null)
            {

                _dbContext.Remove(currentEmployeeHistory);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message="Successfully Deleted", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee History" };
        }


    }
}
