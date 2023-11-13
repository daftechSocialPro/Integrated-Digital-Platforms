using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class traineedetail : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "EducationalFieldId",
                table: "Trainees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "EducationalLevelId",
                table: "Trainees",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "Trainees",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_EducationalFieldId",
                table: "Trainees",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_EducationalLevelId",
                table: "Trainees",
                column: "EducationalLevelId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainees_EducationalFields_EducationalFieldId",
                table: "Trainees",
                column: "EducationalFieldId",
                principalTable: "EducationalFields",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainees_EducationalLevels_EducationalLevelId",
                table: "Trainees",
                column: "EducationalLevelId",
                principalTable: "EducationalLevels",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainees_EducationalFields_EducationalFieldId",
                table: "Trainees");

            migrationBuilder.DropForeignKey(
                name: "FK_Trainees_EducationalLevels_EducationalLevelId",
                table: "Trainees");

            migrationBuilder.DropIndex(
                name: "IX_Trainees_EducationalFieldId",
                table: "Trainees");

            migrationBuilder.DropIndex(
                name: "IX_Trainees_EducationalLevelId",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "EducationalFieldId",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "EducationalLevelId",
                table: "Trainees");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "Trainees");
        }
    }
}
