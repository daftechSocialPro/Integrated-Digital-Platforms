using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class activityedit2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RegionId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StrategicPlanIndicatorId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Zone",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_RegionId",
                table: "Activities",
                column: "RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_StrategicPlanIndicatorId",
                table: "Activities",
                column: "StrategicPlanIndicatorId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Indicators_StrategicPlanIndicatorId",
                table: "Activities",
                column: "StrategicPlanIndicatorId",
                principalTable: "Indicators",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Regions_RegionId",
                table: "Activities",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Indicators_StrategicPlanIndicatorId",
                table: "Activities");

            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Regions_RegionId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_RegionId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_StrategicPlanIndicatorId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "StrategicPlanIndicatorId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Zone",
                table: "Activities");
        }
    }
}
