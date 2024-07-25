using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class PaymentAuthorizer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AuthorizedById",
                table: "Payments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Payments_AuthorizedById",
                table: "Payments",
                column: "AuthorizedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Payments_Employees_AuthorizedById",
                table: "Payments",
                column: "AuthorizedById",
                principalTable: "Employees",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payments_Employees_AuthorizedById",
                table: "Payments");

            migrationBuilder.DropIndex(
                name: "IX_Payments_AuthorizedById",
                table: "Payments");

            migrationBuilder.DropColumn(
                name: "AuthorizedById",
                table: "Payments");
        }
    }
}
