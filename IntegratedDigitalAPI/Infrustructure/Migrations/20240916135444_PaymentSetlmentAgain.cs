using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class PaymentSetlmentAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AuthorizedDate",
                table: "PaymetRequisitions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AuthorizerId",
                table: "PaymetRequisitions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsSettled",
                table: "PaymetRequisitions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "SettledById",
                table: "PaymetRequisitions",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "SettledDate",
                table: "PaymetRequisitions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeePaymentSettlements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaymentRequisitionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RemainingAmmount = table.Column<double>(type: "float", nullable: false),
                    PaymentAction = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePaymentSettlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePaymentSettlements_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePaymentSettlements_PaymetRequisitions_PaymentRequisitionId",
                        column: x => x.PaymentRequisitionId,
                        principalTable: "PaymetRequisitions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePaymentSettlements_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymetRequisitions_AuthorizerId",
                table: "PaymetRequisitions",
                column: "AuthorizerId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymetRequisitions_SettledById",
                table: "PaymetRequisitions",
                column: "SettledById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePaymentSettlements_CreatedById",
                table: "EmployeePaymentSettlements",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePaymentSettlements_EmployeeId",
                table: "EmployeePaymentSettlements",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePaymentSettlements_PaymentRequisitionId",
                table: "EmployeePaymentSettlements",
                column: "PaymentRequisitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymetRequisitions_Employees_AuthorizerId",
                table: "PaymetRequisitions",
                column: "AuthorizerId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PaymetRequisitions_Employees_SettledById",
                table: "PaymetRequisitions",
                column: "SettledById",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PaymetRequisitions_Employees_AuthorizerId",
                table: "PaymetRequisitions");

            migrationBuilder.DropForeignKey(
                name: "FK_PaymetRequisitions_Employees_SettledById",
                table: "PaymetRequisitions");

            migrationBuilder.DropTable(
                name: "EmployeePaymentSettlements");

            migrationBuilder.DropIndex(
                name: "IX_PaymetRequisitions_AuthorizerId",
                table: "PaymetRequisitions");

            migrationBuilder.DropIndex(
                name: "IX_PaymetRequisitions_SettledById",
                table: "PaymetRequisitions");

            migrationBuilder.DropColumn(
                name: "AuthorizedDate",
                table: "PaymetRequisitions");

            migrationBuilder.DropColumn(
                name: "AuthorizerId",
                table: "PaymetRequisitions");

            migrationBuilder.DropColumn(
                name: "IsSettled",
                table: "PaymetRequisitions");

            migrationBuilder.DropColumn(
                name: "SettledById",
                table: "PaymetRequisitions");

            migrationBuilder.DropColumn(
                name: "SettledDate",
                table: "PaymetRequisitions");
        }
    }
}
