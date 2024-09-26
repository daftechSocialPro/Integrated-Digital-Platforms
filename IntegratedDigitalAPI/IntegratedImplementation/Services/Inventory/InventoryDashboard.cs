using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static IntegratedInfrustructure.Data.EnumList;

namespace IntegratedImplementation.Services.Inventory
{
    public class InventoryDashboard : IInventoryDashboard
    {
        private readonly ApplicationDbContext _dbContext;

        public InventoryDashboard(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<InventoryDashboardDto> GetInventoryDashboard(string employeeId)
        {
            InventoryDashboardDto dashboard = new InventoryDashboardDto();
            var today = DateTime.Now;

            var pendingPurchaseRequest = await _dbContext.PurchaseRequestLists.Where(x => x.ApprovalStatus == ApprovalStatus.PENDING).CountAsync();
            var items = await _dbContext.Items.CountAsync();
            var pendingStoreRequest = await _dbContext.StoreRequestLists.Where(x => x.ApprovalStatus == ApprovalStatus.PENDING).CountAsync();
            var recivedItems = await _dbContext.ItemReceivals.Where(x => x.StoreRequestList.StoreRequest.RequesterEmployeeId.Equals(Guid.Parse(employeeId)) &&
                                      x.ReceivedStatus == ItemReceivedStatus.RECIVED).CountAsync();
            var totalPurchaseRequest = await _dbContext.PurchaseRequestLists.CountAsync();
            var totalStoreRequest = await _dbContext.StoreRequestLists.CountAsync();
            var expiredPerformas = await _dbContext.PerformaDetails.Where(x => x.PurchaseRequestList.IsFinalApproved == false && x.ToDate.Date <= today.Date)
                .Select(x => new ExpiredPerformaDto { 
                    VendorName = x.Vendor.Name,
                    Description = x.Description,
                    FromDate = x.FromDate,
                    ToDate = x.ToDate
            }).ToListAsync();

            dashboard.totalPurchaseRequest = totalPurchaseRequest;
            dashboard.totalStoreRequest = totalStoreRequest;
            dashboard.pendingStoreRequest = pendingPurchaseRequest;
            dashboard.pendingPurchaseRequest = pendingStoreRequest;
            dashboard.recivedItems = recivedItems;
            dashboard.items = items;
            dashboard.expiredPerformas = expiredPerformas;



            return dashboard;
        }
    }
}
