using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MembershipInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class regiononadmin : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "RegionId",
                table: "Admins",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Admins_RegionId",
                table: "Admins",
                column: "RegionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Admins_Regions_RegionId",
                table: "Admins",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Admins_Regions_RegionId",
                table: "Admins");

            migrationBuilder.DropIndex(
                name: "IX_Admins_RegionId",
                table: "Admins");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Admins");
        }
    }
}
