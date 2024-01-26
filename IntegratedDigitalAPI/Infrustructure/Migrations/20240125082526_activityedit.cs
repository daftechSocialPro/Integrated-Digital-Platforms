using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class activityedit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Zones_ZoneId",
                table: "Activities");

            //migrationBuilder.DropIndex(
            //    name: "IX_Activities_ZoneId",
            //    table: "Activities");

            migrationBuilder.DropColumn(
                name: "StratgicPlanId",
                table: "Indicators");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Activities");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "StratgicPlanId",
                table: "Indicators",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "ZoneId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ZoneId",
                table: "Activities",
                column: "ZoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Zones_ZoneId",
                table: "Activities",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "Id");
        }
    }
}
