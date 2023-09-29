using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class EmployeePerformance : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EmployeePerformances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false),
                    PlanStatus = table.Column<int>(type: "int", nullable: false),
                    IndividualDevt = table.Column<int>(type: "int", nullable: false),
                    RequiredSupport = table.Column<int>(type: "int", nullable: false),
                    MonthIndex = table.Column<int>(type: "int", nullable: false),
                    ApproverId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ApprovedBySecondSupervisor = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePerformances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePerformances_Employees_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePerformances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePerformances_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSupervisors",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SupervisorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SecondSupervisorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSupervisors", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSupervisors_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSupervisors_Employees_SecondSupervisorId",
                        column: x => x.SecondSupervisorId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSupervisors_Employees_SupervisorId",
                        column: x => x.SupervisorId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSupervisors_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PerformancePlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalTarget = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformancePlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformancePlans_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PerformanceSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PerformanceMonth = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PerformanceIndex = table.Column<int>(type: "int", nullable: false),
                    PerformanceStartDate = table.Column<int>(type: "int", nullable: false),
                    PerformanceEndDate = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmploeeSupports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeePerformanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequiredSupport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmploeeSupports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmploeeSupports_EmployeePerformances_EmployeePerformanceId",
                        column: x => x.EmployeePerformanceId,
                        principalTable: "EmployeePerformances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmploeeSupports_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeDevelopmentPlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeePerformanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SkillGap = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SudgestedTraining = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ModeOfDelivery = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TrainingFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TrainingTo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ExpectedOutCome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDevelopmentPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDevelopmentPlans_EmployeePerformances_EmployeePerformanceId",
                        column: x => x.EmployeePerformanceId,
                        principalTable: "EmployeePerformances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeDevelopmentPlans_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PerformancePlanDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PerformancePlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Target = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformancePlanDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformancePlanDetails_PerformancePlans_PerformancePlanId",
                        column: x => x.PerformancePlanId,
                        principalTable: "PerformancePlans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PerformancePlanDetails_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeePerformancePlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeePerformanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PerformancePlanDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GivenValue = table.Column<double>(type: "float", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Timing = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePerformancePlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePerformancePlans_EmployeePerformances_EmployeePerformanceId",
                        column: x => x.EmployeePerformanceId,
                        principalTable: "EmployeePerformances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePerformancePlans_PerformancePlanDetails_PerformancePlanDetailId",
                        column: x => x.PerformancePlanDetailId,
                        principalTable: "PerformancePlanDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePerformancePlans_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmploeeSupports_CreatedById",
                table: "EmploeeSupports",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmploeeSupports_EmployeePerformanceId",
                table: "EmploeeSupports",
                column: "EmployeePerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDevelopmentPlans_CreatedById",
                table: "EmployeeDevelopmentPlans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDevelopmentPlans_EmployeePerformanceId",
                table: "EmployeeDevelopmentPlans",
                column: "EmployeePerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformancePlans_CreatedById",
                table: "EmployeePerformancePlans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformancePlans_EmployeePerformanceId",
                table: "EmployeePerformancePlans",
                column: "EmployeePerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformancePlans_PerformancePlanDetailId",
                table: "EmployeePerformancePlans",
                column: "PerformancePlanDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformances_ApproverId",
                table: "EmployeePerformances",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformances_CreatedById",
                table: "EmployeePerformances",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformances_EmployeeId",
                table: "EmployeePerformances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSupervisors_CreatedById",
                table: "EmployeeSupervisors",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSupervisors_EmployeeId",
                table: "EmployeeSupervisors",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSupervisors_SecondSupervisorId",
                table: "EmployeeSupervisors",
                column: "SecondSupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSupervisors_SupervisorId",
                table: "EmployeeSupervisors",
                column: "SupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformancePlanDetails_CreatedById",
                table: "PerformancePlanDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformancePlanDetails_PerformancePlanId",
                table: "PerformancePlanDetails",
                column: "PerformancePlanId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformancePlans_CreatedById",
                table: "PerformancePlans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceSettings_CreatedById",
                table: "PerformanceSettings",
                column: "CreatedById");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EmploeeSupports");

            migrationBuilder.DropTable(
                name: "EmployeeDevelopmentPlans");

            migrationBuilder.DropTable(
                name: "EmployeePerformancePlans");

            migrationBuilder.DropTable(
                name: "EmployeeSupervisors");

            migrationBuilder.DropTable(
                name: "PerformanceSettings");

            migrationBuilder.DropTable(
                name: "EmployeePerformances");

            migrationBuilder.DropTable(
                name: "PerformancePlanDetails");

            migrationBuilder.DropTable(
                name: "PerformancePlans");
        }
    }
}
