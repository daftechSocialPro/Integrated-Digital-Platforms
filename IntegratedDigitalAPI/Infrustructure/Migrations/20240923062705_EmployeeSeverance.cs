using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class EmployeeSeverance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeeSeverances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmploymentDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSeverances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSeverances_EmploymentDetails_EmploymentDetailId",
                        column: x => x.EmploymentDetailId,
                        principalTable: "EmploymentDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSeverances_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSeverances_CreatedById",
                table: "EmployeeSeverances",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSeverances_EmploymentDetailId",
                table: "EmployeeSeverances",
                column: "EmploymentDetailId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmployeeSeverances");
        }
    }
}
