using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeGuarantee : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeGuarantiees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicFullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    OrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicOrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LetterNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LetterDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LetterPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsReturned = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeGuarantiees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeGuarantiees_Employees_EmployeeListId",
                        column: x => x.EmployeeListId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeGuarantiees_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeGuarantiees_CreatedById",
                table: "EmployeeGuarantiees",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeGuarantiees_EmployeeListId",
                table: "EmployeeGuarantiees",
                column: "EmployeeListId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeGuarantiees");
        }
    }
}
