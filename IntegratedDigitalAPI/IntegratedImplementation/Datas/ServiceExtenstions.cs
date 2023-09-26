using Implementation.Interfaces.Authentication;
using Implementation.Services.Authentication;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Notification;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedImplementation.Services.Configuration;
using IntegratedImplementation.Services.HRM;
using IntegratedImplementation.Services.Notification;
using IntegratedImplementation.Services.Vacancy;
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
            services.AddScoped<IHolidayService, HolidayService>();

            services.AddScoped<IHrmNotificationService, HrmNotificationService>();
            //hrm services 
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<IGeneralConfigService, GeneralConfigService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ILeaveTypeService, LeaveTypeService>();
            services.AddScoped<ILeaveManagementService, LeaveManagementService>();
            services.AddScoped<IEmployementDetailService, EmployementDetailService>();
            services.AddScoped<IHrmSettingService, HrmSettingService>();

            #region Vacancy
            services.AddScoped<IVacancyService, VacancyService>();
            services.AddScoped<IApplicantService, ApplicantService>();
            #endregion

            // configuration
            services.AddScoped<ICompanyProfileService, CompanyProfileService>();
            services.AddScoped<IRegionService, RegionService>();
            services.AddScoped<ICountryService, CountryService>();
            services.AddScoped<IZoneService, ZoneService>();
            services.AddScoped<IEducationalLevelService, EducationalLevelService>();
            services.AddScoped<IEducationalFieldService, EducationalFieldService>();
            services.AddScoped<IDropDownService, DropDownService>();
            return services;
        }
    }
}
