using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class BegningBalanceDetailrevert : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BegningBalanceDetails_PeriodDetails_ChartOfAccountId",
                table: "BegningBalanceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_BegningBalances_AccountingPeriods_AccountingPeriodId",
                table: "BegningBalances");

            migrationBuilder.AddForeignKey(
                name: "FK_BegningBalanceDetails_ChartOfAccounts_ChartOfAccountId",
                table: "BegningBalanceDetails",
                column: "ChartOfAccountId",
                principalTable: "ChartOfAccounts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BegningBalances_PeriodDetails_AccountingPeriodId",
                table: "BegningBalances",
                column: "AccountingPeriodId",
                principalTable: "PeriodDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BegningBalanceDetails_ChartOfAccounts_ChartOfAccountId",
                table: "BegningBalanceDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_BegningBalances_PeriodDetails_AccountingPeriodId",
                table: "BegningBalances");

            migrationBuilder.AddForeignKey(
                name: "FK_BegningBalanceDetails_PeriodDetails_ChartOfAccountId",
                table: "BegningBalanceDetails",
                column: "ChartOfAccountId",
                principalTable: "PeriodDetails",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_BegningBalances_AccountingPeriods_AccountingPeriodId",
                table: "BegningBalances",
                column: "AccountingPeriodId",
                principalTable: "AccountingPeriods",
                principalColumn: "Id");
        }
    }
}
