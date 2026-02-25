using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class AddDurationInYearsToStrategicPeriod : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DurationInYears",
                table: "StrategicPeriods",
                type: "int",
                nullable: false,
                defaultValue: 5);

            // Update existing records to have 5 years duration (backward compatibility)
            migrationBuilder.Sql("UPDATE StrategicPeriods SET DurationInYears = 5 WHERE DurationInYears = 0");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DurationInYears",
                table: "StrategicPeriods");
        }
    }
}
