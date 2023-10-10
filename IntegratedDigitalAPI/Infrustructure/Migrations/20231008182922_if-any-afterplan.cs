using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class ifanyafterplan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaries_EmployeeLoans_EmployeeLoanId",
                table: "EmployeeSalaries");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeSalaries_EmployeeLoanId",
                table: "EmployeeSalaries");

            migrationBuilder.DropColumn(
                name: "EmployeeLoanId",
                table: "EmployeeSalaries");

            migrationBuilder.DropColumn(
                name: "PayedMoney",
                table: "EmployeeSalaries");

            migrationBuilder.RenameTable(
                name: "EmployeeSettlement",
                newName: "EmployeeSettlements");

            migrationBuilder.AddColumn<Guid>(
                name: "Id",
                table: "EmployeeSettlements",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "EmployeeSettlements",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "EmployeeSettlements",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeLoanId",
                table: "EmployeeSettlements",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "PayedMoney",
                table: "EmployeeSettlements",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<int>(
                name: "Rowstatus",
                table: "EmployeeSettlements",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_EmployeeSettlements",
                table: "EmployeeSettlements",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSettlements_CreatedById",
                table: "EmployeeSettlements",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSettlements_EmployeeLoanId",
                table: "EmployeeSettlements",
                column: "EmployeeLoanId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSettlements_EmployeeLoans_EmployeeLoanId",
                table: "EmployeeSettlements",
                column: "EmployeeLoanId",
                principalTable: "EmployeeLoans",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSettlements_Users_CreatedById",
                table: "EmployeeSettlements",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSettlements_EmployeeLoans_EmployeeLoanId",
                table: "EmployeeSettlements");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSettlements_Users_CreatedById",
                table: "EmployeeSettlements");

            migrationBuilder.DropPrimaryKey(
                name: "PK_EmployeeSettlements",
                table: "EmployeeSettlements");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeSettlements_CreatedById",
                table: "EmployeeSettlements");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeSettlements_EmployeeLoanId",
                table: "EmployeeSettlements");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "EmployeeSettlements");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "EmployeeSettlements");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "EmployeeSettlements");

            migrationBuilder.DropColumn(
                name: "EmployeeLoanId",
                table: "EmployeeSettlements");

            migrationBuilder.DropColumn(
                name: "PayedMoney",
                table: "EmployeeSettlements");

            migrationBuilder.DropColumn(
                name: "Rowstatus",
                table: "EmployeeSettlements");

            migrationBuilder.RenameTable(
                name: "EmployeeSettlements",
                newName: "EmployeeSettlement");

            migrationBuilder.AddColumn<Guid>(
                name: "EmployeeLoanId",
                table: "EmployeeSalaries",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "PayedMoney",
                table: "EmployeeSalaries",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_EmployeeLoanId",
                table: "EmployeeSalaries",
                column: "EmployeeLoanId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaries_EmployeeLoans_EmployeeLoanId",
                table: "EmployeeSalaries",
                column: "EmployeeLoanId",
                principalTable: "EmployeeLoans",
                principalColumn: "Id");
        }
    }
}
