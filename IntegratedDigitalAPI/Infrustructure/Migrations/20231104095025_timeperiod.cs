using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class timeperiod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ProjectLocations_ProjectLocationId",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "ProjectLocationId",
                table: "Activities",
                newName: "ZoneId"
                );
            migrationBuilder.Sql("UPDATE Activities SET ZoneId = '1CB5E20C-B483-4EA9-B902-33F164797C96';");
            migrationBuilder.RenameIndex(
                name: "IX_Activities_ProjectLocationId",
                table: "Activities",
                newName: "IX_Activities_ZoneId");

            migrationBuilder.AddColumn<string>(
                name: "Woreda",
                table: "Activities",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "BudgetYears",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetYears_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ReportingPeriods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumberOfDays = table.Column<int>(type: "int", nullable: false),
                    ReportingType = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportingPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReportingPeriods_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_BudgetYears_CreatedById",
                table: "BudgetYears",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ReportingPeriods_CreatedById",
                table: "ReportingPeriods",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_Zones_ZoneId",
                table: "Activities",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_Zones_ZoneId",
                table: "Activities");

            migrationBuilder.DropTable(
                name: "BudgetYears");

            migrationBuilder.DropTable(
                name: "ReportingPeriods");

            migrationBuilder.DropColumn(
                name: "Woreda",
                table: "Activities");

            migrationBuilder.RenameColumn(
                name: "ZoneId",
                table: "Activities",
                newName: "ProjectLocationId");

            migrationBuilder.RenameIndex(
                name: "IX_Activities_ZoneId",
                table: "Activities",
                newName: "IX_Activities_ProjectLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_ProjectLocations_ProjectLocationId",
                table: "Activities",
                column: "ProjectLocationId",
                principalTable: "ProjectLocations",
                principalColumn: "Id");
        }
    }
}
