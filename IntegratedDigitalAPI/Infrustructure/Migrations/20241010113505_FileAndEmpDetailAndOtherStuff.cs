using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class FileAndEmpDetailAndOtherStuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeFiles");

            migrationBuilder.DropColumn(
                name: "DocumentName",
                table: "EmployeeDocuments");

            migrationBuilder.RenameColumn(
                name: "DocumentPath",
                table: "EmployeeDocuments",
                newName: "FilePath");

            migrationBuilder.AddColumn<string>(
                name: "Woreda",
                table: "EmploymentDetails",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<Guid>(
                name: "ZoneId",
                table: "EmploymentDetails",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("5E9E5B9C-BA4C-4947-BAEE-01B70C016A75"));

            migrationBuilder.AddColumn<Guid>(
                name: "DocumentTypeId",
                table: "EmployeeDocuments",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateTable(
                name: "DocumentTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FileExtentions = table.Column<int>(type: "int", nullable: false),
                    DocumentCategory = table.Column<int>(type: "int", nullable: false),
                    IsRequired = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocumentTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DocumentTypes_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmploymentDetails_ZoneId",
                table: "EmploymentDetails",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_DocumentTypeId",
                table: "EmployeeDocuments",
                column: "DocumentTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_DocumentTypes_CreatedById",
                table: "DocumentTypes",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeeDocuments_DocumentTypes_DocumentTypeId",
                table: "EmployeeDocuments",
                column: "DocumentTypeId",
                principalTable: "DocumentTypes",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmploymentDetails_Zones_ZoneId",
                table: "EmploymentDetails",
                column: "ZoneId",
                principalTable: "Zones",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeeDocuments_DocumentTypes_DocumentTypeId",
                table: "EmployeeDocuments");

            migrationBuilder.DropForeignKey(
                name: "FK_EmploymentDetails_Zones_ZoneId",
                table: "EmploymentDetails");

            migrationBuilder.DropTable(
                name: "DocumentTypes");

            migrationBuilder.DropIndex(
                name: "IX_EmploymentDetails_ZoneId",
                table: "EmploymentDetails");

            migrationBuilder.DropIndex(
                name: "IX_EmployeeDocuments_DocumentTypeId",
                table: "EmployeeDocuments");

            migrationBuilder.DropColumn(
                name: "Woreda",
                table: "EmploymentDetails");

            migrationBuilder.DropColumn(
                name: "ZoneId",
                table: "EmploymentDetails");

            migrationBuilder.DropColumn(
                name: "DocumentTypeId",
                table: "EmployeeDocuments");

            migrationBuilder.RenameColumn(
                name: "FilePath",
                table: "EmployeeDocuments",
                newName: "DocumentPath");

            migrationBuilder.AddColumn<string>(
                name: "DocumentName",
                table: "EmployeeDocuments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "EmployeeFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeFiles_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeFiles_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFiles_CreatedById",
                table: "EmployeeFiles",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFiles_EmployeeId",
                table: "EmployeeFiles",
                column: "EmployeeId");
        }
    }
}
