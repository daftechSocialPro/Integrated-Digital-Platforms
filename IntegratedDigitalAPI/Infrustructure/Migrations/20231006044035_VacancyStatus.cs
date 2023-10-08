using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class VacancyStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ApplicantStatus",
                table: "ApplicantVacancies");

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "Applicants",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.CreateTable(
                name: "VacancyStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ActionTakerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ApplicantVacancyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicantStatus = table.Column<int>(type: "int", nullable: false),
                    IsNotificationSent = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacancyStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacancyStatuses_ApplicantVacancies_ApplicantVacancyId",
                        column: x => x.ApplicantVacancyId,
                        principalTable: "ApplicantVacancies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyStatuses_Users_ActionTakerId",
                        column: x => x.ActionTakerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_VacancyStatuses_ActionTakerId",
                table: "VacancyStatuses",
                column: "ActionTakerId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyStatuses_ApplicantVacancyId",
                table: "VacancyStatuses",
                column: "ApplicantVacancyId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VacancyStatuses");

            migrationBuilder.AddColumn<int>(
                name: "ApplicantStatus",
                table: "ApplicantVacancies",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "Photo",
                table: "Applicants",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}
