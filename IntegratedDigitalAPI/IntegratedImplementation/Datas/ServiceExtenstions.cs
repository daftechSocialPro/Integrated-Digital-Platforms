using Implementation.Interfaces.Authentication;
using Implementation.Services.Authentication;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Services.Configuration;
using IntegratedImplementation.Services.HRM;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Datas
{
    public static class ServiceExtenstions
    {
        public static IServiceCollection AddCoreBusiness(this IServiceCollection services)
        {
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            //hrm services 
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<IGeneralConfigService, GeneralConfigService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ILeaveTypeService, LeaveTypeService>();
           

            // configuration
            services.AddScoped<ICompanyProfileService, CompanyProfileService>();
            services.AddScoped<IRegionService, RegionService>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IZoneService, ZoneService>();
            services.AddScoped<IEducationalLevelService, EducationalLevelService>();
            services.AddScoped<IEducationalFieldService, EducationalFieldService>();
            return services;
        }
    }
}
