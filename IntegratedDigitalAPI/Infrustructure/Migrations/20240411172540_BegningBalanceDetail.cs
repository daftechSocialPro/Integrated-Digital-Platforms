using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class BegningBalanceDetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BegningBalanceDetails_ChartOfAccounts_ChartOfAccountId",
                table: "BegningBalanceDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_BegningBalanceDetails_PeriodDetails_ChartOfAccountId",
                table: "BegningBalanceDetails",
                column: "ChartOfAccountId",
                principalTable: "PeriodDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_BegningBalanceDetails_PeriodDetails_ChartOfAccountId",
                table: "BegningBalanceDetails");

            migrationBuilder.AddForeignKey(
                name: "FK_BegningBalanceDetails_ChartOfAccounts_ChartOfAccountId",
                table: "BegningBalanceDetails",
                column: "ChartOfAccountId",
                principalTable: "ChartOfAccounts",
                principalColumn: "Id");
        }
    }
}
