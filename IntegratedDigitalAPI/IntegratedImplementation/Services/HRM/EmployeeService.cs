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
using System.IO;
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
                ZoneId = addEmployee.ZoneId,
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


        public async Task<ResponseMessage> UpdateEmployee(EmployeePostDto addEmployee)
        {

            try
            {

                var path = "";

                var employee = _dbContext.Employees.Find(addEmployee.Id);


                if (addEmployee.ImagePath != null)
                    path = _generalConfig.UploadFiles(addEmployee.ImagePath, employee.Id.ToString(), "Employee").Result.ToString();

                if (employee!= null)
                {


                    employee.FirstName = addEmployee.FirstName;
                    employee.MiddleName = addEmployee.MiddleName;
                    employee.LastName = addEmployee.LastName;
                    employee.PhoneNumber = addEmployee.PhoneNumber;
                    employee.Email = addEmployee.Email;
                    if (addEmployee.Gender != null)
                    {
                        employee.Gender = Enum.Parse<Gender>( addEmployee.Gender);
                    }
                    if (addEmployee.MaritalStatus != null)
                    {
                        employee.MaritalStatus = Enum.Parse<MaritalStatus>(addEmployee.MaritalStatus);
                    }
                    if (addEmployee.EmploymentType != null)
                    {
                        employee.EmploymentType = Enum.Parse<EmploymentType>(addEmployee.EmploymentType);
                    }
                    if (addEmployee.EmploymentStatus != null)
                    {
                        employee.EmploymentStatus = Enum.Parse<EmploymentStatus>(addEmployee.EmploymentStatus);
                    }
                    if (addEmployee.PaymentType != null)
                    {
                        employee.PaymentType = Enum.Parse<PaymentType>(addEmployee.PaymentType);
                    }

                    if (path != "")
                    {
                        employee.ImagePath = path;
                    }
                    employee.EmploymentDate = addEmployee.EmploymentDate;
                    employee.ContractEndDate = addEmployee.ContractEndDate;
                    employee.PensionCode = addEmployee.PensionCode;
                    employee.TinNumber = addEmployee.TinNumber;
                    employee.BankAccountNo = addEmployee.BankAccountNo;
                    employee.BirthDate = employee.BirthDate;

                   await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                      
                        Message = "Employee Updated Successfully ",
                        Success = true
                    };
                }

                else
                {
                    return new ResponseMessage
                    {

                        Message = "Employee Not Found !!",
                        Success = true
                    };
                }

            }
            catch(Exception ex )
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = true
                };

            }


        }



        public async Task<ResponseMessage> UpdateEmployeeData(EmployeeUpdateDto updateEmployee)
        {

            try
            {

                var path = "";

                var employee = _dbContext.Employees.Find(updateEmployee.Id);


                if (updateEmployee.ImagePath != null)
                    path = _generalConfig.UploadFiles(updateEmployee.ImagePath, employee.Id.ToString(), "Employee").Result.ToString();

                if (employee != null)
                {


                    employee.FirstName = updateEmployee.FirstName;
                    employee.MiddleName = updateEmployee.MiddleName;
                    employee.LastName = updateEmployee.LastName;
                    employee.PhoneNumber = updateEmployee.PhoneNumber;
                    employee.Email = updateEmployee.Email;
                    

                    if (path != "")
                    {
                        employee.ImagePath = path;
                    }
             

                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {

                        Message = "Employee Updated Successfully ",
                        Success = true
                    };
                }

                else
                {
                    return new ResponseMessage
                    {

                        Message = "Employee Not Found !!",
                        Success = true
                    };
                }

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex.InnerException.Message,
                    Success = true
                };

            }



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
                .Where(x=>x.Id == employeeId)
                .AsNoTracking()
                .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider).FirstAsync();

            return employee;
        }

        //history
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
                return new ResponseMessage { Message = "Successfully Updated", Success = true };
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


        //Family

        public async Task<List<EmployeeFamilyGetDto>> GetEmployeeFamily(Guid employeeId)
        {
            var employeeFamilies = await _dbContext.EmployeeFamilies.Where(x => x.EmployeeId == employeeId).AsNoTracking()
                                .ProjectTo<EmployeeFamilyGetDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();
            return employeeFamilies;
        }
        public async Task<ResponseMessage> AddEmployeeFamily(EmployeeFamilyPostDto addEmployeeFamily)
        {


            EmployeeFamily employeeFamily = new EmployeeFamily()
            {
                Id = Guid.NewGuid(),
                CreatedById = addEmployeeFamily.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = addEmployeeFamily.EmployeeId,
                FullName = addEmployeeFamily.FullName,
                Gender = Enum.Parse<Gender>(addEmployeeFamily.Gender),
                FamilyRelation = Enum.Parse<FamilyRelation>(addEmployeeFamily.FamilyRelation),
                BirthDate = addEmployeeFamily.BirthDate,
                Remark = addEmployeeFamily.Remark,


            };
            await _dbContext.EmployeeFamilies.AddAsync(employeeFamily);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };

        }
        public async Task<ResponseMessage> UpdateEmployeeFamily(EmployeeFamilyGetDto updateEmployeeFamily)
        {
            var currentEmployeeFamily = await _dbContext.EmployeeFamilies.FirstOrDefaultAsync(x => x.Id.Equals(updateEmployeeFamily.Id));

            if (currentEmployeeFamily != null)
            {

                currentEmployeeFamily.FullName = updateEmployeeFamily.FullName;
                currentEmployeeFamily.Gender = Enum.Parse<Gender>( updateEmployeeFamily.Gender);
                currentEmployeeFamily.FamilyRelation =Enum.Parse<FamilyRelation>( updateEmployeeFamily.FamilyRelation);
                currentEmployeeFamily.BirthDate = updateEmployeeFamily.BirthDate;
                currentEmployeeFamily.Remark = updateEmployeeFamily.Remark;


                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Updated Employee Family", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Family" };
        }
        public async Task<ResponseMessage> deleteEmployeeFamily(Guid employeeFamilyId)
        {

            var currentEmployeeFamily = await _dbContext.EmployeeFamilies.FindAsync(employeeFamilyId);

            if (currentEmployeeFamily != null)
            {

                _dbContext.Remove(currentEmployeeFamily);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Deleted Employee Family", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Family" };
        }


        // Education

        public async Task<List<EmployeeEducationGetDto>> GetEmployeeEducation(Guid employeeId)
        {
            var employeeFamilies = await _dbContext.EmployeeEducations.Where(x => x.EmployeeId == employeeId).AsNoTracking()
                                .ProjectTo<EmployeeEducationGetDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();
            return employeeFamilies;
        }
        public async Task<ResponseMessage> AddEmployeeEducation(EmployeeEducationPostDto addEmployeeEducation)
        {


            EmployeeEducation employeeEducation = new EmployeeEducation()
            {
                Id = Guid.NewGuid(),
                CreatedById = addEmployeeEducation.CreatedById,
                CreatedDate = DateTime.Now,
                EmployeeId = addEmployeeEducation.EmployeeId,
                EducationalLevelId = addEmployeeEducation.EducationalLevelId,
                EducationalFieldId = addEmployeeEducation.EducationalFieldId,
                FromDate = addEmployeeEducation.FromDate,
                ToDate = addEmployeeEducation.ToDate,
                Remark = addEmployeeEducation.Remark,
                Institution = addEmployeeEducation.Institution
            };
            await _dbContext.EmployeeEducations.AddAsync(employeeEducation);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Employee Education Added Successfully",
                Success = true
            };

        }
        public async Task<ResponseMessage> UpdateEmployeeEducation(EmployeeEducationPostDto updateEmployeeEducation)
        {
            var currentEmployeeEducation = await _dbContext.EmployeeEducations.FirstOrDefaultAsync(x => x.Id.Equals(updateEmployeeEducation.Id));

            if (currentEmployeeEducation != null)
            {

                currentEmployeeEducation.EducationalLevelId = updateEmployeeEducation.EducationalLevelId;
                currentEmployeeEducation.EducationalFieldId = updateEmployeeEducation.EducationalFieldId;
                currentEmployeeEducation.FromDate = updateEmployeeEducation.FromDate;
                currentEmployeeEducation.ToDate = updateEmployeeEducation.ToDate;
                currentEmployeeEducation.Remark = updateEmployeeEducation.Remark;
                currentEmployeeEducation.Institution = updateEmployeeEducation.Institution;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Updated Employee Education", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Education" };
        }
        public async Task<ResponseMessage> deleteEmployeeEducation(Guid employeeEducationId)
        {

            var currentEmployeeEducation = await _dbContext.EmployeeEducations.FindAsync(employeeEducationId);

            if (currentEmployeeEducation != null)
            {

                _dbContext.Remove(currentEmployeeEducation);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Deleted Employee Education", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Education" };
        }

    }






}