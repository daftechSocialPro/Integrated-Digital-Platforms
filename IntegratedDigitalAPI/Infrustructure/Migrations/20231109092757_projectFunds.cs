using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class projectFunds : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Project_Funds",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectSourceFundId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Project_Funds", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Project_Funds_ProjectFundSources_ProjectSourceFundId",
                        column: x => x.ProjectSourceFundId,
                        principalTable: "ProjectFundSources",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Project_Funds_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Project_Funds_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Project_Funds_CreatedById",
                table: "Project_Funds",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Project_Funds_ProjectId",
                table: "Project_Funds",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Project_Funds_ProjectSourceFundId",
                table: "Project_Funds",
                column: "ProjectSourceFundId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Project_Funds");
        }
    }
}
