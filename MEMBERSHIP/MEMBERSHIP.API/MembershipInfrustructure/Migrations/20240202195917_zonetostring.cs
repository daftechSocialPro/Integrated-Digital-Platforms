using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MembershipInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class zonetostring : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Zones_ZoneId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "Members"
                );

        

            migrationBuilder.AddColumn<string>(
                name: "Zone",
                table: "Members",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RegionId",
                table: "Members",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("8272C669-6613-461A-B933-0DAE8B94D648"));

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Regions_RegionId",
                table: "Members",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_Regions_RegionId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "Zone",
                table: "Members");

            migrationBuilder.RenameColumn(
                name: "RegionId",
                table: "Members",
                newName: "ZoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Members_RegionId",
                table: "Members",
                newName: "IX_Members_ZoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_Zones_ZoneId",
                table: "Members",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "Id");
        }
    }
}
