using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class leaveplansetting2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeavePlanSetting_Employees_EmployeeListId",
                table: "LeavePlanSetting");

            migrationBuilder.DropIndex(
                name: "IX_LeavePlanSetting_EmployeeListId",
                table: "LeavePlanSetting");

            migrationBuilder.DropColumn(
                name: "EmployeeListId",
                table: "LeavePlanSetting");

            migrationBuilder.CreateIndex(
                name: "IX_LeavePlanSetting_EmployeeId",
                table: "LeavePlanSetting",
                column: "EmployeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeavePlanSetting_Employees_EmployeeId",
                table: "LeavePlanSetting",
                column: "EmployeeId",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_LeavePlanSetting_Employees_EmployeeId",
                table: "LeavePlanSetting");

            migrationBuilder.DropIndex(
                name: "IX_LeavePlanSetting_EmployeeId",
                table: "LeavePlanSetting");

            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeListId",
                table: "LeavePlanSetting",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_LeavePlanSetting_EmployeeListId",
                table: "LeavePlanSetting",
                column: "EmployeeListId");

            migrationBuilder.AddForeignKey(
                name: "FK_LeavePlanSetting_Employees_EmployeeListId",
                table: "LeavePlanSetting",
                column: "EmployeeListId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
