using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class addtrainingproject : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Project",
                table: "Trainings");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Trainings",
                type: "uniqueidentifier",
                defaultValue:new Guid("4EBB0C09-42DC-4A97-B9C8-1EF89A7DB843"),
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trainings_ProjectId",
                table: "Trainings",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Projects_ProjectId",
                table: "Trainings",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Projects_ProjectId",
                table: "Trainings");

            migrationBuilder.DropIndex(
                name: "IX_Trainings_ProjectId",
                table: "Trainings");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Trainings");

            migrationBuilder.AddColumn<string>(
                name: "Project",
                table: "Trainings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
