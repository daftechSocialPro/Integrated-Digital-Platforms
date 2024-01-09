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
            migrationBuilder.DropColumn(
                name: "MeasurementUnit",
                table: "PurchaseRequestLists");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequestLists_MeasurementUnitId",
                table: "PurchaseRequestLists",
                column: "MeasurementUnitId");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequestLists_UnitOfMeasurment_MeasurementUnitId",
                table: "PurchaseRequestLists",
                column: "MeasurementUnitId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequestLists_UnitOfMeasurment_MeasurementUnitId",
                table: "PurchaseRequestLists");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseRequestLists_MeasurementUnitId",
                table: "PurchaseRequestLists");

            migrationBuilder.AddColumn<int>(
                name: "MeasurementUnit",
                table: "PurchaseRequestLists",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
