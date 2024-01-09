using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class trainingreport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainees_EducationalFields_EducationalFieldId",
                table: "Trainees");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainees_Users_CreatedById",
                table: "Trainees");

            migrationBuilder.DropForeignKey(
                name: "FK_TrainingReports_Users_CreatedById",
                table: "TrainingReports");

            migrationBuilder.DropIndex(
                name: "IX_TrainingReports_CreatedById",
                table: "TrainingReports");

            migrationBuilder.DropIndex(
                name: "IX_Trainees_CreatedById",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "NameofOrganizaton",
                table: "Trainings");

            migrationBuilder.DropColumn(
                name: "TypeofOrganization",
                table: "Trainings");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "TrainingReports");

            migrationBuilder.DropColumn(
                name: "Rowstatus",
                table: "TrainingReports");

            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "CreatedDate",
                table: "Trainees");

            migrationBuilder.RenameColumn(
                name: "Rowstatus",
                table: "Trainees",
                newName: "Age");

            migrationBuilder.RenameColumn(
                name: "EducationalFieldId",
                table: "Trainees",
                newName: "RegionId");

            migrationBuilder.RenameIndex(
                name: "IX_Trainees_EducationalFieldId",
                table: "Trainees",
                newName: "IX_Trainees_RegionId");

            migrationBuilder.AddColumn<string>(
                name: "EducationalField",
                table: "Trainees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "NameofOrganizaton",
                table: "Trainees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeofOrganization",
                table: "Trainees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Woreda",
                table: "Trainees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Zone",
                table: "Trainees",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "TrainingReportAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingReportId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileType = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingReportAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingReportAttachments_TrainingReports_TrainingReportId",
                        column: x => x.TrainingReportId,
                        principalTable: "TrainingReports",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TrainingReportAttachments_TrainingReportId",
                table: "TrainingReportAttachments",
                column: "TrainingReportId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainees_Regions_RegionId",
                table: "Trainees",
                column: "RegionId",
                principalTable: "Regions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainees_Regions_RegionId",
                table: "Trainees");

            migrationBuilder.DropTable(
                name: "TrainingReportAttachments");

            migrationBuilder.DropColumn(
                name: "EducationalField",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "NameofOrganizaton",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "TypeofOrganization",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "Woreda",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "Zone",
                table: "Trainees");

            migrationBuilder.RenameColumn(
                name: "RegionId",
                table: "Trainees",
                newName: "EducationalFieldId");

            migrationBuilder.RenameColumn(
                name: "Age",
                table: "Trainees",
                newName: "Rowstatus");

            migrationBuilder.RenameIndex(
                name: "IX_Trainees_RegionId",
                table: "Trainees",
                newName: "IX_Trainees_EducationalFieldId");

            migrationBuilder.AddColumn<string>(
                name: "NameofOrganizaton",
                table: "Trainings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TypeofOrganization",
                table: "Trainings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "TrainingReports",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Rowstatus",
                table: "TrainingReports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Trainees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedById",
                table: "Trainees",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedDate",
                table: "Trainees",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_TrainingReports_CreatedById",
                table: "TrainingReports",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_CreatedById",
                table: "Trainees",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainees_EducationalFields_EducationalFieldId",
                table: "Trainees",
                column: "EducationalFieldId",
                principalTable: "EducationalFields",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainees_Users_CreatedById",
                table: "Trainees",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TrainingReports_Users_CreatedById",
                table: "TrainingReports",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");
        }
    }
}
