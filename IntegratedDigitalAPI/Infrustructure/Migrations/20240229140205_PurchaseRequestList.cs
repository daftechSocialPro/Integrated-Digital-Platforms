using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class PurchaseRequestList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_PurchaseRequests_PurchaseRequestId",
                table: "Products");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_PurchaseRequestLists_PurchaseRequestId",
                table: "Products",
                column: "PurchaseRequestId",
                principalTable: "PurchaseRequestLists",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_PurchaseRequestLists_PurchaseRequestId",
                table: "Products");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_PurchaseRequests_PurchaseRequestId",
                table: "Products",
                column: "PurchaseRequestId",
                principalTable: "PurchaseRequests",
                principalColumn: "Id");
        }
    }
}
