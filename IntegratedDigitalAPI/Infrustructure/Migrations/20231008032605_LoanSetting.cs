using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class LoanSetting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "LoanSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoanName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeOfLoan = table.Column<int>(type: "int", nullable: false),
                    MaxLoanAmmount = table.Column<double>(type: "float", nullable: false),
                    PaymentYear = table.Column<int>(type: "int", nullable: false),
                    MinDeductedPercent = table.Column<double>(type: "float", nullable: false),
                    MaxDeductedPercent = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LoanRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequesterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoanSettingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalMoneyRequest = table.Column<double>(type: "float", nullable: false),
                    DeductionRequest = table.Column<double>(type: "float", nullable: false),
                    LoanStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanRequests_Employees_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoanRequests_LoanSettings_LoanSettingId",
                        column: x => x.LoanSettingId,
                        principalTable: "LoanSettings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoanRequests_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeLoans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoanRequestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApprovedAmmount = table.Column<double>(type: "float", nullable: false),
                    ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SecondApproverId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLoans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_Employees_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_Employees_SecondApproverId",
                        column: x => x.SecondApproverId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_LoanRequests_LoanRequestId",
                        column: x => x.LoanRequestId,
                        principalTable: "LoanRequests",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSettlements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeLoanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PayedMoney = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSettlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSettlements_EmployeeLoans_EmployeeLoanId",
                        column: x => x.EmployeeLoanId,
                        principalTable: "EmployeeLoans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSettlements_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_ApprovedById",
                table: "EmployeeLoans",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_CreatedById",
                table: "EmployeeLoans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_LoanRequestId",
                table: "EmployeeLoans",
                column: "LoanRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_SecondApproverId",
                table: "EmployeeLoans",
                column: "SecondApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSettlements_CreatedById",
                table: "EmployeeSettlements",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSettlements_EmployeeLoanId",
                table: "EmployeeSettlements",
                column: "EmployeeLoanId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequests_CreatedById",
                table: "LoanRequests",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequests_LoanSettingId",
                table: "LoanRequests",
                column: "LoanSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequests_RequesterId",
                table: "LoanRequests",
                column: "RequesterId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanSettings_CreatedById",
                table: "LoanSettings",
                column: "CreatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeSettlements");

            migrationBuilder.DropTable(
                name: "EmployeeLoans");

            migrationBuilder.DropTable(
                name: "LoanRequests");

            migrationBuilder.DropTable(
                name: "LoanSettings");
        }
    }
}
