using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class activitylocations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Regions_RegionId",
                table: "Activities");

            //migrationBuilder.DropIndex(
            //    name: "IX_Activities_RegionId",
            //    table: "Activities");

            migrationBuilder.DropColumn(
                name: "Latitude",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Longtude",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Woreda",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "Zone",
                table: "Activities");

            migrationBuilder.CreateTable(
                name: "ActivityLocations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RegionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Zone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Woreda = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longtude = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityLocations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityLocations_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityLocations_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityLocations_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLocations_ActivityId",
                table: "ActivityLocations",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLocations_CreatedById",
                table: "ActivityLocations",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityLocations_RegionId",
                table: "ActivityLocations",
                column: "RegionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityLocations");

            migrationBuilder.AddColumn<double>(
                name: "Latitude",
                table: "Activities",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Longtude",
                table: "Activities",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<Guid>(
                name: "RegionId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Woreda",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

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

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Regions_RegionId",
                table: "Activities",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }
    }
}
