using AutoMapper;
using AutoMapper.QueryableExtensions;
using Implementation.DTOS.Authentication;
using Implementation.Helper;
using Implementation.Interfaces.Authentication;
using IntegratedImplementation.DTOS.Configuration;
using IntegratedImplementation.DTOS.HRM;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using IntegratedInfrustructure.Model.HRM;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.HRM
{
    public class EmployeeService : IEmployeeService
    {

        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private UserManager<ApplicationUser> _userManager;
        private readonly IMapper _mapper;
        private readonly IEmailService _emailService;
        private readonly IAuthenticationService _authenticationService;
        public EmployeeService(
            ApplicationDbContext dbContext,
            IGeneralConfigService generalConfig,
            IMapper mapper,
            UserManager<ApplicationUser> userManager,
            IEmailService emailService,
            IAuthenticationService authenticationService)
        {
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _userManager = userManager;
            _mapper = mapper;
            _emailService = emailService;
            _authenticationService = authenticationService;
        }

        public async Task<ResponseMessage> AddEmployee(EmployeePostDto addEmployee)
        {
            var id = Guid.NewGuid();
            var path = "";

            try
            {

                if (addEmployee.EmploymentDate.CompareTo(DateTime.Now) <= 1 && addEmployee.ExistingEmployee)
                    return new ResponseMessage { Success = false, Message = "Employee is not existing please correct your fields" };

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
                    EmploymentType = Enum.Parse<EmploymentType>(addEmployee.EmploymentType),
                    FirstName = addEmployee.FirstName,
                    MiddleName = addEmployee.MiddleName,
                    LastName = addEmployee.LastName,
                    AmharicFirstName = addEmployee.AmharicFirstName,
                    AmharicMiddleName = addEmployee.AmharicMiddleName,
                    AmharicLastName = addEmployee.AmharicLastName,
                    BirthDate = addEmployee.BirthDate,
                    Gender = Enum.Parse<Gender>(addEmployee.Gender),
                    IsPension = addEmployee.IsPension,
                    MaritalStatus = Enum.Parse<MaritalStatus>(addEmployee.MaritalStatus),
                    PaymentType = Enum.Parse<EmployeePaymentType>(addEmployee.PaymentType),
                    EmploymentDate = addEmployee.EmploymentDate,
                    ImagePath = path,
                    PhoneNumber = addEmployee.PhoneNumber,
                    PensionCode = addEmployee.PensionCode,
                    TinNumber = addEmployee.TinNumber,
                    ContractEndDate = addEmployee.ContractEndDate,
                    Rowstatus = RowStatus.ACTIVE,
                    ExistingEmployee = addEmployee.ExistingEmployee,
                };
                await _dbContext.Employees.AddAsync(employee);
                await _dbContext.SaveChangesAsync();

                //EmploymentDetail employmentDetail = new EmploymentDetail()
                //{
                //    Id = Guid.NewGuid(),
                //    CreatedById = addEmployee.CreatedById,
                //    CreatedDate = DateTime.Now,
                //    EmployeeId = employee.Id,
                //    EmploymentStatus = EmploymentStatus.ACTIVE,
                //    DepartmentId = addEmployee.DepartmentId,
                //    PositionId = addEmployee.PositionId,
                //    StartDate = addEmployee.EmploymentDate,
                //    Salary = addEmployee.Salary
                //};
                //await _dbContext.EmploymentDetails.AddAsync(employmentDetail);
                //await _dbContext.SaveChangesAsync();

                var employeeApprovers = _dbContext.UserRoles.Where(x => x.RoleId == "6").Select(x => x.UserId).ToList();

                foreach (var employeeApprover in employeeApprovers)
                {
                    var user = _dbContext.Users.Find(employeeApprover);

                    if (user != null)
                    {
                        var email = new EmailMetadata
                        (user.Email, "Employee Approval",
                            $"Dear {user.UserName},\n\nEmployee {employee.FirstName} {employee.MiddleName} {employee.LastName} has been registered." +
                            $" Please review the employee details and provide your approval.\n\nThank you.\n\nSincerely,\nEMIA");
                        await _emailService.Send(email);
                    }
                }


                return new ResponseMessage
                {

                    Message = "Employee Added Successfully",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Message = ex.Message,
                    Success = false
                };
            }
        }



        public async Task<ResponseMessage> DeleteEmployee(Guid employeeId)
        {
            var employee = await _dbContext.Employees.FindAsync(employeeId);
            if (employee != null)
            {
                try
                {
                    _dbContext.Employees.Remove(employee);
                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {
                        Success = true,
                        Message = "Employee Deleted Successfully!!"
                    };
                }
                catch (Exception ex)
                {
                    return new ResponseMessage
                    {
                        Success = false,
                        Message = ex.Message
                    };
                }
            }
            else
            {
                return new ResponseMessage
                {

                    Success = false,
                    Message = "Employee not Found !!!"
                };
            }
        }

        public async Task<List<SelectListDto>> GetEmployeesNoUserSelectList()
        {
            var emp = _userManager.Users.Select(x => x.EmployeeId).ToList();

            var EmployeeSelectList = await (from e in _dbContext.Employees
                                            where !(emp.Contains(e.Id))
                                            select new SelectListDto
                                            {
                                                Id = e.Id,
                                                Name = $"{e.FirstName} {e.MiddleName} {e.LastName}"

                                            }).ToListAsync();

            return EmployeeSelectList;

        }


        public async Task<ResponseMessage> UpdateEmployee(EmployeePostDto addEmployee)
        {

            try
            {

                var path = "";

                var employee = _dbContext.Employees.Find(addEmployee.Id);


                if (addEmployee.ImagePath != null)
                    path = _generalConfig.UploadFiles(addEmployee.ImagePath, employee.Id.ToString(), "Employee").Result.ToString();



                if (employee != null)
                {


                    employee.FirstName = addEmployee.FirstName;
                    employee.MiddleName = addEmployee.MiddleName;
                    employee.LastName = addEmployee.LastName;
                    employee.AmharicFirstName = addEmployee.AmharicFirstName;
                    employee.AmharicMiddleName = addEmployee.AmharicMiddleName;
                    employee.AmharicLastName = addEmployee.AmharicLastName;
                    employee.PhoneNumber = addEmployee.PhoneNumber;

                    employee.Email = addEmployee.Email;
                    if (addEmployee.Gender != null)
                    {
                        employee.Gender = Enum.Parse<Gender>(addEmployee.Gender);
                    }
                    if (addEmployee.MaritalStatus != null)
                    {
                        employee.MaritalStatus = Enum.Parse<MaritalStatus>(addEmployee.MaritalStatus);
                    }
                    if (addEmployee.EmploymentType != null)
                    {
                        employee.EmploymentType = Enum.Parse<EmploymentType>(addEmployee.EmploymentType);
                    }

                    if (addEmployee.PaymentType != null)
                    {
                        employee.PaymentType = Enum.Parse<EmployeePaymentType>(addEmployee.PaymentType);
                    }

                    if (path != "")
                    {
                        employee.ImagePath = path;
                    }
                    employee.EmploymentDate = addEmployee.EmploymentDate;
                    employee.ContractEndDate = addEmployee.ContractEndDate;
                    employee.PensionCode = addEmployee.PensionCode;
                    employee.TinNumber = addEmployee.TinNumber;
                    employee.BirthDate = addEmployee.BirthDate;
                    employee.Woreda = addEmployee.Woreda;

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

                    Message = ex?.InnerException.Message,
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
        public async Task<List<EmployeeListDto>> GetEmployees()
        {
            var employeeList = await _dbContext.Employees.AsNoTracking().OrderByDescending(x => x.CreatedDate)
                                    .Select(x => new EmployeeListDto
                                    {
                                        Id = x.Id,
                                        EmployeeCode = x.EmployeeCode,
                                        ImagePath = x.ImagePath,
                                        FullName = $"{x.FirstName} {x.MiddleName} {x.LastName}",
                                        Gender = x.Gender.ToString(),
                                        BirthDate = x.BirthDate,
                                        EmploymentDate = x.EmploymentDate,
                                        EmploymentType = x.EmploymentType.ToString(),
                                        EmploymentStatus = x.EmploymentStatus.ToString(),
                                        MartialStatus = x.MaritalStatus.ToString()
                                    }).ToListAsync();
            return employeeList;
        }
        public async Task<EmployeeGetDto> GetEmployee(Guid employeeId)
        {

            //var employees = await _dbContext.Employees
            //    .Where(x => x.Id == employeeId).ToListAsync();
            var employee = await _dbContext.Employees
                .Where(x => x.Id == employeeId)
                .AsNoTracking()
                .ProjectTo<EmployeeGetDto>(_mapper.ConfigurationProvider).FirstAsync();

            var currentShift = await _dbContext.EmployeeShifts.Include(x => x.ShiftList).FirstOrDefaultAsync(x => x.EmployeeId == employeeId);
            if (currentShift != null)
            {
                employee.Shift = currentShift.ShiftList.ShiftName;
            }

            return employee;
        }

        public async Task<VolunterGetDto> GetVolunter(Guid employeeId)
        {
            var employee = await _dbContext.Volunters
                .Where(x => x.Id == employeeId)
                .AsNoTracking()
                .ProjectTo<VolunterGetDto>(_mapper.ConfigurationProvider).FirstAsync();


            return employee;
        }


        public async Task<ResponseMessage> ApproveEmployee(Guid employeeId)
        {
            try
            {

                var employee = _dbContext.Employees.Find(employeeId);

                if (employee != null)
                {
                    employee.IsApproved = true;
                    await _dbContext.SaveChangesAsync();

                    var userExists = await _dbContext.Users.AnyAsync(x => x.EmployeeId == employee.Id);
                    if (userExists)
                        return new ResponseMessage { Success = true, Message = "Approved Employee Succesfully" };

                    AddUSerDto currentUser = new AddUSerDto
                    {
                        EmployeeId = employee.Id,
                        UserName = employee.Email,
                        Password = _generalConfig.GeneratePassword()
                    };

                    ResponseMessage response = await _authenticationService.AddUser(currentUser);

                    if (response.Success)
                    {
                        var email = new EmailMetadata
                        (employee.Email, "Account Registration",
                            $"Dear {employee.FirstName} {employee.MiddleName} {employee.LastName} , Your account has been registerd." +
                            $"\n\n Your user name is {employee.Email}" +
                            $"\n\n and your password is {currentUser.Password}\n\n Regards,\nEMIA");
                        await _emailService.Send(email);
                    }

                    return new ResponseMessage
                    {

                        Message = "Employee Approved Successfully ",
                        Success = true
                    };

                }
                else
                {
                    return new ResponseMessage
                    {

                        Message = "Employee not Found !!!",
                        Success = false
                    };
                }


            }
            catch (Exception ex)
            {

                return new ResponseMessage
                {

                    Message = ex.Message,
                    Success = false
                };
            }

        }
        //
        //Volunter

        public async Task<List<VolunterGetDto>> GetVolunters()
        {
            var volunterList = await _dbContext.Volunters.AsNoTracking().OrderByDescending(x => x.CreatedDate)
                                    .ProjectTo<VolunterGetDto>(_mapper.ConfigurationProvider)
                                    .ToListAsync();
            return volunterList;
        }
        public async Task<ResponseMessage> AddVolunter(VolunterPostDto addEmployee)
        {
            var id = Guid.NewGuid();
            var path = "";

            try
            {

                if (addEmployee.ImagePath != null)
                    path = _generalConfig.UploadFiles(addEmployee.ImagePath, id.ToString(), "Volunter").Result.ToString();




                var code = await _generalConfig.GenerateCode(GeneralCodeType.EMPLOYEEPREFIX);
                Volunter employee = new Volunter
                {
                    Id = id,
                    CreatedDate = DateTime.Now,
                    CreatedById = addEmployee.CreatedById,

                    Woreda = addEmployee.Woreda,
                    Email = addEmployee.Email,
                    ZoneId = addEmployee.ZoneId,

                    FirstName = addEmployee.FirstName,
                    MiddleName = addEmployee.MiddleName,
                    LastName = addEmployee.LastName,
                    AmharicName = addEmployee.AmharicName,
                    BirthDate = addEmployee.BirthDate,
                    Gender = Enum.Parse<Gender>(addEmployee.Gender),

                    MaritalStatus = Enum.Parse<MaritalStatus>(addEmployee.MaritalStatus),
                    PaymentType = Enum.Parse<EmployeePaymentType>(addEmployee.PaymentType),
                    BankAccountNo = addEmployee.BankAccountNo,
                    EmploymentDate = addEmployee.EmploymentDate,
                    ImagePath = path,
                    PhoneNumber = addEmployee.PhoneNumber,
                    Salary = addEmployee.Salary,
                    SourceOfSalary = addEmployee.SourceOfSalary,
                    ContractEndDate = addEmployee.ContractEndDate,
                    Rowstatus = RowStatus.ACTIVE,

                };
                await _dbContext.Volunters.AddAsync(employee);
                await _dbContext.SaveChangesAsync();





                return new ResponseMessage
                {

                    Message = "Volunter Added Successfully",
                    Success = true
                };
            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {
                    Message = ex.Message,
                    Success = false
                };
            }
        }

        public async Task<ResponseMessage> UpdateVolunter(VolunterPostDto addEmployee)
        {

            try
            {

                var path = "";

                var employee = _dbContext.Volunters.Find(addEmployee.Id);


                if (addEmployee.ImagePath != null)
                    path = _generalConfig.UploadFiles(addEmployee.ImagePath, employee.Id.ToString(), "Volunter").Result.ToString();



                if (employee != null)
                {


                    employee.FirstName = addEmployee.FirstName;
                    employee.MiddleName = addEmployee.MiddleName;
                    employee.LastName = addEmployee.LastName;
                    employee.AmharicName = addEmployee.AmharicName;
                    employee.PhoneNumber = addEmployee.PhoneNumber;

                    employee.Email = addEmployee.Email;
                    if (addEmployee.Gender != null)
                    {
                        employee.Gender = Enum.Parse<Gender>(addEmployee.Gender);
                    }
                    if (addEmployee.MaritalStatus != null)
                    {
                        employee.MaritalStatus = Enum.Parse<MaritalStatus>(addEmployee.MaritalStatus);
                    }

                    if (addEmployee.PaymentType != null)
                    {
                        employee.PaymentType = Enum.Parse<EmployeePaymentType>(addEmployee.PaymentType);
                    }

                    if (path != "")
                    {
                        employee.ImagePath = path;
                    }
                    employee.EmploymentDate = addEmployee.EmploymentDate;
                    employee.ContractEndDate = addEmployee.ContractEndDate;
                    employee.Salary = addEmployee.Salary;
                    employee.SourceOfSalary = addEmployee.SourceOfSalary;
                    employee.BankAccountNo = addEmployee.BankAccountNo;
                    employee.BirthDate = addEmployee.BirthDate;
                    employee.Woreda = addEmployee.Woreda;

                    await _dbContext.SaveChangesAsync();

                    return new ResponseMessage
                    {

                        Message = "Volunter Updated Successfully ",
                        Success = true
                    };
                }

                else
                {
                    return new ResponseMessage
                    {

                        Message = "Volunter Not Found !!",
                        Success = true
                    };
                }

            }
            catch (Exception ex)
            {
                return new ResponseMessage
                {

                    Message = ex?.InnerException.Message,
                    Success = true
                };

            }


        }

        public async Task<List<EmployeeBankListDto>> EmployeeBanks(Guid employeeId)
        {
            var bankLists = await _dbContext.EmployeeBanks.AsNoTracking().Include(x => x.Bank).Where(x => x.EmployeeId == employeeId)
                                   .Select(x => new EmployeeBankListDto
                                   {
                                       Id = x.Id,
                                       AccountNumber = x.BankAccountNo,
                                       BankName = x.Bank.BankName,
                                       IsSalaryBank = x.IsSalaryBank,
                                   }).ToListAsync();

            return bankLists;
        }

        public async Task<ResponseMessage> AddEmployeeBank(AddEmployeeBankDto employeeBank)
        {
            var currentBank = await _dbContext.BankLists.FirstOrDefaultAsync(x => x.Id == employeeBank.BankId);
            if (currentBank == null)
                return new ResponseMessage { Success = false, Message = "Could not find account number" };

            if (employeeBank.AccountNumber.Length != currentBank.BankDigitNumber)
                return new ResponseMessage { Success = false, Message = "Please correct the digit number" };

            //var empBank = await _dbContext.EmployeeBanks.AnyAsync(x => x.BankId == employeeBank.BankId);
            //if(empBank)
            //    return new ResponseMessage { Success = false, Message = "Bank Already exists" };

            EmployeeBank bank = new EmployeeBank()
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                CreatedById = employeeBank.CreatedById,
                BankAccountNo = employeeBank.AccountNumber,
                BankId = employeeBank.BankId,
                IsSalaryBank = employeeBank.IsSalaryBank,
                EmployeeId = employeeBank.EmployeeId,
                Rowstatus = RowStatus.ACTIVE,
            };

            await _dbContext.EmployeeBanks.AddAsync(bank);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage { Success = true, Message = "Added Successfully!!" };
        }


        //history
        public async Task<List<EmployeeHistoryDto>> GetEmployeeHistory(Guid employeeId)
        {
            var employeeHistories = await _dbContext.EmploymentDetails.Where(x => x.EmployeeId == employeeId).Include(x => x.Department).Include(x => x.Position)
                                          .OrderByDescending(x => x.CreatedDate).AsNoTracking()
                                .ProjectTo<EmployeeHistoryDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();
            return employeeHistories;
        }
        public async Task<ResponseMessage> AddEmployeeHistory(EmployeeHistoryPostDto addEmployeeHistory)
        {


            var currentHistories = await _dbContext.EmploymentDetails.Where(x => x.Rowstatus == RowStatus.ACTIVE && x.EmployeeId == addEmployeeHistory.EmployeeId).ToListAsync();

            currentHistories.ForEach(x =>
            {
                x.Rowstatus = RowStatus.INACTIVE;
            });

            await _dbContext.SaveChangesAsync();

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
                Salary = addEmployeeHistory.Salary,
                SourceOfSalary = Enum.Parse<SALARYSOURCE>(addEmployeeHistory.SourceOfSalary),
                Remark = addEmployeeHistory.Remark,
                Woreda = addEmployeeHistory.Woreda,
                ZoneId = addEmployeeHistory.ZoneId,

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
                currentEmployeeHistory.SourceOfSalary = Enum.Parse<SALARYSOURCE>(updateEmployeeHistory.SourceOfSalary);
                currentEmployeeHistory.Remark = updateEmployeeHistory.Remark;
                currentEmployeeHistory.Woreda = updateEmployeeHistory.Woreda;
                currentEmployeeHistory.ZoneId = updateEmployeeHistory.ZoneId;

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
                return new ResponseMessage { Message = "Successfully Deleted", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee History" };
        }


        ////  employeeFiles

        //public async Task<List<EmployeeFileGetDto>> GetEmployeeFiles(Guid employeeId)
        //{
        //    var employeeHistories = await _dbContext.EmployeeFiles.Where(x => x.EmployeeId == employeeId).AsNoTracking()
        //                       .ProjectTo<EmployeeFileGetDto>(_mapper.ConfigurationProvider)
        //                       .ToListAsync();
        //    return employeeHistories;
        //}
        //public async Task<ResponseMessage> AddEmployeeFiles(EmployeeFilePostDto addEmployeeFile)
        //{

        //    var id = Guid.NewGuid();
        //    var path = "";
        //    if (addEmployeeFile.FilePath != null)
        //        path = _generalConfig.UploadFiles(addEmployeeFile.FilePath, id.ToString(), "Employee").Result.ToString();

        //    EmployeeFile employeeFile = new EmployeeFile()
        //    {
        //        Id = Guid.NewGuid(),
        //        CreatedById = addEmployeeFile.CreatedById,
        //        CreatedDate = DateTime.Now,
        //        EmployeeId = addEmployeeFile.EmployeeId,
        //        FileName = addEmployeeFile.FileName,
        //        FilePath = path,
        //    };

        //    await _dbContext.EmployeeFiles.AddAsync(employeeFile);
        //    await _dbContext.SaveChangesAsync();

        //    return new ResponseMessage
        //    {

        //        Message = "Added Successfully",
        //        Success = true
        //    };
        //}
        //public async Task<ResponseMessage> UpdateEmployeeFiles(EmployeeFileGetDto updateEmployeeFile)
        //{


        //    var path = "";

        //    var employeeFile = _dbContext.EmployeeFiles.Find(updateEmployeeFile.Id);


        //    if (updateEmployeeFile.File != null)
        //        path = _generalConfig.UploadFiles(updateEmployeeFile.File, employeeFile.Id.ToString(), "Employee").Result.ToString();

        //    if (employeeFile != null)
        //    {


        //        employeeFile.FileName = updateEmployeeFile.FileName;

        //        if (path != "")
        //        {
        //            employeeFile.FilePath = path;
        //        }
        //        await _dbContext.SaveChangesAsync();
        //        return new ResponseMessage { Message = "Successfully Updated", Success = true };
        //    }
        //    return new ResponseMessage { Success = false, Message = "Unable To Find Employee Files" };


        //}
        //public async Task<ResponseMessage> DeleteEmployeeFiles(Guid employeeFileId)
        //{
        //    var currentEmployeeFile = await _dbContext.EmployeeFiles.FindAsync(employeeFileId);

        //    if (currentEmployeeFile != null)
        //    {

        //        _dbContext.Remove(currentEmployeeFile);
        //        await _dbContext.SaveChangesAsync();
        //        return new ResponseMessage { Message = "Successfully Deleted", Success = true };
        //    }
        //    return new ResponseMessage { Success = false, Message = "Unable To Find Employee File" };
        //}

        // employeesuerty
        public async Task<List<EmployeeSuertyGetDto>> GetEmployeeSurety(Guid employeeId)
        {
            var employeeHistories = await _dbContext.EmployeeSureties.Where(x => x.EmployeeId == employeeId).AsNoTracking()
                               .ProjectTo<EmployeeSuertyGetDto>(_mapper.ConfigurationProvider)
                               .ToListAsync();
            return employeeHistories;
        }
        public async Task<ResponseMessage> AddEmployeeSurety(EmployeeSuretyPostDto addEmployeeSuerty)
        {

            var id = Guid.NewGuid();
            var photoPath = "";
            var letterPath = "";
            var idCardPath = "";
            if (addEmployeeSuerty.Photo != null)
                photoPath = _generalConfig.UploadFiles(addEmployeeSuerty.Photo, $"{id.ToString()}-photo", "Employee").Result.ToString();

            if (addEmployeeSuerty.Letter != null)
                letterPath = _generalConfig.UploadFiles(addEmployeeSuerty.Letter, $"{id.ToString()}-letter", "Employee").Result.ToString();

            if (addEmployeeSuerty.IdCard != null)
                idCardPath = _generalConfig.UploadFiles(addEmployeeSuerty.IdCard, $"{id.ToString()}-idcard", "Employee").Result.ToString();

            EmployeeSurety employeeFile = new EmployeeSurety()
            {
                Id = id,
                CreatedById = addEmployeeSuerty.CreatedById,
                CreatedDate = DateTime.Now,
                FullName = addEmployeeSuerty.FullName,
                PhoneNumber = addEmployeeSuerty.PhoneNumber,
                SuretyAddress = addEmployeeSuerty.SuretyAddress,
                CompanyName = addEmployeeSuerty.CompanyName,
                CompnayPhoneNumber = addEmployeeSuerty.CompnayPhoneNumber,
                EmployeeId = addEmployeeSuerty.EmployeeId,
                PhotoPath = photoPath,
                LetterPath = letterPath,
                IdCardPath = idCardPath

            };


            await _dbContext.EmployeeSureties.AddAsync(employeeFile);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };
        }
        public async Task<ResponseMessage> UpdateEmployeeSurety(EmployeeSuretyPostDto updateEmployeeSuerty)
        {


            var employeeFile = _dbContext.EmployeeSureties.Find(updateEmployeeSuerty.Id);

            var photoPath = "";
            var letterPath = "";
            var idCardPath = "";
            if (updateEmployeeSuerty.Photo != null)
                photoPath = _generalConfig.UploadFiles(updateEmployeeSuerty.Photo, $"{employeeFile.Id.ToString()}-photo", "Employee").Result.ToString();

            if (updateEmployeeSuerty.Letter != null)
                letterPath = _generalConfig.UploadFiles(updateEmployeeSuerty.Letter, $"{employeeFile.Id.ToString()}-letter", "Employee").Result.ToString();

            if (updateEmployeeSuerty.IdCard != null)
                idCardPath = _generalConfig.UploadFiles(updateEmployeeSuerty.IdCard, $"{employeeFile.Id.ToString()}-idcard", "Employee").Result.ToString();


            if (employeeFile != null)
            {

                employeeFile.FullName = updateEmployeeSuerty.FullName;
                employeeFile.PhoneNumber = updateEmployeeSuerty.PhoneNumber;
                employeeFile.SuretyAddress = updateEmployeeSuerty.SuretyAddress;
                employeeFile.CompanyName = updateEmployeeSuerty.CompanyName;
                employeeFile.CompnayPhoneNumber = updateEmployeeSuerty.CompnayPhoneNumber;

                if (photoPath != "")
                {
                    employeeFile.PhotoPath = photoPath;
                }
                if (letterPath != "")
                {
                    employeeFile.LetterPath = letterPath;
                }
                if (idCardPath != "")
                {
                    employeeFile.IdCardPath = idCardPath;
                }



                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Updated", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Suerty" };


        }
        public async Task<ResponseMessage> DeleteEmployeeSurety(Guid employeeFileId)
        {
            var currentEmployeeFile = await _dbContext.EmployeeSureties.FindAsync(employeeFileId);

            if (currentEmployeeFile != null)
            {

                _dbContext.Remove(currentEmployeeFile);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Deleted", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Suerty" };
        }
        //salary History 

        public async Task<List<EmployeeSalaryGetDto>> GetEmployeeSalaryHistory(Guid employeeDetailId)
        {
            var employeeSalaryHistories = await _dbContext.EmployeeSalaries.Where(x => x.EmploymentDetailId == employeeDetailId).AsNoTracking()
                                .ProjectTo<EmployeeSalaryGetDto>(_mapper.ConfigurationProvider)
                                .ToListAsync();
            return employeeSalaryHistories;
        }
        public async Task<ResponseMessage> AddEmployeeSalaryHistory(EmployeeSalryPostDto addEmployeeHistory)
        {


            EmployeeSalary employmentDetail = new EmployeeSalary()
            {
                Id = Guid.NewGuid(),
                CreatedById = addEmployeeHistory.CreatedById,
                CreatedDate = DateTime.Now,
                ProjectId = addEmployeeHistory.ProjectId,
                Percentile = addEmployeeHistory.Percentile,
                EmploymentDetailId = addEmployeeHistory.EmployeeDetailId

            };
            await _dbContext.EmployeeSalaries.AddAsync(employmentDetail);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {

                Message = "Added Successfully",
                Success = true
            };

        }
        public async Task<ResponseMessage> UpdateEmployeeSalaryHistory(EmployeeSalaryGetDto updateEmployeeSalary)
        {
            var currentEmployeeHistory = await _dbContext.EmployeeSalaries.FirstOrDefaultAsync(x => x.Id.Equals(updateEmployeeSalary.Id));

            if (currentEmployeeHistory != null)
            {

                currentEmployeeHistory.ProjectId = updateEmployeeSalary.ProjectId;
                currentEmployeeHistory.Percentile = updateEmployeeSalary.Percentile;


                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Updated", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee History" };
        }
        public async Task<ResponseMessage> deleteEmployeeSalaryHistory(Guid employeeSalaryHistoryId)
        {

            var currentEmployeeHistory = await _dbContext.EmployeeSalaries.FindAsync(employeeSalaryHistoryId);

            if (currentEmployeeHistory != null)
            {

                _dbContext.Remove(currentEmployeeHistory);
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Message = "Successfully Deleted", Success = true };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Employee Salary History" };
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
                currentEmployeeFamily.Gender = Enum.Parse<Gender>(updateEmployeeFamily.Gender);
                currentEmployeeFamily.FamilyRelation = Enum.Parse<FamilyRelation>(updateEmployeeFamily.FamilyRelation);
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



        public async Task<List<SelectListDto>> GetEmployeeswithContractend()
        {
            DateTime tenDaysFromNow = DateTime.Now.AddDays(10);

            var employees = await _dbContext.Employees
                .Where(x => x.ContractEndDate < DateTime.Now || x.ContractEndDate <= tenDaysFromNow)
                .Select(x => new SelectListDto
                {
                    Id = x.Id,
                    Name = $"{x.FirstName} {x.MiddleName} {x.LastName} / {x.Email}",
                    Reason = x.ContractEndDate < DateTime.Now ? $"Contract expired on {x.ContractEndDate}" : $"Contract Remining days is 10 or less "

                }).ToListAsync();

            return employees;
        }
    }






}