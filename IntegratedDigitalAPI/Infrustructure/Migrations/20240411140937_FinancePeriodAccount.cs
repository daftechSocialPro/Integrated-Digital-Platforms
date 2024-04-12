using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class FinancePeriodAccount : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_AccountingPeriods_AccountingPeriodId",
                table: "Payments");

            migrationBuilder.AddColumn<Guid>(
                name: "AccountingPeriodId",
                table: "Receipts",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Receipts_AccountingPeriodId",
                table: "Receipts",
                column: "AccountingPeriodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_PeriodDetails_AccountingPeriodId",
                table: "Payments",
                column: "AccountingPeriodId",
                principalTable: "PeriodDetails",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Receipts_PeriodDetails_AccountingPeriodId",
                table: "Receipts",
                column: "AccountingPeriodId",
                principalTable: "PeriodDetails",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_PeriodDetails_AccountingPeriodId",
                table: "Payments");

            migrationBuilder.DropForeignKey(
                name: "FK_Receipts_PeriodDetails_AccountingPeriodId",
                table: "Receipts");

            migrationBuilder.DropIndex(
                name: "IX_Receipts_AccountingPeriodId",
                table: "Receipts");

            migrationBuilder.DropColumn(
                name: "AccountingPeriodId",
                table: "Receipts");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_AccountingPeriods_AccountingPeriodId",
                table: "Payments",
                column: "AccountingPeriodId",
                principalTable: "AccountingPeriods",
                principalColumn: "Id");
        }
    }
}
