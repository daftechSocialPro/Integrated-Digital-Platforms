using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MembershipInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class memberIdandvissible : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsVissible",
                table: "Courses",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "MemberId",
                table: "Courses",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Courses_MemberId",
                table: "Courses",
                column: "MemberId");

            migrationBuilder.AddForeignKey(
                name: "FK_Courses_Members_MemberId",
                table: "Courses",
                column: "MemberId",
                principalTable: "Members",
                principalColumn: "Id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Courses_Members_MemberId",
                table: "Courses");

            migrationBuilder.DropIndex(
                name: "IX_Courses_MemberId",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "IsVissible",
                table: "Courses");

            migrationBuilder.DropColumn(
                name: "MemberId",
                table: "Courses");
        }
    }
}
