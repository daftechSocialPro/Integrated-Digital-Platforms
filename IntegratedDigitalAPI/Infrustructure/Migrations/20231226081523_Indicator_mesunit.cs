using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class Indicator_mesunit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_UnitOfMeasurment_UnitOfMeasurementId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemReceivalDetails_UnitOfMeasurment_MeasurementUnitId",
                table: "ItemReceivalDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_UnitOfMeasurment_MeasurementUnitId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequestLists_UnitOfMeasurment_MeasurementUnitId",
                table: "PurchaseRequestLists");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreRequestLists_UnitOfMeasurment_MeasurementUnitId",
                table: "StoreRequestLists");

            migrationBuilder.DropTable(
                name: "UnitOfMeasurment");

            migrationBuilder.RenameColumn(
                name: "UnitOfMeasurementId",
                table: "Activities",
                newName: "IndicatorId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_UnitOfMeasurementId",
                table: "Activities",
                newName: "IX_Activities_IndicatorId");

            migrationBuilder.CreateTable(
                name: "Indicators",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Indicators", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Indicators_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MeasurmentUnits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    MeasurementType = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    ToSIUnit = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MeasurmentUnits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MeasurmentUnits_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Indicators_CreatedById",
                table: "Indicators",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_MeasurmentUnits_CreatedById",
                table: "MeasurmentUnits",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Indicators_IndicatorId",
                table: "Activities",
                column: "IndicatorId",
                principalTable: "Indicators",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemReceivalDetails_MeasurmentUnits_MeasurementUnitId",
                table: "ItemReceivalDetails",
                column: "MeasurementUnitId",
                principalTable: "MeasurmentUnits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_MeasurmentUnits_MeasurementUnitId",
                table: "Products",
                column: "MeasurementUnitId",
                principalTable: "MeasurmentUnits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequestLists_MeasurmentUnits_MeasurementUnitId",
                table: "PurchaseRequestLists",
                column: "MeasurementUnitId",
                principalTable: "MeasurmentUnits",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreRequestLists_MeasurmentUnits_MeasurementUnitId",
                table: "StoreRequestLists",
                column: "MeasurementUnitId",
                principalTable: "MeasurmentUnits",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Indicators_IndicatorId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_ItemReceivalDetails_MeasurmentUnits_MeasurementUnitId",
                table: "ItemReceivalDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Products_MeasurmentUnits_MeasurementUnitId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequestLists_MeasurmentUnits_MeasurementUnitId",
                table: "PurchaseRequestLists");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreRequestLists_MeasurmentUnits_MeasurementUnitId",
                table: "StoreRequestLists");

            migrationBuilder.DropTable(
                name: "Indicators");

            migrationBuilder.DropTable(
                name: "MeasurmentUnits");

            migrationBuilder.RenameColumn(
                name: "IndicatorId",
                table: "Activities",
                newName: "UnitOfMeasurementId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_IndicatorId",
                table: "Activities",
                newName: "IX_Activities_UnitOfMeasurementId");

            migrationBuilder.CreateTable(
                name: "UnitOfMeasurment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LocalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    Rowstatus = table.Column<int>(type: "int", nullable: false),
                    ToSIUnit = table.Column<double>(type: "float", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfMeasurment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasurment_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurment_CreatedById",
                table: "UnitOfMeasurment",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_UnitOfMeasurment_UnitOfMeasurementId",
                table: "Activities",
                column: "UnitOfMeasurementId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ItemReceivalDetails_UnitOfMeasurment_MeasurementUnitId",
                table: "ItemReceivalDetails",
                column: "MeasurementUnitId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_UnitOfMeasurment_MeasurementUnitId",
                table: "Products",
                column: "MeasurementUnitId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequestLists_UnitOfMeasurment_MeasurementUnitId",
                table: "PurchaseRequestLists",
                column: "MeasurementUnitId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreRequestLists_UnitOfMeasurment_MeasurementUnitId",
                table: "StoreRequestLists",
                column: "MeasurementUnitId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");
        }
    }
}
