using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class financemanageron0project : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PerformancePlans_Positions_PositionId",
                table: "PerformancePlans");

            migrationBuilder.DropIndex(
                name: "IX_PerformancePlans_PositionId",
                table: "PerformancePlans");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "PerformancePlans");

            migrationBuilder.AddColumn<Guid>(
                name: "FinanceManagerId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: true,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "FinanceMangerId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsManagerial",
                table: "PerformancePlans",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_FinanceManagerId",
                table: "Projects",
                column: "FinanceManagerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Employees_FinanceManagerId",
                table: "Projects",
                column: "FinanceManagerId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Employees_FinanceManagerId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_FinanceManagerId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "FinanceManagerId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "FinanceMangerId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "IsManagerial",
                table: "PerformancePlans");

            migrationBuilder.AddColumn<Guid>(
                name: "PositionId",
                table: "PerformancePlans",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_PerformancePlans_PositionId",
                table: "PerformancePlans",
                column: "PositionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PerformancePlans_Positions_PositionId",
                table: "PerformancePlans",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id");
        }
    }
}
