using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class trainingdbup : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Trainings_Activities_ActivityId",
                table: "Trainings");

            migrationBuilder.DropIndex(
                name: "IX_Trainings_ActivityId",
                table: "Trainings");

            migrationBuilder.DropColumn(
                name: "ActivityId",
                table: "Trainings");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ActivityId",
                table: "Trainings",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Trainings_ActivityId",
                table: "Trainings",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Activities_ActivityId",
                table: "Trainings",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");
        }
    }
}
