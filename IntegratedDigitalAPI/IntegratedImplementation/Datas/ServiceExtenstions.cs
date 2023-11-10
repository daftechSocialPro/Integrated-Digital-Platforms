using Implementation.Interfaces.Authentication;
using Implementation.Services.Authentication;
using IntegratedDigitalAPI.Services.PM;
using IntegratedDigitalAPI.Services.PM.Activity;
using IntegratedDigitalAPI.Services.PM.Commite;
using IntegratedDigitalAPI.Services.PM.Plan;
using IntegratedDigitalAPI.Services.PM.ProgressReport;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.HRM;
using IntegratedImplementation.Interfaces.Notification;
using IntegratedImplementation.Interfaces.PM;
using IntegratedImplementation.Interfaces.Vacancy;
using IntegratedImplementation.Services.Configuration;
using IntegratedImplementation.Services.HRM;
using IntegratedImplementation.Services.Notification;
using IntegratedImplementation.Services.PM;
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

            #region Hrm Service
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<IHolidayService, HolidayService>();

            services.AddScoped<IHrmNotificationService, HrmNotificationService>();
           
            services.AddScoped<IDepartmentService, DepartmentService>();
            services.AddScoped<IPositionService, PositionService>();
            services.AddScoped<IGeneralConfigService, GeneralConfigService>();
            services.AddScoped<IEmployeeService, EmployeeService>();
            services.AddScoped<ILeaveTypeService, LeaveTypeService>();
            services.AddScoped<ILeaveManagementService, LeaveManagementService>();
            services.AddScoped<IEmployementDetailService, EmployementDetailService>();
            services.AddScoped<IHrmSettingService, HrmSettingService>();
            services.AddScoped<IPerformancePlanService,PerformancePlanService>();
            services.AddScoped<IEmployeePerformanceService, EmployeePerformanceService>();
            services.AddScoped<ILoanSettingService, LoanSettingService>();
            services.AddScoped<ILoanManagementService, LoanManagementService>();
            services.AddScoped<IHrmLetterService, HrmLetterService>();
            #endregion

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
            services.AddScoped<IEmailService, EmailService>();
            services.AddScoped<IProjectLocationService, ProjectLocationService>();
            services.AddScoped<IBankListService, BankListService>();

            #region PM
            services.AddScoped<IUnitOfMeasurmentService, UnitOfMeasurmentService>();
            services.AddScoped<IStrategicPlanService, StrategicPlanService>();
            services.AddScoped<IActivityService, ActivityService>();
            services.AddScoped<ICommiteService, CommiteService>();
            services.AddScoped<IPlanService, PlanService>();
            services.AddScoped<IProgressReportService, ProgressReportService>();
            services.AddScoped<ITaskService, TaskService>();
            services.AddScoped<IProgressReportService, ProgressReportService>();
            services.AddScoped<ITimePeriodService, TimePeriodService>();


            #endregion



            return services;
        }
    }
}
