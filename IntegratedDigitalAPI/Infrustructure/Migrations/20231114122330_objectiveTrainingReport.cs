using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class objectiveTrainingReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Objective",
                table: "TrainingReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "PrePostSummary",
                table: "TrainingReports",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Objective",
                table: "TrainingReports");

            migrationBuilder.DropColumn(
                name: "PrePostSummary",
                table: "TrainingReports");
        }
    }
}
