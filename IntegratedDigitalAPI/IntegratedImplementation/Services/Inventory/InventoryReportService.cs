using IntegratedImplementation.DTOS.Inventory;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Inventory;
using IntegratedInfrustructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Services.Inventory
{
    public class InventoryReportService : IInventoryReportService
    {
        private readonly ApplicationDbContext _dbContext;
        private readonly IGeneralConfigService _generalConfigService;

        public InventoryReportService(ApplicationDbContext dbContext, IGeneralConfigService generalConfigService)
        {
            _dbContext = dbContext;
            _generalConfigService = generalConfigService;
        }

        public async Task<List<BalanceTempData>> GetBalanceReport()
        {
          
            List<BalanceTempData> dailyReport = await _dbContext.Products.Include(x => x.Item.Category).
                                    Where(x => x.RemainingQuantity > 0).GroupBy(x => x.ItemId)
                                    .Select(x => new BalanceTempData
                                    {
                                        CategoryType = x.First().Item.Category.CategoryType.ToString(),
                                        CategoryName = x.First().Item.Category.Name,
                                        ItemId = x.First().ItemId,
                                        ItemName = x.First().Item.Name,
                                        MeasurementUnit = x.First().MeasurementUnit.Name,
                                        Quantity = x.Sum(x => x.RemainingQuantity)
                                    }).ToListAsync();

            return dailyReport;
        }

        public async Task<byte[]> GetOutReport(StockReportDto stockReport)
        {
            //ReportDataSet.CompanyProfileDataTable companyProfileRows = new ReportDataSet.CompanyProfileDataTable();

            //ReportDataSet.OutReportDataTable stockReports = new ReportDataSet.OutReportDataTable();

            //var dailyReport = await _dbContext.ItemReceivalDetails.Include(x => x.Product.Item)
            //    .Include(x => x.MeasurementUnit).Where(X => X.IssuedDate >= stockReport.FromDate && X.IssuedDate <= stockReport.ToDate && X.Product.BranchId.Equals(Guid.Parse(stockReport.BranchId)))
            //    .OrderBy(x => x.CreatedDate).OrderBy(x => x.CreatedDate).Select(x =>
            //stockReports.AddOutReportRow(
            //    x.Product.Item.Name, x.Quantity, x.MeasurementUnit.Name, x.IssuedDate.ToString("dd/MM/yyyy")
            //)).ToListAsync();

            //var compProfile = await _dbContext.CompanyProfiles.FirstOrDefaultAsync();
            //if (compProfile != null)
            //{
            //    var Logo = await _generalConfigService.GetFiles(compProfile.Logo);
            //    companyProfileRows.AddCompanyProfileRow(compProfile.CompanyName, Logo);
            //}


            //var currentDirectory = Directory.GetCurrentDirectory();
            //var reportPath = currentDirectory + "\\Report\\Inventory\\OutReport.rdlc";
            //ReportParameter parameter = new ReportParameter("FromDate", stockReport.FromDate.ToString("dd/MM/yyyy"));
            //ReportParameter totalEmp = new ReportParameter("ToDate", stockReport.ToDate.ToString("dd/MM/yyyy"));
            //var localReport = new Microsoft.Reporting.NETCore.LocalReport();
            //localReport.ReportPath = reportPath;
            //ReportDataSource daata = new ReportDataSource();
            //daata.Name = "OutReport";
            //daata.Value = stockReports;
            //localReport.DataSources.Add(daata);
            //ReportDataSource dataComp = new ReportDataSource();
            //dataComp.Name = "CompanyProfile";
            //dataComp.Value = companyProfileRows;
            //localReport.DataSources.Add(dataComp);
            //localReport.SetParameters(parameter);
            //localReport.SetParameters(totalEmp);

            //var bytes = localReport.Render("PDF");
            //return bytes;

            return null!;
        }

        public async Task<byte[]> GetStockReport(StockReportDto stockReport)
        {
            //  ReportDataSet.CompanyProfileDataTable companyProfileRows = new ReportDataSet.CompanyProfileDataTable();

            // ReportDataSet.StockReportDataTable stockReports = new ReportDataSet.StockReportDataTable();

            // var dailyReport = await _dbContext.Products.Include(x => x.Item).Where(X => X.RecivingDateTime >= stockReport.FromDate && X.RecivingDateTime <= stockReport.ToDate && X.BranchId.Equals(Guid.Parse(stockReport.BranchId))).Select(x =>
            // stockReports.AddStockReportRow(
            //     x.Item.Name, (x.SinglePrice * x.Quantiy * x.Cartoon * x.Packet * 1.15), (x.Quantiy * x.Cartoon * x.Packet), x.MeasurementUnit.Name, x.ColumnName, x.RowName, x.RecivingDateTime.ToString("dd/MM/yyyy"), x.ExpireDateTime.Value.ToString("dd/MM/yyyy")
            // )).ToListAsync();



            // var compProfile = await _dbContext.CompanyProfiles.FirstOrDefaultAsync();
            // if (compProfile != null)
            // {
            //     var Logo = await _generalConfigService.GetFiles(compProfile.Logo);
            //     companyProfileRows.AddCompanyProfileRow(compProfile.CompanyName, Logo);
            // }

            // var currentDirectory = Directory.GetCurrentDirectory();
            // var reportPath = currentDirectory + "\\Report\\Inventory\\StockReport.rdlc";
            // ReportParameter parameter = new ReportParameter("FromDate", stockReport.FromDate.ToString("dd/MM/yyyy"));
            // ReportParameter totalEmp = new ReportParameter("ToDate", stockReport.ToDate.ToString("dd/MM/yyyy"));
            // var localReport = new Microsoft.Reporting.NETCore.LocalReport();
            // localReport.ReportPath = reportPath;
            // ReportDataSource daata = new ReportDataSource();
            // daata.Name = "StockReport";
            // daata.Value = stockReports;
            // localReport.DataSources.Add(daata);
            // ReportDataSource dataComp = new ReportDataSource();
            // dataComp.Name = "CompanyProfile";
            // dataComp.Value = companyProfileRows;
            // localReport.DataSources.Add(dataComp);
            //localReport.SetParameters(parameter);
            // localReport.SetParameters(totalEmp);

            // var bytes = localReport.Render("PDF");
            // return bytes;

            return null!;
        }
    }
}
