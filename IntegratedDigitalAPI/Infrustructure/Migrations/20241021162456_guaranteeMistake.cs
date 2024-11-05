using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class guaranteeMistake : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeGuarantiees_Employees_EmployeeListId",
                table: "EmployeeGuarantiees");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeGuarantiees_EmployeeListId",
                table: "EmployeeGuarantiees");

            migrationBuilder.DropColumn(
                name: "EmployeeListId",
                table: "EmployeeGuarantiees");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeGuarantiees_EmployeeId",
                table: "EmployeeGuarantiees",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeGuarantiees_Employees_EmployeeId",
                table: "EmployeeGuarantiees",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeGuarantiees_Employees_EmployeeId",
                table: "EmployeeGuarantiees");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeGuarantiees_EmployeeId",
                table: "EmployeeGuarantiees");

            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeListId",
                table: "EmployeeGuarantiees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeGuarantiees_EmployeeListId",
                table: "EmployeeGuarantiees",
                column: "EmployeeListId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeGuarantiees_Employees_EmployeeListId",
                table: "EmployeeGuarantiees",
                column: "EmployeeListId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
