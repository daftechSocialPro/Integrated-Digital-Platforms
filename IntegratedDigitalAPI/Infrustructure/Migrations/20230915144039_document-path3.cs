using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class documentpath3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VacancyDocuments_VacancyLists_VacancyListId",
                table: "VacancyDocuments");

            migrationBuilder.DropIndex(
                name: "IX_VacancyDocuments_VacancyListId",
                table: "VacancyDocuments");

            migrationBuilder.DropColumn(
                name: "VacancyListId",
                table: "VacancyDocuments");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyDocuments_VacancyId",
                table: "VacancyDocuments",
                column: "VacancyId");

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
                name: "FK_VacancyDocuments_VacancyLists_VacancyId",
                table: "VacancyDocuments");

            migrationBuilder.DropIndex(
                name: "IX_VacancyDocuments_VacancyId",
                table: "VacancyDocuments");

            migrationBuilder.AddColumn<Guid>(
                name: "VacancyListId",
                table: "VacancyDocuments",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_VacancyDocuments_VacancyListId",
                table: "VacancyDocuments",
                column: "VacancyListId");

            migrationBuilder.AddForeignKey(
                name: "FK_VacancyDocuments_VacancyLists_VacancyListId",
                table: "VacancyDocuments",
                column: "VacancyListId",
                principalTable: "VacancyLists",
                principalColumn: "Id");
        }
    }
}
