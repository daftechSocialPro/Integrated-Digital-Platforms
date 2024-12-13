using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class PerformanceInitial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePerformances_Employees_ApproverId",
                table: "EmployeePerformances");

            migrationBuilder.DropTable(
                name: "EmploeeSupports");

            migrationBuilder.DropTable(
                name: "EmployeePerformancePlans");

            migrationBuilder.DropTable(
                name: "PerformancePlanDetails");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "PerformancePlans");

            migrationBuilder.DropColumn(
                name: "TotalTarget",
                table: "PerformancePlans");

            migrationBuilder.DropColumn(
                name: "ApprovedBySecondSupervisor",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "Index",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "IndividualDevt",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "PlanStatus",
                table: "EmployeePerformances");

            migrationBuilder.RenameColumn(
                name: "RequiredSupport",
                table: "EmployeePerformances",
                newName: "TypeOfPerformance");

            migrationBuilder.RenameColumn(
                name: "ApproverId",
                table: "EmployeePerformances",
                newName: "SupervisorId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePerformances_ApproverId",
                table: "EmployeePerformances",
                newName: "IX_EmployeePerformances_SupervisorId");

            migrationBuilder.AddColumn<bool>(
                name: "IsManagerial",
                table: "Positions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "PositionId",
                table: "PerformancePlans",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("62576669-7aa0-4b27-85a6-42175de3c902"));

            migrationBuilder.AddColumn<int>(
                name: "TypeOfPerformance",
                table: "PerformancePlans",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "DiscussionDate",
                table: "EmployeePerformances",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Justification",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "PerformanceSettingId",
                table: "EmployeePerformances",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<Guid>(
                name: "SecondSuperviosrId",
                table: "EmployeePerformances",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SecondSupervisorComments",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "SecondSupervisorId",
                table: "EmployeePerformances",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "SelfGeneralComments",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelfNeedImporvementComment",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "SelfRating",
                table: "EmployeePerformances",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "SelfStrengthComment",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SelfSuddgestionImporvementComment",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupervisorGeneralComments",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupervisorNeedImporvementComment",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<double>(
                name: "SupervisorRating",
                table: "EmployeePerformances",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<string>(
                name: "SupervisorStrengthComment",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupervisorSuddgestionImporvementComment",
                table: "EmployeePerformances",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmployeePerformanceDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeePerformanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeRating = table.Column<int>(type: "int", nullable: false),
                    SupervisorRating = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePerformanceDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePerformanceDetails_EmployeePerformances_EmployeePerformanceId",
                        column: x => x.EmployeePerformanceId,
                        principalTable: "EmployeePerformances",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePerformanceDetails_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "onFieldEmployeeLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FieldDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ReturnDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_onFieldEmployeeLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_onFieldEmployeeLists_Employees_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_onFieldEmployeeLists_Employees_EmployeeListId",
                        column: x => x.EmployeeListId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_onFieldEmployeeLists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PerformanceScales",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Rate = table.Column<int>(type: "int", nullable: false),
                    Definition = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Examples = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PerformanceScales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PerformanceScales_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PerformancePlans_PositionId",
                table: "PerformancePlans",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformances_PerformanceSettingId",
                table: "EmployeePerformances",
                column: "PerformanceSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformances_SecondSupervisorId",
                table: "EmployeePerformances",
                column: "SecondSupervisorId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformanceDetails_CreatedById",
                table: "EmployeePerformanceDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePerformanceDetails_EmployeePerformanceId",
                table: "EmployeePerformanceDetails",
                column: "EmployeePerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_onFieldEmployeeLists_ApprovedById",
                table: "onFieldEmployeeLists",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_onFieldEmployeeLists_CreatedById",
                table: "onFieldEmployeeLists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_onFieldEmployeeLists_EmployeeListId",
                table: "onFieldEmployeeLists",
                column: "EmployeeListId");

            migrationBuilder.CreateIndex(
                name: "IX_PerformanceScales_CreatedById",
                table: "PerformanceScales",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePerformances_Employees_SecondSupervisorId",
                table: "EmployeePerformances",
                column: "SecondSupervisorId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePerformances_Employees_SupervisorId",
                table: "EmployeePerformances",
                column: "SupervisorId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePerformances_PerformanceSettings_PerformanceSettingId",
                table: "EmployeePerformances",
                column: "PerformanceSettingId",
                principalTable: "PerformanceSettings",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PerformancePlans_Positions_PositionId",
                table: "PerformancePlans",
                column: "PositionId",
                principalTable: "Positions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePerformances_Employees_SecondSupervisorId",
                table: "EmployeePerformances");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePerformances_Employees_SupervisorId",
                table: "EmployeePerformances");

            migrationBuilder.DropForeignKey(
                name: "FK_EmployeePerformances_PerformanceSettings_PerformanceSettingId",
                table: "EmployeePerformances");

            migrationBuilder.DropForeignKey(
                name: "FK_PerformancePlans_Positions_PositionId",
                table: "PerformancePlans");

            migrationBuilder.DropTable(
                name: "EmployeePerformanceDetails");

            migrationBuilder.DropTable(
                name: "onFieldEmployeeLists");

            migrationBuilder.DropTable(
                name: "PerformanceScales");

            migrationBuilder.DropIndex(
                name: "IX_PerformancePlans_PositionId",
                table: "PerformancePlans");

            migrationBuilder.DropIndex(
                name: "IX_EmployeePerformances_PerformanceSettingId",
                table: "EmployeePerformances");

            migrationBuilder.DropIndex(
                name: "IX_EmployeePerformances_SecondSupervisorId",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "IsManagerial",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "PositionId",
                table: "PerformancePlans");

            migrationBuilder.DropColumn(
                name: "TypeOfPerformance",
                table: "PerformancePlans");

            migrationBuilder.DropColumn(
                name: "DiscussionDate",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "Justification",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "PerformanceSettingId",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SecondSuperviosrId",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SecondSupervisorComments",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SecondSupervisorId",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SelfGeneralComments",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SelfNeedImporvementComment",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SelfRating",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SelfStrengthComment",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SelfSuddgestionImporvementComment",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SupervisorGeneralComments",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SupervisorNeedImporvementComment",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SupervisorRating",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SupervisorStrengthComment",
                table: "EmployeePerformances");

            migrationBuilder.DropColumn(
                name: "SupervisorSuddgestionImporvementComment",
                table: "EmployeePerformances");

            migrationBuilder.RenameColumn(
                name: "TypeOfPerformance",
                table: "EmployeePerformances",
                newName: "RequiredSupport");

            migrationBuilder.RenameColumn(
                name: "SupervisorId",
                table: "EmployeePerformances",
                newName: "ApproverId");

            migrationBuilder.RenameIndex(
                name: "IX_EmployeePerformances_SupervisorId",
                table: "EmployeePerformances",
                newName: "IX_EmployeePerformances_ApproverId");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PerformancePlans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<double>(
                name: "TotalTarget",
                table: "PerformancePlans",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<bool>(
                name: "ApprovedBySecondSupervisor",
                table: "EmployeePerformances",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "Index",
                table: "EmployeePerformances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IndividualDevt",
                table: "EmployeePerformances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PlanStatus",
                table: "EmployeePerformances",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "EmploeeSupports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    EmployeePerformanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    RequiredSupport = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "PerformancePlanDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    PerformancePlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rowstatus = table.Column<int>(type: "int", nullable: false),
                    Target = table.Column<double>(type: "float", nullable: false)
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
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    EmployeePerformanceId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PerformancePlanDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    GivenValue = table.Column<double>(type: "float", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false),
                    Timing = table.Column<string>(type: "nvarchar(max)", nullable: true)
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
                name: "IX_PerformancePlanDetails_CreatedById",
                table: "PerformancePlanDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_PerformancePlanDetails_PerformancePlanId",
                table: "PerformancePlanDetails",
                column: "PerformancePlanId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmployeePerformances_Employees_ApproverId",
                table: "EmployeePerformances",
                column: "ApproverId",
                principalTable: "Employees",
                principalColumn: "Id");
        }
    }
}
