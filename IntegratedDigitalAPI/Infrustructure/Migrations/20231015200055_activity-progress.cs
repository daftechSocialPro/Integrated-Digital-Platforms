using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class activityprogress : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgress_Activities_ActivityId",
                table: "ActivityProgress");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgress_ActivityTargetDivisions_QuarterId",
                table: "ActivityProgress");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgress_Employees_EmployeeValueId",
                table: "ActivityProgress");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgress_Users_CreatedById",
                table: "ActivityProgress");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgressAttachments_ActivityProgress_ActivityProgressId",
                table: "ProgressAttachments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityProgress",
                table: "ActivityProgress");

            migrationBuilder.RenameTable(
                name: "ActivityProgress",
                newName: "ActivityProgresses");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgress_QuarterId",
                table: "ActivityProgresses",
                newName: "IX_ActivityProgresses_QuarterId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgress_EmployeeValueId",
                table: "ActivityProgresses",
                newName: "IX_ActivityProgresses_EmployeeValueId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgress_CreatedById",
                table: "ActivityProgresses",
                newName: "IX_ActivityProgresses_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgress_ActivityId",
                table: "ActivityProgresses",
                newName: "IX_ActivityProgresses_ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityProgresses",
                table: "ActivityProgresses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgresses_Activities_ActivityId",
                table: "ActivityProgresses",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgresses_ActivityTargetDivisions_QuarterId",
                table: "ActivityProgresses",
                column: "QuarterId",
                principalTable: "ActivityTargetDivisions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgresses_Employees_EmployeeValueId",
                table: "ActivityProgresses",
                column: "EmployeeValueId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgresses_Users_CreatedById",
                table: "ActivityProgresses",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgressAttachments_ActivityProgresses_ActivityProgressId",
                table: "ProgressAttachments",
                column: "ActivityProgressId",
                principalTable: "ActivityProgresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgresses_Activities_ActivityId",
                table: "ActivityProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgresses_ActivityTargetDivisions_QuarterId",
                table: "ActivityProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgresses_Employees_EmployeeValueId",
                table: "ActivityProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_ActivityProgresses_Users_CreatedById",
                table: "ActivityProgresses");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgressAttachments_ActivityProgresses_ActivityProgressId",
                table: "ProgressAttachments");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ActivityProgresses",
                table: "ActivityProgresses");

            migrationBuilder.RenameTable(
                name: "ActivityProgresses",
                newName: "ActivityProgress");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgresses_QuarterId",
                table: "ActivityProgress",
                newName: "IX_ActivityProgress_QuarterId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgresses_EmployeeValueId",
                table: "ActivityProgress",
                newName: "IX_ActivityProgress_EmployeeValueId");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgresses_CreatedById",
                table: "ActivityProgress",
                newName: "IX_ActivityProgress_CreatedById");

            migrationBuilder.RenameIndex(
                name: "IX_ActivityProgresses_ActivityId",
                table: "ActivityProgress",
                newName: "IX_ActivityProgress_ActivityId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ActivityProgress",
                table: "ActivityProgress",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgress_Activities_ActivityId",
                table: "ActivityProgress",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgress_ActivityTargetDivisions_QuarterId",
                table: "ActivityProgress",
                column: "QuarterId",
                principalTable: "ActivityTargetDivisions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgress_Employees_EmployeeValueId",
                table: "ActivityProgress",
                column: "EmployeeValueId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActivityProgress_Users_CreatedById",
                table: "ActivityProgress",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProgressAttachments_ActivityProgress_ActivityProgressId",
                table: "ProgressAttachments",
                column: "ActivityProgressId",
                principalTable: "ActivityProgress",
                principalColumn: "Id");
        }
    }
}
