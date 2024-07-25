using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class BegningBalanceFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "AccountReconciliations",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        BankListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        PeriodId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        Balance = table.Column<double>(type: "float", nullable: false),
            //        Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_AccountReconciliations", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_AccountReconciliations_BankLists_BankListId",
            //            column: x => x.BankListId,
            //            principalTable: "BankLists",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_AccountReconciliations_PeriodDetails_PeriodId",
            //            column: x => x.PeriodId,
            //            principalTable: "PeriodDetails",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_AccountReconciliations_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "PurchaseInvoices",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        SupplierId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        IsPurchaseRequested = table.Column<bool>(type: "bit", nullable: false),
            //        PurchaseRequestId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        VocherNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Date = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        IsApproved = table.Column<bool>(type: "bit", nullable: false),
            //        ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        EmployeeListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PurchaseInvoices", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoices_Employees_EmployeeListId",
            //            column: x => x.EmployeeListId,
            //            principalTable: "Employees",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoices_PurchaseRequests_PurchaseRequestId",
            //            column: x => x.PurchaseRequestId,
            //            principalTable: "PurchaseRequests",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoices_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoices_Vendors_SupplierId",
            //            column: x => x.SupplierId,
            //            principalTable: "Vendors",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "Receipts",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        BankId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        AccountingPeriodId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        ReferenceNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        ReceiptNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        Date = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_Receipts", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_Receipts_BankLists_BankId",
            //            column: x => x.BankId,
            //            principalTable: "BankLists",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_Receipts_PeriodDetails_AccountingPeriodId",
            //            column: x => x.AccountingPeriodId,
            //            principalTable: "PeriodDetails",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_Receipts_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "PurchaseInvoiceDetails",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        PurchaseInvoiceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        ItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        Quantity = table.Column<int>(type: "int", nullable: false),
            //        Price = table.Column<double>(type: "float", nullable: false),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_PurchaseInvoiceDetails", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoiceDetails_Items_ItemId",
            //            column: x => x.ItemId,
            //            principalTable: "Items",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoiceDetails_PurchaseInvoices_PurchaseInvoiceId",
            //            column: x => x.PurchaseInvoiceId,
            //            principalTable: "PurchaseInvoices",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_PurchaseInvoiceDetails_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "ReceiptDetails",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        ReceiptId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        ChartOfAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        ItemId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        UnitPrice = table.Column<double>(type: "float", nullable: false),
            //        Quantity = table.Column<double>(type: "float", nullable: false),
            //        IsTaxable = table.Column<bool>(type: "bit", nullable: false),
            //        ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ReceiptDetails", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_ReceiptDetails_ChartOfAccounts_ChartOfAccountId",
            //            column: x => x.ChartOfAccountId,
            //            principalTable: "ChartOfAccounts",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_ReceiptDetails_Items_ItemId",
            //            column: x => x.ItemId,
            //            principalTable: "Items",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_ReceiptDetails_Projects_ProjectId",
            //            column: x => x.ProjectId,
            //            principalTable: "Projects",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_ReceiptDetails_Receipts_ReceiptId",
            //            column: x => x.ReceiptId,
            //            principalTable: "Receipts",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_ReceiptDetails_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_AccountReconciliations_BankListId",
            //    table: "AccountReconciliations",
            //    column: "BankListId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AccountReconciliations_CreatedById",
            //    table: "AccountReconciliations",
            //    column: "CreatedById");

            //migrationBuilder.CreateIndex(
            //    name: "IX_AccountReconciliations_PeriodId",
            //    table: "AccountReconciliations",
            //    column: "PeriodId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoiceDetails_CreatedById",
            //    table: "PurchaseInvoiceDetails",
            //    column: "CreatedById");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoiceDetails_ItemId",
            //    table: "PurchaseInvoiceDetails",
            //    column: "ItemId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoiceDetails_PurchaseInvoiceId",
            //    table: "PurchaseInvoiceDetails",
            //    column: "PurchaseInvoiceId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoices_CreatedById",
            //    table: "PurchaseInvoices",
            //    column: "CreatedById");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoices_EmployeeListId",
            //    table: "PurchaseInvoices",
            //    column: "EmployeeListId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoices_PurchaseRequestId",
            //    table: "PurchaseInvoices",
            //    column: "PurchaseRequestId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_PurchaseInvoices_SupplierId",
            //    table: "PurchaseInvoices",
            //    column: "SupplierId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ReceiptDetails_ChartOfAccountId",
            //    table: "ReceiptDetails",
            //    column: "ChartOfAccountId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ReceiptDetails_CreatedById",
            //    table: "ReceiptDetails",
            //    column: "CreatedById");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ReceiptDetails_ItemId",
            //    table: "ReceiptDetails",
            //    column: "ItemId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ReceiptDetails_ProjectId",
            //    table: "ReceiptDetails",
            //    column: "ProjectId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_ReceiptDetails_ReceiptId",
            //    table: "ReceiptDetails",
            //    column: "ReceiptId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Receipts_AccountingPeriodId",
            //    table: "Receipts",
            //    column: "AccountingPeriodId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Receipts_BankId",
            //    table: "Receipts",
            //    column: "BankId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_Receipts_CreatedById",
            //    table: "Receipts",
            //    column: "CreatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AccountReconciliations");

            migrationBuilder.DropTable(
                name: "PurchaseInvoiceDetails");

            migrationBuilder.DropTable(
                name: "ReceiptDetails");

            migrationBuilder.DropTable(
                name: "PurchaseInvoices");

            migrationBuilder.DropTable(
                name: "Receipts");
        }
    }
}
