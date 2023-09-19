using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class VacancyApplicantLst : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplcantDocuments_Applicants_ApplicantId",
                table: "ApplcantDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_ApplcantDocuments_VacancyDocuments_VacancyDocumentId",
                table: "ApplcantDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_VacancyLists_VacancyId",
                table: "Applicants");

            migrationBuilder.DropIndex(
                name: "IX_Applicants_VacancyId",
                table: "Applicants");

            migrationBuilder.DropIndex(
                name: "IX_ApplcantDocuments_ApplicantId",
                table: "ApplcantDocuments");

            migrationBuilder.DropColumn(
                name: "VacancyId",
                table: "Applicants");

            migrationBuilder.DropColumn(
                name: "ApplicantId",
                table: "ApplcantDocuments");

            migrationBuilder.RenameColumn(
                name: "ApplicantStatus",
                table: "Applicants",
                newName: "ApplicantType");

            migrationBuilder.RenameColumn(
                name: "VacancyDocumentId",
                table: "ApplcantDocuments",
                newName: "ApplicantVacnncyId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplcantDocuments_VacancyDocumentId",
                table: "ApplcantDocuments",
                newName: "IX_ApplcantDocuments_ApplicantVacnncyId");

            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "ApplicantWorkExperiances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Applicants",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Applicants",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AlterColumn<double>(
                name: "GPA",
                table: "ApplicantEducations",
                type: "float",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float");

            migrationBuilder.AddColumn<string>(
                name: "File",
                table: "ApplicantEducations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Remark",
                table: "ApplicantEducations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ApplcantDocuments",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ApplicantVacancies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ApplicantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VacancyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicantStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicantVacancies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicantVacancies_Applicants_ApplicantId",
                        column: x => x.ApplicantId,
                        principalTable: "Applicants",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ApplicantVacancies_VacancyLists_VacancyId",
                        column: x => x.VacancyId,
                        principalTable: "VacancyLists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantVacancies_ApplicantId",
                table: "ApplicantVacancies",
                column: "ApplicantId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantVacancies_VacancyId",
                table: "ApplicantVacancies",
                column: "VacancyId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplcantDocuments_ApplicantVacancies_ApplicantVacnncyId",
                table: "ApplcantDocuments",
                column: "ApplicantVacnncyId",
                principalTable: "ApplicantVacancies",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ApplcantDocuments_ApplicantVacancies_ApplicantVacnncyId",
                table: "ApplcantDocuments");

            migrationBuilder.DropTable(
                name: "ApplicantVacancies");

            migrationBuilder.DropColumn(
                name: "File",
                table: "ApplicantWorkExperiances");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Applicants");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Applicants");

            migrationBuilder.DropColumn(
                name: "File",
                table: "ApplicantEducations");

            migrationBuilder.DropColumn(
                name: "Remark",
                table: "ApplicantEducations");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ApplcantDocuments");

            migrationBuilder.RenameColumn(
                name: "ApplicantType",
                table: "Applicants",
                newName: "ApplicantStatus");

            migrationBuilder.RenameColumn(
                name: "ApplicantVacnncyId",
                table: "ApplcantDocuments",
                newName: "VacancyDocumentId");

            migrationBuilder.RenameIndex(
                name: "IX_ApplcantDocuments_ApplicantVacnncyId",
                table: "ApplcantDocuments",
                newName: "IX_ApplcantDocuments_VacancyDocumentId");

            migrationBuilder.AddColumn<Guid>(
                name: "VacancyId",
                table: "Applicants",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<double>(
                name: "GPA",
                table: "ApplicantEducations",
                type: "float",
                nullable: false,
                defaultValue: 0.0,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ApplicantId",
                table: "ApplcantDocuments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_VacancyId",
                table: "Applicants",
                column: "VacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplcantDocuments_ApplicantId",
                table: "ApplcantDocuments",
                column: "ApplicantId");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplcantDocuments_Applicants_ApplicantId",
                table: "ApplcantDocuments",
                column: "ApplicantId",
                principalTable: "Applicants",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ApplcantDocuments_VacancyDocuments_VacancyDocumentId",
                table: "ApplcantDocuments",
                column: "VacancyDocumentId",
                principalTable: "VacancyDocuments",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_VacancyLists_VacancyId",
                table: "Applicants",
                column: "VacancyId",
                principalTable: "VacancyLists",
                principalColumn: "Id");
        }
    }
}
