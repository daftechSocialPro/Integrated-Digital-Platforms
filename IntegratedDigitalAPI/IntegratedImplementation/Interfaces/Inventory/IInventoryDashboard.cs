using IntegratedImplementation.DTOS.Inventory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Inventory
{
    public interface IInventoryDashboard
    {
        public Task<InventoryDashboardDto> GetInventoryDashboard(string employeeId);
    }
}
