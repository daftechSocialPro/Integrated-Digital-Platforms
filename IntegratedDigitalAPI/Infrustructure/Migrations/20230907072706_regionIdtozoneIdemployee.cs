using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class regionIdtozoneIdemployee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Regions_RegionId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "RegionId",
                table: "Employees",
                newName: "ZoneId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_RegionId",
                table: "Employees",
                newName: "IX_Employees_ZoneId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Zones_ZoneId",
                table: "Employees",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Employees_Zones_ZoneId",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "ZoneId",
                table: "Employees",
                newName: "RegionId");

            migrationBuilder.RenameIndex(
                name: "IX_Employees_ZoneId",
                table: "Employees",
                newName: "IX_Employees_RegionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Employees_Regions_RegionId",
                table: "Employees",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }
    }
}
