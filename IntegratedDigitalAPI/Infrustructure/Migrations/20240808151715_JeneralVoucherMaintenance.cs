using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class JeneralVoucherMaintenance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JournalVouchers_ChartOfAccounts_ChartOfAccountId",
                table: "JournalVouchers");

            migrationBuilder.DropForeignKey(
                name: "FK_JournalVouchers_SubsidiaryAccounts_SubsidiaryAccountId",
                table: "JournalVouchers");

            migrationBuilder.DropIndex(
                name: "IX_JournalVouchers_ChartOfAccountId",
                table: "JournalVouchers");

            migrationBuilder.DropIndex(
                name: "IX_JournalVouchers_SubsidiaryAccountId",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "ChartOfAccountId",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "Credit",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "Debit",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "PeriodId",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "ReferenceNumber",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "SubsidiaryAccountId",
                table: "JournalVouchers");

            migrationBuilder.DropColumn(
                name: "TypeofJvId",
                table: "JournalVouchers");

            migrationBuilder.AddColumn<int>(
                name: "PaymentType",
                table: "PaymentRequisitions",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PaymentType",
                table: "PaymentRequisitions");

            migrationBuilder.AddColumn<Guid>(
                name: "ChartOfAccountId",
                table: "JournalVouchers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<double>(
                name: "Credit",
                table: "JournalVouchers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Debit",
                table: "JournalVouchers",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "PeriodId",
                table: "JournalVouchers",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "ReferenceNumber",
                table: "JournalVouchers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryAccountId",
                table: "JournalVouchers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "TypeofJvId",
                table: "JournalVouchers",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JournalVouchers_ChartOfAccountId",
                table: "JournalVouchers",
                column: "ChartOfAccountId");

            migrationBuilder.CreateIndex(
                name: "IX_JournalVouchers_SubsidiaryAccountId",
                table: "JournalVouchers",
                column: "SubsidiaryAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_JournalVouchers_ChartOfAccounts_ChartOfAccountId",
                table: "JournalVouchers",
                column: "ChartOfAccountId",
                principalTable: "ChartOfAccounts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_JournalVouchers_SubsidiaryAccounts_SubsidiaryAccountId",
                table: "JournalVouchers",
                column: "SubsidiaryAccountId",
                principalTable: "SubsidiaryAccounts",
                principalColumn: "Id");
        }
    }
}
