using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class AddStrategicPeriod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Create StrategicPeriods table first
            migrationBuilder.CreateTable(
                name: "StrategicPeriods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrategicPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StrategicPeriods_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            // Create a default strategic period for existing data
            var defaultPeriodId = Guid.NewGuid();
            var defaultStartDate = new DateTime(DateTime.Now.Year, 1, 1);
            var defaultEndDate = defaultStartDate.AddYears(5).AddDays(-1);
            
            migrationBuilder.Sql($@"
                INSERT INTO StrategicPeriods (Id, Name, Description, StartDate, EndDate, CreatedDate, Rowstatus)
                VALUES ('{defaultPeriodId}', 'Default Strategic Period', 'Default period for existing strategic plans', '{defaultStartDate:yyyy-MM-dd}', '{defaultEndDate:yyyy-MM-dd}', GETDATE(), 0)
            ");

            // Add StrategicPeriodId column as nullable first
            migrationBuilder.AddColumn<Guid>(
                name: "StrategicPeriodId",
                table: "StrategicPlans",
                type: "uniqueidentifier",
                nullable: true);

            // Update all existing StrategicPlans to use the default period
            migrationBuilder.Sql($@"
                UPDATE StrategicPlans 
                SET StrategicPeriodId = '{defaultPeriodId}'
                WHERE StrategicPeriodId IS NULL
            ");

            // Make the column non-nullable
            migrationBuilder.AlterColumn<Guid>(
                name: "StrategicPeriodId",
                table: "StrategicPlans",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: defaultPeriodId);

            migrationBuilder.CreateIndex(
                name: "IX_StrategicPlans_StrategicPeriodId",
                table: "StrategicPlans",
                column: "StrategicPeriodId");

            migrationBuilder.CreateIndex(
                name: "IX_StrategicPeriods_CreatedById",
                table: "StrategicPeriods",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_StrategicPlans_StrategicPeriods_StrategicPeriodId",
                table: "StrategicPlans",
                column: "StrategicPeriodId",
                principalTable: "StrategicPeriods",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StrategicPlans_StrategicPeriods_StrategicPeriodId",
                table: "StrategicPlans");

            migrationBuilder.DropTable(
                name: "StrategicPeriods");

            migrationBuilder.DropIndex(
                name: "IX_StrategicPlans_StrategicPeriodId",
                table: "StrategicPlans");

            migrationBuilder.DropColumn(
                name: "StrategicPeriodId",
                table: "StrategicPlans");
        }
    }
}
