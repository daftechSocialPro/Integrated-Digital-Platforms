using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MembershipInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class memberbirth : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_EducationalFields_EducationalFieldId",
                table: "Members");

            //migrationBuilder.DropIndex(
            //    name: "IX_Members_EducationalFieldId",
            //    table: "Members");

            migrationBuilder.DropColumn(
                name: "EducationalFieldId",
                table: "Members");

            migrationBuilder.AddColumn<DateTime>(
                name: "BirthDate",
                table: "Members",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "EducationalField",
                table: "Members",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BirthDate",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "EducationalField",
                table: "Members");

            migrationBuilder.AddColumn<Guid>(
                name: "EducationalFieldId",
                table: "Members",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Members_EducationalFieldId",
                table: "Members",
                column: "EducationalFieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_EducationalFields_EducationalFieldId",
                table: "Members",
                column: "EducationalFieldId",
                principalTable: "EducationalFields",
                principalColumn: "Id");
        }
    }
}
