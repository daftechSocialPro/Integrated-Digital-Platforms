using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class projectlocation_activity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectLocationId",
                table: "Activities",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("83cfe8c8-61ee-49b3-a43e-0e1262b62b95"));

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ProjectLocationId",
                table: "Activities",
                column: "ProjectLocationId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_ProjectLocations_ProjectLocationId",
                table: "Activities",
                column: "ProjectLocationId",
                principalTable: "ProjectLocations",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ProjectLocations_ProjectLocationId",
                table: "Activities");

            migrationBuilder.DropIndex(
                name: "IX_Activities_ProjectLocationId",
                table: "Activities");

            migrationBuilder.DropColumn(
                name: "ProjectLocationId",
                table: "Activities");
        }
    }
}
