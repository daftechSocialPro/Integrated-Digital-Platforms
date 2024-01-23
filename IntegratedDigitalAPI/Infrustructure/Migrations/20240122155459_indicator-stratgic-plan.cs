using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class indicatorstratgicplan : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LocalName",
                table: "Indicators");

            migrationBuilder.AddColumn<Guid>(
                name: "StrategicPlanId",
                table: "Indicators",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "StratgicPlanId",
                table: "Indicators",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Indicators_StrategicPlanId",
                table: "Indicators",
                column: "StrategicPlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_Indicators_StrategicPlans_StrategicPlanId",
                table: "Indicators",
                column: "StrategicPlanId",
                principalTable: "StrategicPlans",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Indicators_StrategicPlans_StrategicPlanId",
                table: "Indicators");

            migrationBuilder.DropIndex(
                name: "IX_Indicators_StrategicPlanId",
                table: "Indicators");

            migrationBuilder.DropColumn(
                name: "StrategicPlanId",
                table: "Indicators");

            migrationBuilder.DropColumn(
                name: "StratgicPlanId",
                table: "Indicators");

            migrationBuilder.AddColumn<string>(
                name: "LocalName",
                table: "Indicators",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
