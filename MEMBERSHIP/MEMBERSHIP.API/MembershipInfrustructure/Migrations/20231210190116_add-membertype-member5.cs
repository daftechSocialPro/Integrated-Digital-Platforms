using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MembershipInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class addmembertypemember5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_EducationalLevels_EducationalLevelId",
                table: "Members");

            migrationBuilder.DropColumn(
                name: "EucationalLevelId",
                table: "Members");

            migrationBuilder.AlterColumn<Guid>(
                name: "EducationalLevelId",
                table: "Members",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Members_EducationalLevels_EducationalLevelId",
                table: "Members",
                column: "EducationalLevelId",
                principalTable: "EducationalLevels",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Members_EducationalLevels_EducationalLevelId",
                table: "Members");

            migrationBuilder.AlterColumn<Guid>(
                name: "EducationalLevelId",
                table: "Members",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "EucationalLevelId",
                table: "Members",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Members_EducationalLevels_EducationalLevelId",
                table: "Members",
                column: "EducationalLevelId",
                principalTable: "EducationalLevels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
