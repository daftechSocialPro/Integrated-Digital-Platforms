using Implementation.DTOS.Authentication;
using Implementation.Helper;
using Implementation.Interfaces.Authentication;
using MembershipImplementation.DTOS.Configuration;
using MembershipImplementation.Interfaces.Configuration;
using MembershipInfrustructure.Data;
using MembershipInfrustructure.Model.Authentication;
using MembershipInfrustructure.Model.Configuration;
using MembershipInfrustructure.Model.Users;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static MembershipInfrustructure.Data.EnumList;

namespace MembershipImplementation.Services.Configuration
{
    public class RegionService : IRegionService
    {

        private readonly ApplicationDbContext _dbContext;

         private UserManager<ApplicationUser> _userManager;

        public RegionService(ApplicationDbContext dbContext,   UserManager<ApplicationUser> userManager)
        {
            _dbContext = dbContext;
            _userManager = userManager;
        }


        public async Task<ResponseMessage> AddRegion(RegionPostDto RegionPost)
        {
            Region Region = new Region
            {
                Id = Guid.NewGuid(),
                RegionName = RegionPost.RegionName,
                CountryType = Enum.Parse<CountryType>(RegionPost.CountryType),
                CreatedById = RegionPost.CreatedById,
                Rowstatus = RowStatus.ACTIVE
            };

            await _dbContext.Regions.AddAsync(Region);
            await _dbContext.SaveChangesAsync();

            return new ResponseMessage
            {
                Data = Region,
                Message = "Added Successfully",
                Success = true
            };
        }


        public async Task<List<RegionGetDto>> GetRegionList()
        {
            var RegionList = await _dbContext.Regions.AsNoTracking().Select(x => new RegionGetDto
            {
                Id = x.Id,
                RegionName = x.RegionName,
                CountryName = x.CountryType.ToString(),
                UserName = _dbContext.Admins.Where(e=>e.RegionId== x.Id).Any()? _dbContext.Admins.Where(e => e.RegionId == x.Id).FirstOrDefault().FullName:"",
              


            }).ToListAsync();

            return RegionList;
        }

        public async Task<ResponseMessage> UpdateRegion(RegionPostDto RegionPost)
        {
            var currentRegion = await _dbContext.Regions.FirstOrDefaultAsync(x => x.Id == RegionPost.Id);

            if (currentRegion != null)
            {
                currentRegion.RegionName = RegionPost.RegionName;
                currentRegion.CountryType = Enum.Parse<CountryType>(RegionPost.CountryType);

                await _dbContext.SaveChangesAsync();


                if (RegionPost.UserName != null)
                {
                    var adminregion = await _dbContext.Admins.Where(x => x.RegionId == currentRegion.Id).ToListAsync();

                    if (!adminregion.Any())
                    {
                        var admin = new Admin
                        {

                            Id = Guid.NewGuid(),
                            ImagePath = "/wwwroot/user/default.png",
                            Email = RegionPost.UserName + "@emia.com",
                            FullName = RegionPost.UserName,
                            CreatedById = currentRegion.CreatedById,
                            CreatedDate = DateTime.Now,
                            RegionId = currentRegion.Id,

                        };

                        _dbContext.Admins.Add(admin);
                        await _dbContext.SaveChangesAsync();



                        var applicationUser = new ApplicationUser
                        {
                            AdminId = admin.Id,
                            Email = admin.Email,
                            UserName = RegionPost.UserName,
                            RowStatus = RowStatus.ACTIVE,
                        };

                        var response = await _userManager.CreateAsync(applicationUser, RegionPost.Password);
                        await _dbContext.SaveChangesAsync();

                        var roles = new List<string>();
                        roles.Add("RegionAdmin");

                        await _userManager.AddToRolesAsync(applicationUser, roles);
                        await _dbContext.SaveChangesAsync();
                    }

                    else
                    {
                        var user = _dbContext.Users.FirstOrDefault(x => x.UserName == adminregion.FirstOrDefault().FullName);

                        if (user != null)
                        {
                            _dbContext.RemoveRange(user);
                            _dbContext.RemoveRange(adminregion);
                            _dbContext.SaveChanges();
                        }


                        var admin = new Admin
                        {

                            Id = Guid.NewGuid(),
                            ImagePath = "/wwwroot/user/default.png",
                            Email = RegionPost.UserName + "@emia.com",
                            FullName = RegionPost.UserName,
                            CreatedById = currentRegion.CreatedById,
                            CreatedDate = DateTime.Now,
                            RegionId = currentRegion.Id,

                        };

                        _dbContext.Admins.Add(admin);
                        await _dbContext.SaveChangesAsync();



                        var applicationUser = new ApplicationUser
                        {
                            AdminId = admin.Id,
                            Email = admin.Email,
                            UserName = RegionPost.UserName,
                            RowStatus = RowStatus.ACTIVE,
                        };

                        if (RegionPost.Password != null)
                        {

                            var response = await _userManager.CreateAsync(applicationUser, RegionPost.Password);
                            await _dbContext.SaveChangesAsync();

                            var roles = new List<string>();
                            roles.Add("RegionAdmin");

                            await _userManager.AddToRolesAsync(applicationUser, roles);
                            await _dbContext.SaveChangesAsync();
                        }


                    }
                }















                return new ResponseMessage { Data = currentRegion, Success = true, Message = "Updated Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Region" };
        }
        public async Task<ResponseMessage> DeleteRegion(Guid regionId)
        {
            var currentRegion = await _dbContext.Regions.FindAsync(regionId);

            if (currentRegion != null)
            {
                

                var adminRegions = _dbContext.Admins.Where(x => x.RegionId == regionId).ToList();

                foreach(var adminRegion in adminRegions)
                {
                    var user = _dbContext.Users.FirstOrDefault(x => x.UserName == adminRegion.FullName);

                    if (user != null)
                    {
                        _dbContext.RemoveRange(user);

                    }
                    _dbContext.RemoveRange(adminRegion);
                    _dbContext.SaveChanges();
                }
             
                _dbContext.Remove(currentRegion);

                await _dbContext.SaveChangesAsync();
                return new ResponseMessage { Data = currentRegion, Success = true, Message = "Deleted Successfully" };
            }
            return new ResponseMessage { Success = false, Message = "Unable To Find Region" };


        }

    }
}
