using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class goalobjectiveinproject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Employees_FinanceId",
                table: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Projects_FinanceId",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "FinanceId",
                table: "Projects");

            migrationBuilder.AddColumn<string>(
                name: "Goal",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Objective",
                table: "Projects",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Goal",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "Objective",
                table: "Projects");

            migrationBuilder.AddColumn<Guid>(
                name: "FinanceId",
                table: "Projects",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Projects_FinanceId",
                table: "Projects",
                column: "FinanceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Employees_FinanceId",
                table: "Projects",
                column: "FinanceId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
