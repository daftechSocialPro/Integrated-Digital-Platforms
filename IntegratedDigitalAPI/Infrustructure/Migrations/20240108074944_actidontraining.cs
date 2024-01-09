using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class actidontraining : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityTrainings");

            migrationBuilder.AddColumn<Guid>(
                name: "ActivityId",
                table: "Trainings",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Trainings_ActivityId",
                table: "Trainings",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Trainings_Activities_ActivityId",
                table: "Trainings",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id"
                );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "ActivityTrainings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTrainings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTrainings_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTrainings_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTrainings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrainings_ActivityId",
                table: "ActivityTrainings",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrainings_CreatedById",
                table: "ActivityTrainings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrainings_TrainingId",
                table: "ActivityTrainings",
                column: "TrainingId");
        }
    }
}
