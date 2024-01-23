using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class projectfundsource : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Budget",
                table: "ProjectFundSources",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<Guid>(
                name: "FiscalYearId",
                table: "ProjectFundSources",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ProjectFundSources_FiscalYearId",
                table: "ProjectFundSources",
                column: "FiscalYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectFundSources_BudgetYears_FiscalYearId",
                table: "ProjectFundSources",
                column: "FiscalYearId",
                principalTable: "BudgetYears",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectFundSources_BudgetYears_FiscalYearId",
                table: "ProjectFundSources");

            migrationBuilder.DropIndex(
                name: "IX_ProjectFundSources_FiscalYearId",
                table: "ProjectFundSources");

            migrationBuilder.DropColumn(
                name: "Budget",
                table: "ProjectFundSources");

            migrationBuilder.DropColumn(
                name: "FiscalYearId",
                table: "ProjectFundSources");
        }
    }
}
