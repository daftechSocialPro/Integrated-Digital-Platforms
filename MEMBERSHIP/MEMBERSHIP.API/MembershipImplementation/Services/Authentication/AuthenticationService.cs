using Implementation.DTOS.Authentication;

using Implementation.Helper;
using Implementation.Interfaces.Authentication;
using MembershipImplementation.DTOS.Configuration;
using MembershipInfrustructure.Data;
using MembershipInfrustructure.Model.Authentication;
using MembershipInfrustructure.Model.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;
using Microsoft.IdentityModel.Tokens;
using System.Collections.Generic;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

using static MembershipInfrustructure.Data.EnumList;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace Implementation.Services.Authentication
{

    public class AuthenticationService : IAuthenticationService
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManager;
        private readonly ApplicationDbContext _dbContext;
      
        public AuthenticationService(UserManager<ApplicationUser> userManager,
            
            ApplicationDbContext dbContext,
         
              RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _dbContext = dbContext;
     
        }


        public async Task<ResponseMessage> Login(LoginDto login)
        {
            var user = await _userManager.FindByNameAsync(login.UserName);

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

              

                if (user.AdminId != null)
                {
                    var str = System.String.Join(",", roleList);

                    var admins = await _dbContext.Admins.Include(x=>x.Region).FirstOrDefaultAsync(x => x.Id == user.AdminId);

                    var regionName = admins.RegionId != null ? admins.Region.RegionName : "";
                    var regionId = admins.RegionId!=null? admins.RegionId.ToString():"";
                    if (admins != null)
                    {

                        

                        var TokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                            {
                        new Claim("userId", user.Id.ToString()),
                        new Claim("loginId", user.MemberId.ToString()),
                        new Claim("fullName", admins.FullName),
                        new Claim("photo",admins?.ImagePath),
                        new Claim("isProfileCompleted",true.ToString()),
                        new Claim("isExpired",false.ToString()),
                        new Claim("regionId",regionName),  
                        new Claim("region",regionId),



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
                        Message = "could not find user"
                    };

                }
                else
                {
                    var member = await (from me in _dbContext.Members.Where(x => x.Id == user.MemberId)
                                        join payment in _dbContext.MemberPayments on me.Id equals payment.MemberId into memberPayments
                                        let latestPayment = memberPayments.OrderByDescending(x => x.LastPaid).FirstOrDefault()
                                        select new MembersGetDto
                                        {
                                            Id = me.Id.ToString(),
                                            FullName = me.FullName,
                                            IsProfileCompleted = me.IsProfileCompleted,
                                            ExpiredDate = latestPayment!=null?latestPayment.ExpiredDate:DateTime.Now,
                                            
                                        }).FirstOrDefaultAsync();
                    if (member != null)
                    {
                        var todayDate  = DateTime.Now;
                        var isExpired = member.ExpiredDate.Date < todayDate.Date;
                        var TokenDescriptor = new SecurityTokenDescriptor
                        {
                            Subject = new System.Security.Claims.ClaimsIdentity(new Claim[]
                            {
                        new Claim("userId", user.Id.ToString()),
                        new Claim("loginId", user.MemberId.ToString()),
                        new Claim("fullName", $"{member.FullName}"),
                        new Claim("photo",""),
                        new Claim("isProfileCompleted",member.IsProfileCompleted.ToString()),
                        new Claim("isExpired",isExpired.ToString()),
                        new Claim(_options.ClaimsIdentity.RoleClaimType, "Member"),

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
                        Message = "could not find Member"
                    };
                }

            }
            else
                return new ResponseMessage()
                {
                    Success = false,
                    Message = "Invalid User Name or Password"
                };

        }

        public async Task<List<UserListDto>> GetUserList()
        {
            var userList = await _userManager.Users.ToListAsync();
            var userLists = new List<UserListDto>();

            foreach (var user in userList)
            {

                if (user.AdminId!=Guid.Empty)
                {

                    var admin = _dbContext.Admins.Find(user.AdminId);
                    var userListt = new UserListDto()
                    {
                        Id = user.Id,
                        UserId = user.AdminId,
                        UserName = user.UserName,
                        Name = admin.FullName ,
                        Status = user.RowStatus.ToString(),
                        ImagePath = admin.ImagePath,
                        Email = admin.Email,


                    };
                    userListt.Roles = await GetAssignedRoles(user.Id, 1);

                    userLists.Add(userListt);
                }
                else
                {

                    var member = _dbContext.Members.Find(user.AdminId);
                    var userListt = new UserListDto()
                    {
                        Id = user.Id,
                        UserId = user.MemberId,
                        UserName = user.UserName,
                        Name = member.FullName,
                        Status = user.RowStatus.ToString(),
                        ImagePath = member.ImagePath,
                        Email = member.Email,


                    };
                    userListt.Roles = await GetAssignedRoles(user.Id, 1);

                    userLists.Add(userListt);

                }


              
             

            }



            return userLists;
        }

        public async Task<ResponseMessage> AddUser(AddUSerDto addUSer)
        {
            
            if (addUSer.MemberId != Guid.Empty)
            {

               

                var currentEmployee = _userManager.Users.Any(x => x.UserName.Equals(addUSer.UserName));
                if (currentEmployee)
                    return new ResponseMessage { Success = false, Message = "Member Already Exists" };

                var currentUser = _userManager.Users.Where(x => x.MemberId.Equals(addUSer.MemberId)).FirstOrDefault();
                if (currentUser!=null)
                {
                    _dbContext.Users.Remove(currentUser);
                    _dbContext.SaveChanges();
                }

                var applicationUser = new ApplicationUser
                {
                    MemberId = addUSer.MemberId,
                    Email = addUSer.UserName ,
                    UserName = addUSer.UserName,
                    RowStatus = RowStatus.ACTIVE,
                };

                var response = await _userManager.CreateAsync(applicationUser, addUSer.Password);
            }
            return new ResponseMessage { Success = true, Message = "Succesfully Added User"};



        }

        public async Task<List<RoleDropDown>> GetRoleCategory()
        {
            var roleCategory = await _roleManager.Roles.Select(x => new RoleDropDown
            {
                Id = x.Id.ToString(),
                Name = x.NormalizedName,
            }).ToListAsync();

            return roleCategory;
        }
        public async Task<List<RoleDropDown>> GetNotAssignedRole(string userId, int categoryId)
        {
            var currentuser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));
            if (currentuser != null)
            {
                var currentRoles = await _userManager.GetRolesAsync(currentuser);
                if (currentRoles.Any())
                {
                    var notAssignedRoles = await _roleManager.Roles.
                                  Where(x => 
                                  !currentRoles.Contains(x.Name)).Select(x => new RoleDropDown
                                  {
                                      Id = x.Id,
                                      Name = x.Name
                                  }).ToListAsync();

                    return notAssignedRoles;
                }
                else
                {
                    var notAssignedRoles = await _roleManager.Roles
                                .Select(x => new RoleDropDown
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
                    var notAssignedRoles = await _roleManager.Roles.
                                      Where(x => 
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

        public async Task<ResponseMessage> AssignRole(UserRoleDto userRole)
        {
            var currentUser = await _userManager.Users.FirstOrDefaultAsync(x=>x.Id==userRole.UserId);

            if (currentUser != null)
            {
                var roleExists = await _roleManager.RoleExistsAsync(userRole.RoleName);

                if (roleExists)
                {
                    await _userManager.AddToRoleAsync(currentUser, userRole.RoleName);
                    return new ResponseMessage { Success = true, Message = "Successfully Added Role" };
                }
                else
                {
                    return new ResponseMessage { Success = false, Message = "Role does not exist" };
                }
            }
            else
            {
                return new ResponseMessage { Success = false, Message = "User Not Found" };
            }
        }


        public async Task<ResponseMessage> RevokeRole(UserRoleDto userRole)
        {
            var curentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userRole.UserId));

            if (curentUser != null)
            {
                await _userManager.RemoveFromRoleAsync(curentUser, userRole.RoleName);
                return new ResponseMessage { Success = true, Message = "Succesfully Revoked Roles" };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };

        }

        public async Task<ResponseMessage> ChangeStatusOfUser(string userId)
        {
            var curentUser = await _userManager.Users.FirstOrDefaultAsync(x => x.Id.Equals(userId));

            if (curentUser != null)
            {
                curentUser.RowStatus = curentUser.RowStatus == RowStatus.ACTIVE ? RowStatus.INACTIVE : RowStatus.ACTIVE;
                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Success = true, Message = "Succesfully Changed Status of User", Data = curentUser.Id };
            }
            return new ResponseMessage { Success = false, Message = "User Not Found" };
        }
    }
}
