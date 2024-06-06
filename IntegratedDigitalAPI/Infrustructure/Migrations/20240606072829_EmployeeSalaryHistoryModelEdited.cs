using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeSalaryHistoryModelEdited : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProjectName",
                table: "EmployeeSalaries");

            migrationBuilder.DropColumn(
                name: "Taxable",
                table: "BenefitLists");

            migrationBuilder.RenameColumn(
                name: "Amount",
                table: "EmployeeSalaries",
                newName: "Percentile");

            migrationBuilder.AddColumn<Guid>(
                name: "AutorizedById",
                table: "PayrollDatas",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "EmployeeSalaries",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "Taxable",
                table: "EmployeeBenefits",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<float>(
                name: "TaxableAmount",
                table: "BenefitLists",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateIndex(
                name: "IX_PayrollDatas_AutorizedById",
                table: "PayrollDatas",
                column: "AutorizedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_ProjectId",
                table: "EmployeeSalaries",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeSalaries_Projects_ProjectId",
                table: "EmployeeSalaries",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PayrollDatas_Employees_AutorizedById",
                table: "PayrollDatas",
                column: "AutorizedById",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeSalaries_Projects_ProjectId",
                table: "EmployeeSalaries");

            migrationBuilder.DropForeignKey(
                name: "FK_PayrollDatas_Employees_AutorizedById",
                table: "PayrollDatas");

            migrationBuilder.DropIndex(
                name: "IX_PayrollDatas_AutorizedById",
                table: "PayrollDatas");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeSalaries_ProjectId",
                table: "EmployeeSalaries");

            migrationBuilder.DropColumn(
                name: "AutorizedById",
                table: "PayrollDatas");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "EmployeeSalaries");

            migrationBuilder.DropColumn(
                name: "Taxable",
                table: "EmployeeBenefits");

            migrationBuilder.DropColumn(
                name: "TaxableAmount",
                table: "BenefitLists");

            migrationBuilder.RenameColumn(
                name: "Percentile",
                table: "EmployeeSalaries",
                newName: "Amount");

            migrationBuilder.AddColumn<string>(
                name: "ProjectName",
                table: "EmployeeSalaries",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Taxable",
                table: "BenefitLists",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
