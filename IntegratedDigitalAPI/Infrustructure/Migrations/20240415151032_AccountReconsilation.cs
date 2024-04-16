using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class AccountReconsilation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ChartOfAccountId",
                table: "ReceiptDetails",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "AccountReconciliations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BankListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PeriodId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Balance = table.Column<double>(type: "float", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AccountReconciliations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AccountReconciliations_BankLists_BankListId",
                        column: x => x.BankListId,
                        principalTable: "BankLists",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AccountReconciliations_PeriodDetails_PeriodId",
                        column: x => x.PeriodId,
                        principalTable: "PeriodDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_AccountReconciliations_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptDetails_ChartOfAccountId",
                table: "ReceiptDetails",
                column: "ChartOfAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountReconciliations_BankListId",
                table: "AccountReconciliations",
                column: "BankListId");

            migrationBuilder.CreateIndex(
                name: "IX_AccountReconciliations_CreatedById",
                table: "AccountReconciliations",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_AccountReconciliations_PeriodId",
                table: "AccountReconciliations",
                column: "PeriodId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiptDetails_ChartOfAccounts_ChartOfAccountId",
                table: "ReceiptDetails",
                column: "ChartOfAccountId",
                principalTable: "ChartOfAccounts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceiptDetails_ChartOfAccounts_ChartOfAccountId",
                table: "ReceiptDetails");

            migrationBuilder.DropTable(
                name: "AccountReconciliations");

            migrationBuilder.DropIndex(
                name: "IX_ReceiptDetails_ChartOfAccountId",
                table: "ReceiptDetails");

            migrationBuilder.DropColumn(
                name: "ChartOfAccountId",
                table: "ReceiptDetails");
        }
    }
}
