using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class PaymentRequisitions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PaymentRequisitions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PurposeOfRequest = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmountInWord = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BudgetReference = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PageNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CheckNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsRejected = table.Column<bool>(type: "bit", nullable: false),
                    RejectedRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RequestedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SupportedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CheckedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    AuthorizedById = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PaymentRequisitions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Employees_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Employees_AuthorizedById",
                        column: x => x.AuthorizedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Employees_CheckedById",
                        column: x => x.CheckedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Employees_RequestedById",
                        column: x => x.RequestedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Employees_SupportedById",
                        column: x => x.SupportedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PaymentRequisitions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_ApprovedById",
                table: "PaymentRequisitions",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_AuthorizedById",
                table: "PaymentRequisitions",
                column: "AuthorizedById");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_CheckedById",
                table: "PaymentRequisitions",
                column: "CheckedById");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_CreatedById",
                table: "PaymentRequisitions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_ProjectId",
                table: "PaymentRequisitions",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_RequestedById",
                table: "PaymentRequisitions",
                column: "RequestedById");

            migrationBuilder.CreateIndex(
                name: "IX_PaymentRequisitions_SupportedById",
                table: "PaymentRequisitions",
                column: "SupportedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PaymentRequisitions");
        }
    }
}
