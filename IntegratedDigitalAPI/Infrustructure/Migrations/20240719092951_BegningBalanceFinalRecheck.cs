using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class BegningBalanceFinalRecheck : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "BegningBalances",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        AccountingPeriodId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        TotalCredit = table.Column<double>(type: "float", nullable: false),
            //        TotalDebit = table.Column<double>(type: "float", nullable: false),
            //        Remark = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_BegningBalances", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_BegningBalances_AccountingPeriods_AccountingPeriodId",
            //            column: x => x.AccountingPeriodId,
            //            principalTable: "AccountingPeriods",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_BegningBalances_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateTable(
            //    name: "BegningBalanceDetails",
            //    columns: table => new
            //    {
            //        Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        BegningBalanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        ChartOfAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
            //        SubsidiaryAccountId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
            //        Ammount = table.Column<double>(type: "float", nullable: false),
            //        Remark = table.Column<string>(type: "nvarchar(max)", nullable: false),
            //        CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
            //        Rowstatus = table.Column<int>(type: "int", nullable: false)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_BegningBalanceDetails", x => x.Id);
            //        table.ForeignKey(
            //            name: "FK_BegningBalanceDetails_BegningBalances_BegningBalanceId",
            //            column: x => x.BegningBalanceId,
            //            principalTable: "BegningBalances",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_BegningBalanceDetails_ChartOfAccounts_ChartOfAccountId",
            //            column: x => x.ChartOfAccountId,
            //            principalTable: "ChartOfAccounts",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_BegningBalanceDetails_SubsidiaryAccounts_SubsidiaryAccountId",
            //            column: x => x.SubsidiaryAccountId,
            //            principalTable: "SubsidiaryAccounts",
            //            principalColumn: "Id");
            //        table.ForeignKey(
            //            name: "FK_BegningBalanceDetails_Users_CreatedById",
            //            column: x => x.CreatedById,
            //            principalTable: "Users",
            //            principalColumn: "Id");
            //    });

            //migrationBuilder.CreateIndex(
            //    name: "IX_BegningBalanceDetails_BegningBalanceId",
            //    table: "BegningBalanceDetails",
            //    column: "BegningBalanceId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_BegningBalanceDetails_ChartOfAccountId",
            //    table: "BegningBalanceDetails",
            //    column: "ChartOfAccountId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_BegningBalanceDetails_CreatedById",
            //    table: "BegningBalanceDetails",
            //    column: "CreatedById");

            //migrationBuilder.CreateIndex(
            //    name: "IX_BegningBalanceDetails_SubsidiaryAccountId",
            //    table: "BegningBalanceDetails",
            //    column: "SubsidiaryAccountId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_BegningBalances_AccountingPeriodId",
            //    table: "BegningBalances",
            //    column: "AccountingPeriodId");

            //migrationBuilder.CreateIndex(
            //    name: "IX_BegningBalances_CreatedById",
            //    table: "BegningBalances",
            //    column: "CreatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BegningBalanceDetails");

            migrationBuilder.DropTable(
                name: "BegningBalances");
        }
    }
}
