using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class AmharicFirstName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AmharicName",
                table: "Employees",
                newName: "AmharicMiddleName");

            migrationBuilder.AddColumn<string>(
                name: "AmharicFirstName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "AmharicLastName",
                table: "Employees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AmharicFirstName",
                table: "Employees");

            migrationBuilder.DropColumn(
                name: "AmharicLastName",
                table: "Employees");

            migrationBuilder.RenameColumn(
                name: "AmharicMiddleName",
                table: "Employees",
                newName: "AmharicName");
        }
    }
}
