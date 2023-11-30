using Implementation.DTOS.Authentication;

using Implementation.Helper;
using Implementation.Interfaces.Authentication;
using IntegratedImplementation.Helper;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedInfrustructure.Data;
using IntegratedInfrustructure.Model.Authentication;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using static IntegratedInfrustructure.Data.EnumList;

namespace Implementation.Services.Authentication
{
  
    public class AuthenticationService : IAuthenticationService
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signinManager;
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfig;
        private readonly IEmailService _emailService;

        public AuthenticationService(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signinManager, ApplicationDbContext dbContext, IGeneralConfigService generalConfig, IEmailService emailService)
        {
            _userManager = userManager;
            _signinManager = signinManager;
            _dbContext = dbContext;
            _generalConfig = generalConfig;
            _emailService = emailService;
        }

      
        public async Task<ResponseMessage> Login(LoginDto login)
        {

            try
            {
                var user = await _userManager.FindByEmailAsync(login.UserName);
             

                if (user != null && await _userManager.CheckPasswordAsync(user, login.Password))
                {
                    if (user.RowStatus == RowStatus.INACTIVE)
                        return new ResponseMessage()
                        {
                            Success = false,
                            Message = "Error!! please contact Your Admin"
                        };
                    var roleList = await _userManager.GetRolesAsync(user);
                    IdentityOptions _options = new IdentityOptions();
                    var str = String.Join(",", roleList);
                    var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == user.EmployeeId);
                    if (employee != null)
                    {

                        var TokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                            {
                        new Claim("userId", user.Id.ToString()),
                        new Claim("employeeId", user.EmployeeId.ToString()),
                        new Claim("fullName", $"{employee.FirstName} {employee.MiddleName}"),
                        new Claim("photo",employee?.ImagePath),
                        new Claim("ChangePassword",user.PasswordChanged.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, str),

                            }),
                            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes("1225290901686999272364748849994004994049404940")), SecurityAlgorithms.HmacSha256Signature)
                        };

                        var TokenHandler = new JwtSecurityTokenHandler();
                        var SecurityToken = TokenHandler.CreateToken(TokenDescriptor);
                        var token = TokenHandler.WriteToken(SecurityToken);
                        return new ResponseMessage()
                        {
                            Success = true,
                            Message = "Login Success",
                            Data = token
                        };
                    }

                    return new ResponseMessage()
                    {
                        Success = false,
                        Message = "could not find Employee"
                    };
                }
                else
                    return new ResponseMessage()
                    {
                        Success = false,
                        Message = "Invalid User Name or Password"
                    };
            }
            catch(Exception ex)
            {
                return new ResponseMessage()
                {
                    Success = false,
                    Message = ex.Message
                };
            }

        }


        public async Task<ResponseMessage> ForgetPassword(string email)
        {
            try
            {
                var user = await _userManager.FindByEmailAsync(email);


                if (user != null)
                {
                    if (user.RowStatus == RowStatus.INACTIVE)
                        return new ResponseMessage()
                        {
                            Success = false,
                            Message = "Error!! please contact Your Adminstrator"
                        };

                    var generatedPass = _generalConfig.GeneratePassword();

                    var result = await _userManager.RemovePasswordAsync(user);
                    if (result.Succeeded)
                    {
                        var changeResult = await _userManager.AddPasswordAsync(user, generatedPass);

                        if (changeResult.Succeeded)
                        {
                            var employee = await _dbContext.Employees.FirstOrDefaultAsync(x => x.Id == user.EmployeeId);

                            if (employee == null)
                                return new ResponseMessage { Success = false, Message = "Could Not Find Employee" };

                            var sendEmail = new EmailMetadata
                             (user.Email, "Forgot Password",
                          $"Dear {employee.FirstName} {employee.MiddleName} {employee.LastName} , " +
                          $"\n\n and your password is {generatedPass}\n\n Please Dont share Your password to " +
                          $"anyone and change the password as soon as you login to the system. \n\n\n Regards,\nEMIA");
                            await _emailService.Send(sendEmail);


                            return new ResponseMessage { Success = true, Message = "Please Check Your Email for further details" };
                        }

                        return new ResponseMessage { Success = false, Message = "Error has Occured Please Try again" };
                    }
                    return new ResponseMessage { Success = false, Message = "Error has Occured Please Try again" };
                }
                else
                    return new ResponseMessage()
                    {
                        Success = false,
                        Message = "Enterd Email is not correct"
                    };
            }
            catch (Exception ex)
            {
                return new ResponseMessage()
                {
                    Success = false,
                    Message = ex.Message
                };
            }
        }

        public async Task<List<UserListDto>> GetUserList()
        {
            var userList = await _userManager.Users.ToListAsync();

            var users = new List<UserListDto>();
            foreach (var user in userList)
            {
                var useer = new UserListDto();
                var emp = _dbContext.Employees.
                    Include(x=>x.EmployeeDetail).ThenInclude(x=>x.Department).
                    Include(x => x.EmployeeDetail).ThenInclude(x => x.Position)
                    .Where(x=>x.Id== user.EmployeeId).FirstOrDefault();
                if (emp != null)
                {
                    useer.Id = user.Id;
                    useer.EmployeeId = user.EmployeeId;
                    useer.UserName = user.UserName;
                    useer.Name = emp.FirstName + " " + emp.MiddleName;
                    useer.Status = user.RowStatus.ToString();
                    useer.ImagePath = emp.ImagePath;
                    useer.Department = emp.EmployeeDetail.Any()? emp.EmployeeDetail.OrderByDescending(x=>x.StartDate).FirstOrDefault().Department.DepartmentName:"";
                    useer.Position = emp.EmployeeDetail.Any()? emp.EmployeeDetail.FirstOrDefault().Position.PositionName:"";
                    useer.Email = emp.Email;
                    useer.PhoneNumber = emp.PhoneNumber;
                    useer.Roles = (await _userManager.GetRolesAsync(user)).ToList();
                };

                users.Add(useer);

            }

            return users;
        }

        public async Task<ResponseMessage> AddUser(AddUSerDto addUSer)
        {
            var currentEmployee = _dbContext.Users.Any(x => x.EmployeeId.Equals(addUSer.EmployeeId));
             
            if(currentEmployee)
                return new ResponseMessage { Success = false, Message = "Employee Already Exists" };

            var employee = _dbContext.Employees.Find(addUSer.EmployeeId);
            var applicationUser = new ApplicationUser
            {
                EmployeeId = addUSer.EmployeeId,
                Email = employee.Email,
                UserName = addUSer.UserName,
                RowStatus = RowStatus.ACTIVE,
                PasswordChanged = false
            };

            await _userManager.CreateAsync(applicationUser, addUSer.Password);

            return new ResponseMessage { Success = true, Message = "Succesfully Added User", Data = applicationUser.UserName };
        }

        public async Task<List<RoleDropDown>> GetRoleCategory()
        {
            var roleCategory = await _dbContext.RoleCategories.Select(x => new RoleDropDown
            {
                Id = x.Id.ToString(),
                Name = x.CategoryName,
            }).ToListAsync();

            return roleCategory;
        }

        public async Task<List<RoleDropDown>> GetNotAssignedRole(string userId, int categoryId)
        {
           var currentuser  = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
            if(currentuser != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(currentuser);
                if (currentRoles.Any())
                {
                    var notAssignedRoles = await _dbContext.Roles.
                                  Where(x => x.RoleCategoryId.Equals(categoryId) &&
                                  !currentRoles.Contains(x.Name)).Select(x => new RoleDropDown
                                  {
                                      Id = x.Id,
                                      Name = x.Name
                                  }).ToListAsync();

                    return notAssignedRoles;
                }
                else
                {
                    var notAssignedRoles = await _dbContext.Roles.
                                  Where(x => x.RoleCategoryId.Equals(categoryId)).Select(x => new RoleDropDown
                                  {
                                      Id = x.Id,
                                      Name = x.Name
                                  }).ToListAsync();

                    return notAssignedRoles;

                }
          
               
            }

            throw new FileNotFoundException();
        }

        public async Task<List<RoleDropDown>> GetAssignedRoles(string userId, int categoryId)
        {
            var currentuser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
            if (currentuser != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(currentuser);
                if (currentRoles.Any())
                {
                    var notAssignedRoles = await _dbContext.Roles.
                                      Where(x => x.RoleCategoryId.Equals(categoryId) &&
                                      currentRoles.Contains(x.Name)).Select(x => new RoleDropDown
                                      {
                                          Id = x.Id,
                                          Name = x.Name
                                      }).ToListAsync();

                    return notAssignedRoles;
                }

                return new List<RoleDropDown>();
                
            }

            throw new FileNotFoundException();
        }

        public async Task<ResponseMessage> AssingRole(UserRoleDto userRole)
        {
            var curentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userRole.UserId));

            if (curentUser != null)
            {
                await _userManager.AddToRolesAsync(curentUser, userRole.RoleName);             
                return new ResponseMessage { Success = true, Message = "Succesfully Added Roles" };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };

        }

        public async Task<ResponseMessage> RevokeRole(UserRoleDto userRole)
        {
            var curentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userRole.UserId));

            if (curentUser != null)
            {
                await _userManager.RemoveFromRolesAsync(curentUser, userRole.RoleName);
                return new ResponseMessage { Success = true, Message = "Succesfully Revoked Roles" };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };

        }

        public async Task<ResponseMessage> ChangeStatusOfUser(string userId)
        {
            var curentUser = await _dbContext.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));

            if (curentUser != null)
            {
                curentUser.RowStatus = curentUser.RowStatus == RowStatus.ACTIVE ? RowStatus.INACTIVE : RowStatus.ACTIVE;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Succesfully Changed Status of User", Data = curentUser.Id };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };
        }


        public async Task<ResponseMessage> ChangePassword(ChangePasswordModel model)
        {
            var user = await _userManager.FindByIdAsync(model.UserId);

            if (user == null)
            {
                return new ResponseMessage{

                    Success=false,
                    Message = "User not found."};
            }
             user.PasswordChanged = true;
               
            await _dbContext.SaveChangesAsync();
               
            var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

            if (!result.Succeeded)
            {
                return new ResponseMessage
                {
                    Success = false,
                    Message = result.Errors.ToString()
                };
            }

            return new ResponseMessage { Message = "Password changed successfully.", Success = true };
        }

    }
}
