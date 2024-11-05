using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class recieptGet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "SubsidiaryAccountId",
                table: "ReceiptDetails",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_ReceiptDetails_SubsidiaryAccountId",
                table: "ReceiptDetails",
                column: "SubsidiaryAccountId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReceiptDetails_SubsidiaryAccounts_SubsidiaryAccountId",
                table: "ReceiptDetails",
                column: "SubsidiaryAccountId",
                principalTable: "SubsidiaryAccounts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReceiptDetails_SubsidiaryAccounts_SubsidiaryAccountId",
                table: "ReceiptDetails");

            migrationBuilder.DropIndex(
                name: "IX_ReceiptDetails_SubsidiaryAccountId",
                table: "ReceiptDetails");

            migrationBuilder.DropColumn(
                name: "SubsidiaryAccountId",
                table: "ReceiptDetails");
        }
    }
}
