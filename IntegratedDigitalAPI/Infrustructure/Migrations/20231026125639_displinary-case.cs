using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class displinarycase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Remark",
                table: "LoanSettings",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeeDisciplinaryCases",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    WarningType = table.Column<int>(type: "int", nullable: false),
                    Fault = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DetailDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDisciplinaryCases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDisciplinaryCases_Employees_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeDisciplinaryCases_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeDisciplinaryCases_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDisciplinaryCases_ApprovedById",
                table: "EmployeeDisciplinaryCases",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDisciplinaryCases_CreatedById",
                table: "EmployeeDisciplinaryCases",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDisciplinaryCases_EmployeeId",
                table: "EmployeeDisciplinaryCases",
                column: "EmployeeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeDisciplinaryCases");

            migrationBuilder.DropColumn(
                name: "Remark",
                table: "LoanSettings");
        }
    }
}
