using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class VacancyList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_Vacancies_VacancyId",
                table: "Applicants");

            migrationBuilder.DropForeignKey(
                name: "FK_VacancyDocuments_Vacancies_VacancyId",
                table: "VacancyDocuments");

            migrationBuilder.DropTable(
                name: "Vacancies");

            migrationBuilder.CreateTable(
                name: "VacancyLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VacancyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PositionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VaccancyDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EducationalLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    EmploymentType = table.Column<int>(type: "int", nullable: false),
                    VaccancyStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VaccancyEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    GPA = table.Column<double>(type: "float", nullable: true),
                    VacancyType = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacancyLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacancyLists_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_EducationalFields_EducationalFieldId",
                        column: x => x.EducationalFieldId,
                        principalTable: "EducationalFields",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_EducationalLevels_EducationalLevelId",
                        column: x => x.EducationalLevelId,
                        principalTable: "EducationalLevels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_CreatedById",
                table: "VacancyLists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_DepartmentId",
                table: "VacancyLists",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_EducationalFieldId",
                table: "VacancyLists",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_EducationalLevelId",
                table: "VacancyLists",
                column: "EducationalLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_PositionId",
                table: "VacancyLists",
                column: "PositionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_VacancyLists_VacancyId",
                table: "Applicants",
                column: "VacancyId",
                principalTable: "VacancyLists",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VacancyDocuments_VacancyLists_VacancyId",
                table: "VacancyDocuments",
                column: "VacancyId",
                principalTable: "VacancyLists",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Applicants_VacancyLists_VacancyId",
                table: "Applicants");

            migrationBuilder.DropForeignKey(
                name: "FK_VacancyDocuments_VacancyLists_VacancyId",
                table: "VacancyDocuments");

            migrationBuilder.DropTable(
                name: "VacancyLists");

            migrationBuilder.CreateTable(
                name: "Vacancies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PositionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EmploymentType = table.Column<int>(type: "int", nullable: false),
                    GPA = table.Column<double>(type: "float", nullable: true),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    Rowstatus = table.Column<int>(type: "int", nullable: false),
                    VacancyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VacancyType = table.Column<int>(type: "int", nullable: false),
                    VaccancyDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VaccancyEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VaccancyStartDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vacancies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Vacancies_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Vacancies_EducationalFields_EducationalFieldId",
                        column: x => x.EducationalFieldId,
                        principalTable: "EducationalFields",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Vacancies_EducationalLevels_EducationalLevelId",
                        column: x => x.EducationalLevelId,
                        principalTable: "EducationalLevels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Vacancies_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Vacancies_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vacancies_CreatedById",
                table: "Vacancies",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancies_DepartmentId",
                table: "Vacancies",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancies_EducationalFieldId",
                table: "Vacancies",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancies_EducationalLevelId",
                table: "Vacancies",
                column: "EducationalLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Vacancies_PositionId",
                table: "Vacancies",
                column: "PositionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Applicants_Vacancies_VacancyId",
                table: "Applicants",
                column: "VacancyId",
                principalTable: "Vacancies",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_VacancyDocuments_Vacancies_VacancyId",
                table: "VacancyDocuments",
                column: "VacancyId",
                principalTable: "Vacancies",
                principalColumn: "Id");
        }
    }
}
