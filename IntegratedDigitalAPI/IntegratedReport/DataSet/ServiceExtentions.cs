using IntegratedReport.Interface;
using IntegratedReport.Service;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedReport.DataSet
{
    public static class ServiceExtentions
    {
        public static IServiceCollection AddCoreBusinessIntegrated(this IServiceCollection services)
        {

            services.AddScoped<IAttendanceReportService, AttendanceReportService>();

            return services;
        }
    }
}
