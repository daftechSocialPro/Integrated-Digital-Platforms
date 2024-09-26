using IntegratedImplementation.DTOS.HRM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.HRM
{
    public interface IHrmDashboardService
    {
        public Task<HrmDashboardDto> GetHrmDashboard();
    }
}
