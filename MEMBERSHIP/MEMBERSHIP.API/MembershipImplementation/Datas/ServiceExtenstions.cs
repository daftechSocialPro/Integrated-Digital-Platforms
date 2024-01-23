using Implementation.Interfaces.Authentication;
using Implementation.Services.Authentication;
using MembershipImplementation.Interfaces.Configuration;
using MembershipImplementation.Services.Configuration;
using MembershipImplementation.Interfaces.HRM;
using MembershipImplementation.Services.HRM;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace MembershipImplementation.Datas
{
    public static class ServiceExtenstions
    {
        public static IServiceCollection AddCoreBusiness(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            //hrm services 
         
            services.AddScoped<IGeneralConfigService, GeneralConfigService>();
            services.AddScoped<IMemberService, MemberService>();
            services.AddScoped<IEmailService, EmailService>();
            services.AddHttpClient();

            #region             
            services.AddScoped<IRegionService, RegionService>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IZoneService, ZoneService>();
            services.AddScoped<IEducationalLevelService, EducationalLevelService>();
            services.AddScoped<IEducationalFieldService, EducationalFieldService>();
            services.AddScoped<IMembershipTypeService, MembershipTypeService>();
            services.AddScoped<IDropDownService, DropDownService>();
            services.AddScoped<IAnnouncmentService, AnnouncmentService>();
            services.AddScoped<ICourseService, CourseService>();


            #endregion


            return services;
        }
    }
}
