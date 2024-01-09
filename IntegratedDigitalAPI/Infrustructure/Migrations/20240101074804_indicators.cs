using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class indicators : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_UnitOfMeasurment_UnitOfMeasurementId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_UnitOfMeasurementId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "UnitOfMeasurementId",
                table: "Activities");

            migrationBuilder.AddColumn<string>(
                name: "Indicator",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "IsPercentage",
                table: "Activities",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Indicator",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "IsPercentage",
                table: "Activities");

            migrationBuilder.AddColumn<Guid>(
                name: "UnitOfMeasurementId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_UnitOfMeasurementId",
                table: "Activities",
                column: "UnitOfMeasurementId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_UnitOfMeasurment_UnitOfMeasurementId",
                table: "Activities",
                column: "UnitOfMeasurementId",
                principalTable: "UnitOfMeasurment",
                principalColumn: "Id");
        }
    }
}
