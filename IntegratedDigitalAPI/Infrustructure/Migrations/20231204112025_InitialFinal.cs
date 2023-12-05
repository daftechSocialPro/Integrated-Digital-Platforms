using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class InitialFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "RoleCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "RoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserClaims", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserLogins", x => new { x.LoginProvider, x.ProviderKey });
                });

            migrationBuilder.CreateTable(
                name: "UserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserRoles", x => new { x.UserId, x.RoleId });
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RowStatus = table.Column<int>(type: "int", nullable: false),
                    PasswordChanged = table.Column<bool>(type: "bit", nullable: false),
                    UserType = table.Column<int>(type: "int", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RoleCategoryId = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Roles_RoleCategories_RoleCategoryId",
                        column: x => x.RoleCategoryId,
                        principalTable: "RoleCategories",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BankLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BankName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AmharicAddress = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AccountNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BankDigitNumber = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BankLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BankLists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BenefitLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Taxable = table.Column<bool>(type: "bit", nullable: false),
                    AddOnContract = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BenefitLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BenefitLists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "BudgetYears",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BudgetYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_BudgetYears_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "CompanyProfiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Logo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Address = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyProfiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyProfiles_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CountryName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CountryCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Countries_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Departments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Departments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Departments_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "DeviceSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Ip = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Port = table.Column<int>(type: "int", nullable: false),
                    Com = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DeviceSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DeviceSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EducationalFields",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalFieldName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationalFields", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationalFields_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EducationalLevels",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalLevelName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EducationalLevels", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EducationalLevels_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "GeneralCodes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GeneralCodeType = table.Column<int>(type: "int", nullable: false),
                    InitialName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Pad = table.Column<int>(type: "int", nullable: false),
                    CurrentNumber = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GeneralCodes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GeneralCodes_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Holidays",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Holidays", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Holidays_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "HrmSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    GeneralSetting = table.Column<int>(type: "int", nullable: false),
                    Value = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HrmSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HrmSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveTypes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LeaveCategory = table.Column<int>(type: "int", nullable: false),
                    MinDate = table.Column<int>(type: "int", nullable: false),
                    MaxDate = table.Column<int>(type: "int", nullable: true),
                    IncrementValue = table.Column<int>(type: "int", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveTypes_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LoanSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoanName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeOfLoan = table.Column<int>(type: "int", nullable: false),
                    NumberOfMonths = table.Column<int>(type: "int", nullable: true),
                    MaxLoanAmmount = table.Column<double>(type: "float", nullable: true),
                    PaymentYear = table.Column<int>(type: "int", nullable: true),
                    MinDeductedPercent = table.Column<double>(type: "float", nullable: true),
                    MaxDeductedPercent = table.Column<double>(type: "float", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "PerformancePlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Index = table.Column<int>(type: "int", nullable: false),
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
                name: "Positions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PositionName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Positions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectFundSources",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectFundSources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectFundSources_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectTeams",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectTeamName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTeams_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "QuarterSettings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuarterName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    QuarterOrder = table.Column<int>(type: "int", nullable: false),
                    StartMonth = table.Column<int>(type: "int", nullable: false),
                    EndMonth = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuarterSettings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuarterSettings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ReportingPeriods",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NumberOfDays = table.Column<int>(type: "int", nullable: false),
                    ReportingType = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReportingPeriods", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ReportingPeriods_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShiftLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShiftName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicShiftName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CheckIn = table.Column<TimeSpan>(type: "time", nullable: false),
                    CheckOut = table.Column<TimeSpan>(type: "time", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShiftLists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "StrategicPlans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StrategicPlans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StrategicPlans_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Trainings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NameofOrganizaton = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TypeofOrganization = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseVenue = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Project = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportStatus = table.Column<int>(type: "int", nullable: false),
                    TraineeListStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trainings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "UnitOfMeasurment",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LocalName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UnitOfMeasurment", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UnitOfMeasurment_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Regions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RegionName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CountryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Regions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Regions_Countries_CountryId",
                        column: x => x.CountryId,
                        principalTable: "Countries",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Regions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "AttendanceLogFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EnrollNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Year = table.Column<int>(type: "int", nullable: false),
                    Month = table.Column<int>(type: "int", nullable: false),
                    Day = table.Column<int>(type: "int", nullable: false),
                    Hour = table.Column<int>(type: "int", nullable: false),
                    Minute = table.Column<int>(type: "int", nullable: false),
                    Second = table.Column<int>(type: "int", nullable: false),
                    VerifyMode = table.Column<int>(type: "int", nullable: false),
                    InOutMode = table.Column<int>(type: "int", nullable: false),
                    WorkCode = table.Column<int>(type: "int", nullable: false),
                    DeviceSettingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AttendanceDate = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceLogFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AttendanceLogFiles_DeviceSettings_DeviceSettingId",
                        column: x => x.DeviceSettingId,
                        principalTable: "DeviceSettings",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveTypeDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LeaveTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    order = table.Column<int>(type: "int", nullable: false),
                    TakeFromLeaveTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveTypeDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveTypeDetails_LeaveTypes_LeaveTypeId",
                        column: x => x.LeaveTypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LeaveTypeDetails_LeaveTypes_TakeFromLeaveTypeId",
                        column: x => x.TakeFromLeaveTypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LeaveTypeDetails_Users_CreatedById",
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
                name: "VacancyLists",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VacancyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PositionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VaccancyDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EducationalLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    EmploymentType = table.Column<int>(type: "int", nullable: false),
                    VaccancyStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    VaccancyEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    GPA = table.Column<double>(type: "float", nullable: true),
                    VacancyType = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacancyLists", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacancyLists_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_EducationalFields_EducationalFieldId",
                        column: x => x.EducationalFieldId,
                        principalTable: "EducationalFields",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_EducationalLevels_EducationalLevelId",
                        column: x => x.EducationalLevelId,
                        principalTable: "EducationalLevels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyLists_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ShiftDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShiftId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    WeekDays = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BreakTime = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShiftDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShiftDetails_ShiftLists_ShiftId",
                        column: x => x.ShiftId,
                        principalTable: "ShiftLists",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ShiftDetails_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Trainees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EducationalFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trainees_EducationalFields_EducationalFieldId",
                        column: x => x.EducationalFieldId,
                        principalTable: "EducationalFields",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Trainees_EducationalLevels_EducationalLevelId",
                        column: x => x.EducationalLevelId,
                        principalTable: "EducationalLevels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Trainees_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Trainees_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TraineesPictures",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TraineesPictures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TraineesPictures_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TraineesPictures_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Trainers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsEmailSent = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trainers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Trainers_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Trainers_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TrainingReports",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Objective = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Contribution = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TraineesDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TopicsCoverd = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Challenges = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LessonsLearned = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Summary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PrePostSummary = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TrainingReports", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TrainingReports_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TrainingReports_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Zones",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ZoneName = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    RegionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Zones", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Zones_Regions_RegionId",
                        column: x => x.RegionId,
                        principalTable: "Regions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Zones_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VacancyDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocuemntName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VacancyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacancyDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacancyDocuments_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyDocuments_VacancyLists_VacancyId",
                        column: x => x.VacancyId,
                        principalTable: "VacancyLists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Applicants",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Photo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    NationalityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Woreda = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicantType = table.Column<int>(type: "int", nullable: false),
                    EmployeeCode = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Applicants", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Applicants_Countries_NationalityId",
                        column: x => x.NationalityId,
                        principalTable: "Countries",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Applicants_Zones_ZoneId",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicFirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicMiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicLastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Woreda = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaritalStatus = table.Column<int>(type: "int", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    EmploymentType = table.Column<int>(type: "int", nullable: false),
                    PaymentType = table.Column<int>(type: "int", nullable: false),
                    EmploymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContractEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TerminatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsPension = table.Column<bool>(type: "bit", nullable: false),
                    EmploymentStatus = table.Column<int>(type: "int", nullable: false),
                    PensionCode = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TinNumber = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ExistingEmployee = table.Column<bool>(type: "bit", nullable: false),
                    IdGenerated = table.Column<bool>(type: "bit", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Employees_Zones_ZoneId",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Volunters",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FirstName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    MiddleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AmharicName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Woreda = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    MaritalStatus = table.Column<int>(type: "int", nullable: false),
                    ImagePath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PaymentType = table.Column<int>(type: "int", nullable: false),
                    EmploymentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContractEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TerminatedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Salary = table.Column<double>(type: "float", nullable: false),
                    SourceOfSalary = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    BankAccountNo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Volunters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Volunters_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Volunters_Zones_ZoneId",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApplicantEducations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Institution = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GPA = table.Column<double>(type: "float", nullable: true),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicantEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicantEducations_Applicants_ApplicantId",
                        column: x => x.ApplicantId,
                        principalTable: "Applicants",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ApplicantEducations_EducationalFields_EducationalFieldId",
                        column: x => x.EducationalFieldId,
                        principalTable: "EducationalFields",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ApplicantEducations_EducationalLevels_EducationalLevelId",
                        column: x => x.EducationalLevelId,
                        principalTable: "EducationalLevels",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApplicantVacancies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ApplicantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    VacancyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicantVacancies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicantVacancies_Applicants_ApplicantId",
                        column: x => x.ApplicantId,
                        principalTable: "Applicants",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ApplicantVacancies_VacancyLists_VacancyId",
                        column: x => x.VacancyId,
                        principalTable: "VacancyLists",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApplicantWorkExperiances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicantId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Responsibility = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    File = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplicantWorkExperiances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplicantWorkExperiances_Applicants_ApplicantId",
                        column: x => x.ApplicantId,
                        principalTable: "Applicants",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeBanks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BankId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BankAccountNo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeBanks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeBanks_BankLists_BankId",
                        column: x => x.BankId,
                        principalTable: "BankLists",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeBanks_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeBanks_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeBenefits",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    BenefitId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TypeOfBenefit = table.Column<int>(type: "int", nullable: false),
                    Recursive = table.Column<bool>(type: "bit", nullable: false),
                    AllowanceEndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeBenefits", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeBenefits_BenefitLists_BenefitId",
                        column: x => x.BenefitId,
                        principalTable: "BenefitLists",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeBenefits_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeBenefits_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

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

            migrationBuilder.CreateTable(
                name: "EmployeeDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DocumentName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeDocuments_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeDocuments_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeEducations",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalLevelId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EducationalFieldId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Institution = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeEducations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeEducations_EducationalFields_EducationalFieldId",
                        column: x => x.EducationalFieldId,
                        principalTable: "EducationalFields",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeEducations_EducationalLevels_EducationalLevelId",
                        column: x => x.EducationalLevelId,
                        principalTable: "EducationalLevels",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeEducations_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeEducations_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeFamilies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Gender = table.Column<int>(type: "int", nullable: false),
                    FamilyRelation = table.Column<int>(type: "int", nullable: false),
                    BirthDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeFamilies", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeFamilies_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeFamilies_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeFiles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
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

            migrationBuilder.CreateTable(
                name: "EmployeeFingerPrints",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FingerPrintCode = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeFingerPrints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeFingerPrints_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeFingerPrints_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeLeaves",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LeaveTypeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TotalDate = table.Column<int>(type: "int", nullable: false),
                    LeaveStatus = table.Column<int>(type: "int", nullable: false),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ApproverEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    Reason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLeaves", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_Employees_ApproverEmployeeId",
                        column: x => x.ApproverEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_LeaveTypes_LeaveTypeId",
                        column: x => x.LeaveTypeId,
                        principalTable: "LeaveTypes",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLeaves_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeePenalty",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PenaltyType = table.Column<int>(type: "int", nullable: false),
                    PenaltyDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    TotNumber = table.Column<double>(type: "float", nullable: false),
                    FromSalary = table.Column<bool>(type: "bit", nullable: false),
                    Recursive = table.Column<bool>(type: "bit", nullable: false),
                    PenalityendDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeePenalty", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeePenalty_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeePenalty_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

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
                name: "EmployeeShifts",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShiftListId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeShifts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeShifts_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeShifts_ShiftLists_ShiftListId",
                        column: x => x.ShiftListId,
                        principalTable: "ShiftLists",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeShifts_Users_CreatedById",
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
                name: "EmployeeSureties",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PhotoPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SuretyAddress = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LetterPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IdCardPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompanyName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CompnayPhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSureties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSureties_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSureties_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeWorkExperiances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    OrganizationName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Responsibility = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeWorkExperiances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeWorkExperiances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeWorkExperiances_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmploymentDetails",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PositionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    Salary = table.Column<double>(type: "float", nullable: false),
                    SourceOfSalary = table.Column<int>(type: "int", nullable: false),
                    EmploymentStatus = table.Column<int>(type: "int", nullable: false),
                    IsBlackListed = table.Column<bool>(type: "bit", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmploymentDetails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmploymentDetails_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmploymentDetails_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmploymentDetails_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmploymentDetails_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeaveBalances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CurrentBalance = table.Column<int>(type: "int", nullable: false),
                    PreviousBalance = table.Column<int>(type: "int", nullable: false),
                    PreviousExpDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    TotalBalance = table.Column<int>(type: "int", nullable: false),
                    LeavesTaken = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeaveBalances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeaveBalances_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LeaveBalances_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LeavePlanSetting",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    FromDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LeavePlanSettingStatus = table.Column<int>(type: "int", nullable: false),
                    Rejectedremark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LeavePlanSetting", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LeavePlanSetting_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LeavePlanSetting_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LoanRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    RequesterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoanSettingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TotalMoneyRequest = table.Column<double>(type: "float", nullable: false),
                    DeductionRequest = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LoanRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LoanRequests_Employees_RequesterId",
                        column: x => x.RequesterId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoanRequests_LoanSettings_LoanSettingId",
                        column: x => x.LoanSettingId,
                        principalTable: "LoanSettings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_LoanRequests_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "OverTimes",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    NormalOT = table.Column<double>(type: "float", nullable: false),
                    NightOT = table.Column<double>(type: "float", nullable: false),
                    DayoffOT = table.Column<double>(type: "float", nullable: false),
                    HolidayOT = table.Column<double>(type: "float", nullable: false),
                    OverTimeDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Approved = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OverTimes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OverTimes_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_OverTimes_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DepartmentId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PeriodStartAt = table.Column<int>(type: "int", nullable: false),
                    PeriodEndAt = table.Column<int>(type: "int", nullable: false),
                    ProjectManagerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    HasTask = table.Column<bool>(type: "bit", nullable: false),
                    PlannedBudget = table.Column<float>(type: "real", nullable: false),
                    Goal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Objective = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Projects_Departments_DepartmentId",
                        column: x => x.DepartmentId,
                        principalTable: "Departments",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Employees_ProjectManagerId",
                        column: x => x.ProjectManagerId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Projects_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectTeamEmployees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectTeamId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectTeamStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTeamEmployees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTeamEmployees_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectTeamEmployees_ProjectTeams_ProjectTeamId",
                        column: x => x.ProjectTeamId,
                        principalTable: "ProjectTeams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectTeamEmployees_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ResignationRequests",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ReasonForResignation = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ResignationDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ResignationLetterPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsApproved = table.Column<bool>(type: "bit", nullable: false),
                    ApproverId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ApprovedDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsTerminated = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResignationRequests", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResignationRequests_Employees_ApproverId",
                        column: x => x.ApproverId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ResignationRequests_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ResignationRequests_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ApplcantDocuments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApplicantVacnncyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ApplcantDocuments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ApplcantDocuments_ApplicantVacancies_ApplicantVacnncyId",
                        column: x => x.ApplicantVacnncyId,
                        principalTable: "ApplicantVacancies",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "VacancyStatuses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ScheduleDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    HireDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActionTakerId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    ApplicantVacancyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Subject = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ApplicantStatus = table.Column<int>(type: "int", nullable: false),
                    IsNotificationSent = table.Column<bool>(type: "bit", nullable: false),
                    Status = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VacancyStatuses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VacancyStatuses_ApplicantVacancies_ApplicantVacancyId",
                        column: x => x.ApplicantVacancyId,
                        principalTable: "ApplicantVacancies",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_VacancyStatuses_Users_ActionTakerId",
                        column: x => x.ActionTakerId,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeAttendances",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CheckIn = table.Column<TimeSpan>(type: "time", nullable: false),
                    CheckOut = table.Column<TimeSpan>(type: "time", nullable: false),
                    AttendanceDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    AttencanceType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TotalTime = table.Column<TimeSpan>(type: "time", nullable: false),
                    FingerPrintId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TakeFromVacation = table.Column<bool>(type: "bit", nullable: false),
                    AbsentReason = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeAttendances", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeAttendances_EmployeeFingerPrints_FingerPrintId",
                        column: x => x.FingerPrintId,
                        principalTable: "EmployeeFingerPrints",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeAttendances_Users_CreatedById",
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

            migrationBuilder.CreateTable(
                name: "EmployeeSalaries",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmploymentDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSalaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSalaries_EmploymentDetails_EmploymentDetailId",
                        column: x => x.EmploymentDetailId,
                        principalTable: "EmploymentDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSalaries_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeLoans",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LoanRequestId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ApprovedAmmount = table.Column<double>(type: "float", nullable: false),
                    ApprovedById = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SecondApproverId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PaymentStartDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaymentEndDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LoanStatus = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeLoans", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_Employees_ApprovedById",
                        column: x => x.ApprovedById,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_Employees_SecondApproverId",
                        column: x => x.SecondApproverId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_LoanRequests_LoanRequestId",
                        column: x => x.LoanRequestId,
                        principalTable: "LoanRequests",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeLoans_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

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

            migrationBuilder.CreateTable(
                name: "Tasks",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProjectId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TaskDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShouldStartPeriod = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActuallStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ShouldEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanedBudget = table.Column<float>(type: "real", nullable: false),
                    ActualBudget = table.Column<float>(type: "real", nullable: true),
                    Goal = table.Column<float>(type: "real", nullable: true),
                    Weight = table.Column<float>(type: "real", nullable: true),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    HasActivityParent = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tasks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tasks_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeeSettlements",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeLoanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    PaidMoney = table.Column<double>(type: "float", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeeSettlements", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeeSettlements_EmployeeLoans_EmployeeLoanId",
                        column: x => x.EmployeeLoanId,
                        principalTable: "EmployeeLoans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeeSettlements_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivitiesParents",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShouldStartPeriod = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActuallStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ShouldEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    PlanedBudget = table.Column<float>(type: "real", nullable: false),
                    ActualBudget = table.Column<float>(type: "real", nullable: true),
                    Goal = table.Column<float>(type: "real", nullable: true),
                    Weight = table.Column<float>(type: "real", nullable: true),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    HasActivity = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivitiesParents", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivitiesParents_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivitiesParents_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityDescription = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ActivityNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ShouldStat = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ShouldEnd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlanedBudget = table.Column<float>(type: "real", nullable: false),
                    ActualStart = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualEnd = table.Column<DateTime>(type: "datetime2", nullable: true),
                    ActualBudget = table.Column<float>(type: "real", nullable: true),
                    Status = table.Column<int>(type: "int", nullable: false),
                    ProjectTeamId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    UnitOfMeasurementId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Weight = table.Column<float>(type: "real", nullable: false),
                    Goal = table.Column<float>(type: "real", nullable: false),
                    Begining = table.Column<float>(type: "real", nullable: false),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    ActivityType = table.Column<int>(type: "int", nullable: false),
                    OfficeWork = table.Column<float>(type: "real", nullable: false),
                    FieldWork = table.Column<float>(type: "real", nullable: false),
                    targetDivision = table.Column<int>(type: "int", nullable: true),
                    PostToCase = table.Column<bool>(type: "bit", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    StrategicPlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ZoneId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Woreda = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Latitude = table.Column<double>(type: "float", nullable: false),
                    Longtude = table.Column<double>(type: "float", nullable: false),
                    IsTraining = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Activities_ActivitiesParents_ActivityParentId",
                        column: x => x.ActivityParentId,
                        principalTable: "ActivitiesParents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_ProjectTeams_ProjectTeamId",
                        column: x => x.ProjectTeamId,
                        principalTable: "ProjectTeams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Projects_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_StrategicPlans_StrategicPlanId",
                        column: x => x.StrategicPlanId,
                        principalTable: "StrategicPlans",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_UnitOfMeasurment_UnitOfMeasurementId",
                        column: x => x.UnitOfMeasurementId,
                        principalTable: "UnitOfMeasurment",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Activities_Zones_ZoneId",
                        column: x => x.ZoneId,
                        principalTable: "Zones",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaskMembers",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMembers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskMembers_ActivitiesParents_ActivityParentId",
                        column: x => x.ActivityParentId,
                        principalTable: "ActivitiesParents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMembers_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMembers_Projects_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMembers_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMembers_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaskMemos",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    PlanId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ActivityParentId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMemos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskMemos_ActivitiesParents_ActivityParentId",
                        column: x => x.ActivityParentId,
                        principalTable: "ActivitiesParents",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemos_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemos_Projects_PlanId",
                        column: x => x.PlanId,
                        principalTable: "Projects",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemos_Tasks_TaskId",
                        column: x => x.TaskId,
                        principalTable: "Tasks",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemos_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityTargetDivisions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Target = table.Column<float>(type: "real", nullable: false),
                    TargetBudget = table.Column<float>(type: "real", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTargetDivisions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTargetDivisions_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTargetDivisions_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityTerminationHistories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FromEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ToEmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    ToProjectTeamId = table.Column<Guid>(type: "uniqueidentifier", nullable: true),
                    TopProjectTeamId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TerminationReason = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ApprovedByDirectorId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Isapproved = table.Column<bool>(type: "bit", nullable: false),
                    IsRejected = table.Column<bool>(type: "bit", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTerminationHistories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Employees_ApprovedByDirectorId",
                        column: x => x.ApprovedByDirectorId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Employees_FromEmployeeId",
                        column: x => x.FromEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Employees_ToEmployeeId",
                        column: x => x.ToEmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_ProjectTeams_TopProjectTeamId",
                        column: x => x.TopProjectTeamId,
                        principalTable: "ProjectTeams",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTerminationHistories_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityTrainings",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TrainingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityTrainings", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityTrainings_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTrainings_Trainings_TrainingId",
                        column: x => x.TrainingId,
                        principalTable: "Trainings",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityTrainings_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "EmployeesAssignedForActivities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmployeesAssignedForActivities", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmployeesAssignedForActivities_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeesAssignedForActivities_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_EmployeesAssignedForActivities_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaskMemoReply",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    TaskMemoId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    EmployeeId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskMemoReply", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskMemoReply_Employees_EmployeeId",
                        column: x => x.EmployeeId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemoReply_TaskMemos_TaskMemoId",
                        column: x => x.TaskMemoId,
                        principalTable: "TaskMemos",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskMemoReply_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ActivityProgresses",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActualBudget = table.Column<float>(type: "real", nullable: false),
                    ActualWorked = table.Column<float>(type: "real", nullable: false),
                    EmployeeValueId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    QuarterId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FinanceDocumentPath = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsApprovedByManager = table.Column<int>(type: "int", nullable: false),
                    IsApprovedByFinance = table.Column<int>(type: "int", nullable: false),
                    IsApprovedByDirector = table.Column<int>(type: "int", nullable: false),
                    FinanceApprovalRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoordinatorApprovalRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DirectorApprovalRemark = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Lat = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Lng = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDraft = table.Column<bool>(type: "bit", nullable: false),
                    progressStatus = table.Column<int>(type: "int", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityProgresses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_ActivityTargetDivisions_QuarterId",
                        column: x => x.QuarterId,
                        principalTable: "ActivityTargetDivisions",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_Employees_EmployeeValueId",
                        column: x => x.EmployeeValueId,
                        principalTable: "Employees",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ActivityProgresses_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProgressAttachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ActivityProgressId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgressAttachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgressAttachments_ActivityProgresses_ActivityProgressId",
                        column: x => x.ActivityProgressId,
                        principalTable: "ActivityProgresses",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProgressAttachments_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ActivityParentId",
                table: "Activities",
                column: "ActivityParentId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_CreatedById",
                table: "Activities",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_EmployeeId",
                table: "Activities",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_PlanId",
                table: "Activities",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ProjectTeamId",
                table: "Activities",
                column: "ProjectTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_StrategicPlanId",
                table: "Activities",
                column: "StrategicPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_TaskId",
                table: "Activities",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_UnitOfMeasurementId",
                table: "Activities",
                column: "UnitOfMeasurementId");

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ZoneId",
                table: "Activities",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivitiesParents_CreatedById",
                table: "ActivitiesParents",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivitiesParents_TaskId",
                table: "ActivitiesParents",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_ActivityId",
                table: "ActivityProgresses",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_CreatedById",
                table: "ActivityProgresses",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_EmployeeValueId",
                table: "ActivityProgresses",
                column: "EmployeeValueId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityProgresses_QuarterId",
                table: "ActivityProgresses",
                column: "QuarterId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTargetDivisions_ActivityId",
                table: "ActivityTargetDivisions",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTargetDivisions_CreatedById",
                table: "ActivityTargetDivisions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ActivityId",
                table: "ActivityTerminationHistories",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ApprovedByDirectorId",
                table: "ActivityTerminationHistories",
                column: "ApprovedByDirectorId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_CreatedById",
                table: "ActivityTerminationHistories",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_FromEmployeeId",
                table: "ActivityTerminationHistories",
                column: "FromEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_ToEmployeeId",
                table: "ActivityTerminationHistories",
                column: "ToEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTerminationHistories_TopProjectTeamId",
                table: "ActivityTerminationHistories",
                column: "TopProjectTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrainings_ActivityId",
                table: "ActivityTrainings",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrainings_CreatedById",
                table: "ActivityTrainings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityTrainings_TrainingId",
                table: "ActivityTrainings",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplcantDocuments_ApplicantVacnncyId",
                table: "ApplcantDocuments",
                column: "ApplicantVacnncyId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantEducations_ApplicantId",
                table: "ApplicantEducations",
                column: "ApplicantId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantEducations_EducationalFieldId",
                table: "ApplicantEducations",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantEducations_EducationalLevelId",
                table: "ApplicantEducations",
                column: "EducationalLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_Email",
                table: "Applicants",
                column: "Email",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_NationalityId",
                table: "Applicants",
                column: "NationalityId");

            migrationBuilder.CreateIndex(
                name: "IX_Applicants_ZoneId",
                table: "Applicants",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantVacancies_ApplicantId",
                table: "ApplicantVacancies",
                column: "ApplicantId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantVacancies_VacancyId",
                table: "ApplicantVacancies",
                column: "VacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_ApplicantWorkExperiances_ApplicantId",
                table: "ApplicantWorkExperiances",
                column: "ApplicantId");

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceLogFiles_DeviceSettingId",
                table: "AttendanceLogFiles",
                column: "DeviceSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_BankLists_BankName",
                table: "BankLists",
                column: "BankName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BankLists_CreatedById",
                table: "BankLists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitLists_CreatedById",
                table: "BenefitLists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_BenefitLists_Name",
                table: "BenefitLists",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_BudgetYears_CreatedById",
                table: "BudgetYears",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyProfiles_CreatedById",
                table: "CompanyProfiles",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Countries_CountryName",
                table: "Countries",
                column: "CountryName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Countries_CreatedById",
                table: "Countries",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_CreatedById",
                table: "Departments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Departments_DepartmentName",
                table: "Departments",
                column: "DepartmentName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DeviceSettings_CreatedById",
                table: "DeviceSettings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EducationalFields_CreatedById",
                table: "EducationalFields",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EducationalFields_EducationalFieldName",
                table: "EducationalFields",
                column: "EducationalFieldName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EducationalLevels_CreatedById",
                table: "EducationalLevels",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EducationalLevels_EducationalLevelName",
                table: "EducationalLevels",
                column: "EducationalLevelName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmploeeSupports_CreatedById",
                table: "EmploeeSupports",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmploeeSupports_EmployeePerformanceId",
                table: "EmploeeSupports",
                column: "EmployeePerformanceId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAttendances_CreatedById",
                table: "EmployeeAttendances",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeAttendances_FingerPrintId",
                table: "EmployeeAttendances",
                column: "FingerPrintId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBanks_BankId",
                table: "EmployeeBanks",
                column: "BankId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBanks_CreatedById",
                table: "EmployeeBanks",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBanks_EmployeeId",
                table: "EmployeeBanks",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBenefits_BenefitId_EmployeeId",
                table: "EmployeeBenefits",
                columns: new[] { "BenefitId", "EmployeeId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBenefits_CreatedById",
                table: "EmployeeBenefits",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeBenefits_EmployeeId",
                table: "EmployeeBenefits",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDevelopmentPlans_CreatedById",
                table: "EmployeeDevelopmentPlans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDevelopmentPlans_EmployeePerformanceId",
                table: "EmployeeDevelopmentPlans",
                column: "EmployeePerformanceId");

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

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_CreatedById",
                table: "EmployeeDocuments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeDocuments_EmployeeId",
                table: "EmployeeDocuments",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducations_CreatedById",
                table: "EmployeeEducations",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducations_EducationalFieldId",
                table: "EmployeeEducations",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducations_EducationalLevelId",
                table: "EmployeeEducations",
                column: "EducationalLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeEducations_EmployeeId",
                table: "EmployeeEducations",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFamilies_CreatedById",
                table: "EmployeeFamilies",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFamilies_EmployeeId",
                table: "EmployeeFamilies",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFiles_CreatedById",
                table: "EmployeeFiles",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFiles_EmployeeId",
                table: "EmployeeFiles",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFingerPrints_CreatedById",
                table: "EmployeeFingerPrints",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeFingerPrints_EmployeeId",
                table: "EmployeeFingerPrints",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_ApproverEmployeeId",
                table: "EmployeeLeaves",
                column: "ApproverEmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_CreatedById",
                table: "EmployeeLeaves",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_EmployeeId",
                table: "EmployeeLeaves",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLeaves_LeaveTypeId",
                table: "EmployeeLeaves",
                column: "LeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_ApprovedById",
                table: "EmployeeLoans",
                column: "ApprovedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_CreatedById",
                table: "EmployeeLoans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_LoanRequestId",
                table: "EmployeeLoans",
                column: "LoanRequestId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeLoans_SecondApproverId",
                table: "EmployeeLoans",
                column: "SecondApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePenalty_CreatedById",
                table: "EmployeePenalty",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeePenalty_EmployeeId",
                table: "EmployeePenalty",
                column: "EmployeeId");

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
                name: "IX_Employees_CreatedById",
                table: "Employees",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_ZoneId",
                table: "Employees",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_CreatedById",
                table: "EmployeeSalaries",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSalaries_EmploymentDetailId",
                table: "EmployeeSalaries",
                column: "EmploymentDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesAssignedForActivities_ActivityId",
                table: "EmployeesAssignedForActivities",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesAssignedForActivities_CreatedById",
                table: "EmployeesAssignedForActivities",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeesAssignedForActivities_EmployeeId",
                table: "EmployeesAssignedForActivities",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSettlements_CreatedById",
                table: "EmployeeSettlements",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSettlements_EmployeeLoanId",
                table: "EmployeeSettlements",
                column: "EmployeeLoanId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeShifts_CreatedById",
                table: "EmployeeShifts",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeShifts_EmployeeId",
                table: "EmployeeShifts",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeShifts_ShiftListId",
                table: "EmployeeShifts",
                column: "ShiftListId");

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
                name: "IX_EmployeeSureties_CreatedById",
                table: "EmployeeSureties",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeSureties_EmployeeId",
                table: "EmployeeSureties",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkExperiances_CreatedById",
                table: "EmployeeWorkExperiances",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmployeeWorkExperiances_EmployeeId",
                table: "EmployeeWorkExperiances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmploymentDetails_CreatedById",
                table: "EmploymentDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_EmploymentDetails_DepartmentId",
                table: "EmploymentDetails",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_EmploymentDetails_EmployeeId",
                table: "EmploymentDetails",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_EmploymentDetails_PositionId",
                table: "EmploymentDetails",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralCodes_CreatedById",
                table: "GeneralCodes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_GeneralCodes_GeneralCodeType",
                table: "GeneralCodes",
                column: "GeneralCodeType",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Holidays_CreatedById",
                table: "Holidays",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_HrmSettings_CreatedById",
                table: "HrmSettings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalances_CreatedById",
                table: "LeaveBalances",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveBalances_EmployeeId",
                table: "LeaveBalances",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeavePlanSetting_CreatedById",
                table: "LeavePlanSetting",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LeavePlanSetting_EmployeeId",
                table: "LeavePlanSetting",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTypeDetails_CreatedById",
                table: "LeaveTypeDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTypeDetails_LeaveTypeId",
                table: "LeaveTypeDetails",
                column: "LeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTypeDetails_TakeFromLeaveTypeId",
                table: "LeaveTypeDetails",
                column: "TakeFromLeaveTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTypes_CreatedById",
                table: "LeaveTypes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LeaveTypes_Name",
                table: "LeaveTypes",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequests_CreatedById",
                table: "LoanRequests",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequests_LoanSettingId",
                table: "LoanRequests",
                column: "LoanSettingId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanRequests_RequesterId",
                table: "LoanRequests",
                column: "RequesterId");

            migrationBuilder.CreateIndex(
                name: "IX_LoanSettings_CreatedById",
                table: "LoanSettings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_OverTimes_CreatedById",
                table: "OverTimes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_OverTimes_EmployeeId",
                table: "OverTimes",
                column: "EmployeeId");

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

            migrationBuilder.CreateIndex(
                name: "IX_Positions_CreatedById",
                table: "Positions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_PositionName",
                table: "Positions",
                column: "PositionName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProgressAttachments_ActivityProgressId",
                table: "ProgressAttachments",
                column: "ActivityProgressId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgressAttachments_CreatedById",
                table: "ProgressAttachments",
                column: "CreatedById");

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

            migrationBuilder.CreateIndex(
                name: "IX_ProjectFundSources_CreatedById",
                table: "ProjectFundSources",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_CreatedById",
                table: "Projects",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_DepartmentId",
                table: "Projects",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_ProjectManagerId",
                table: "Projects",
                column: "ProjectManagerId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeamEmployees_CreatedById",
                table: "ProjectTeamEmployees",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeamEmployees_EmployeeId",
                table: "ProjectTeamEmployees",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeamEmployees_ProjectTeamId",
                table: "ProjectTeamEmployees",
                column: "ProjectTeamId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTeams_CreatedById",
                table: "ProjectTeams",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_QuarterSettings_CreatedById",
                table: "QuarterSettings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Regions_CountryId",
                table: "Regions",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Regions_CreatedById",
                table: "Regions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Regions_RegionName",
                table: "Regions",
                column: "RegionName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReportingPeriods_CreatedById",
                table: "ReportingPeriods",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ResignationRequests_ApproverId",
                table: "ResignationRequests",
                column: "ApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_ResignationRequests_CreatedById",
                table: "ResignationRequests",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ResignationRequests_EmployeeId",
                table: "ResignationRequests",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Roles_RoleCategoryId",
                table: "Roles",
                column: "RoleCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftDetails_CreatedById",
                table: "ShiftDetails",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftDetails_ShiftId",
                table: "ShiftDetails",
                column: "ShiftId");

            migrationBuilder.CreateIndex(
                name: "IX_ShiftLists_CreatedById",
                table: "ShiftLists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_StrategicPlans_CreatedById",
                table: "StrategicPlans",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_ActivityParentId",
                table: "TaskMembers",
                column: "ActivityParentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_CreatedById",
                table: "TaskMembers",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_EmployeeId",
                table: "TaskMembers",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_PlanId",
                table: "TaskMembers",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMembers_TaskId",
                table: "TaskMembers",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemoReply_CreatedById",
                table: "TaskMemoReply",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemoReply_EmployeeId",
                table: "TaskMemoReply",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemoReply_TaskMemoId",
                table: "TaskMemoReply",
                column: "TaskMemoId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_ActivityParentId",
                table: "TaskMemos",
                column: "ActivityParentId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_CreatedById",
                table: "TaskMemos",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_EmployeeId",
                table: "TaskMemos",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_PlanId",
                table: "TaskMemos",
                column: "PlanId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskMemos_TaskId",
                table: "TaskMemos",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_CreatedById",
                table: "Tasks",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Tasks_ProjectId",
                table: "Tasks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_CreatedById",
                table: "Trainees",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_EducationalFieldId",
                table: "Trainees",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_EducationalLevelId",
                table: "Trainees",
                column: "EducationalLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainees_TrainingId",
                table: "Trainees",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_TraineesPictures_CreatedById",
                table: "TraineesPictures",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_TraineesPictures_TrainingId",
                table: "TraineesPictures",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainers_CreatedById",
                table: "Trainers",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Trainers_TrainingId",
                table: "Trainers",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingReports_CreatedById",
                table: "TrainingReports",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_TrainingReports_TrainingId",
                table: "TrainingReports",
                column: "TrainingId");

            migrationBuilder.CreateIndex(
                name: "IX_Trainings_CreatedById",
                table: "Trainings",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_UnitOfMeasurment_CreatedById",
                table: "UnitOfMeasurment",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyDocuments_CreatedById",
                table: "VacancyDocuments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyDocuments_VacancyId",
                table: "VacancyDocuments",
                column: "VacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_CreatedById",
                table: "VacancyLists",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_DepartmentId",
                table: "VacancyLists",
                column: "DepartmentId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_EducationalFieldId",
                table: "VacancyLists",
                column: "EducationalFieldId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_EducationalLevelId",
                table: "VacancyLists",
                column: "EducationalLevelId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyLists_PositionId",
                table: "VacancyLists",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyStatuses_ActionTakerId",
                table: "VacancyStatuses",
                column: "ActionTakerId");

            migrationBuilder.CreateIndex(
                name: "IX_VacancyStatuses_ApplicantVacancyId",
                table: "VacancyStatuses",
                column: "ApplicantVacancyId");

            migrationBuilder.CreateIndex(
                name: "IX_Volunters_CreatedById",
                table: "Volunters",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Volunters_ZoneId",
                table: "Volunters",
                column: "ZoneId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_CreatedById",
                table: "Zones",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_RegionId",
                table: "Zones",
                column: "RegionId");

            migrationBuilder.CreateIndex(
                name: "IX_Zones_ZoneName",
                table: "Zones",
                column: "ZoneName",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActivityTerminationHistories");

            migrationBuilder.DropTable(
                name: "ActivityTrainings");

            migrationBuilder.DropTable(
                name: "ApplcantDocuments");

            migrationBuilder.DropTable(
                name: "ApplicantEducations");

            migrationBuilder.DropTable(
                name: "ApplicantWorkExperiances");

            migrationBuilder.DropTable(
                name: "AttendanceLogFiles");

            migrationBuilder.DropTable(
                name: "BudgetYears");

            migrationBuilder.DropTable(
                name: "CompanyProfiles");

            migrationBuilder.DropTable(
                name: "EmploeeSupports");

            migrationBuilder.DropTable(
                name: "EmployeeAttendances");

            migrationBuilder.DropTable(
                name: "EmployeeBanks");

            migrationBuilder.DropTable(
                name: "EmployeeBenefits");

            migrationBuilder.DropTable(
                name: "EmployeeDevelopmentPlans");

            migrationBuilder.DropTable(
                name: "EmployeeDisciplinaryCases");

            migrationBuilder.DropTable(
                name: "EmployeeDocuments");

            migrationBuilder.DropTable(
                name: "EmployeeEducations");

            migrationBuilder.DropTable(
                name: "EmployeeFamilies");

            migrationBuilder.DropTable(
                name: "EmployeeFiles");

            migrationBuilder.DropTable(
                name: "EmployeeLeaves");

            migrationBuilder.DropTable(
                name: "EmployeePenalty");

            migrationBuilder.DropTable(
                name: "EmployeePerformancePlans");

            migrationBuilder.DropTable(
                name: "EmployeeSalaries");

            migrationBuilder.DropTable(
                name: "EmployeesAssignedForActivities");

            migrationBuilder.DropTable(
                name: "EmployeeSettlements");

            migrationBuilder.DropTable(
                name: "EmployeeShifts");

            migrationBuilder.DropTable(
                name: "EmployeeSupervisors");

            migrationBuilder.DropTable(
                name: "EmployeeSureties");

            migrationBuilder.DropTable(
                name: "EmployeeWorkExperiances");

            migrationBuilder.DropTable(
                name: "GeneralCodes");

            migrationBuilder.DropTable(
                name: "Holidays");

            migrationBuilder.DropTable(
                name: "HrmSettings");

            migrationBuilder.DropTable(
                name: "LeaveBalances");

            migrationBuilder.DropTable(
                name: "LeavePlanSetting");

            migrationBuilder.DropTable(
                name: "LeaveTypeDetails");

            migrationBuilder.DropTable(
                name: "OverTimes");

            migrationBuilder.DropTable(
                name: "PerformanceSettings");

            migrationBuilder.DropTable(
                name: "ProgressAttachments");

            migrationBuilder.DropTable(
                name: "Project_Funds");

            migrationBuilder.DropTable(
                name: "ProjectTeamEmployees");

            migrationBuilder.DropTable(
                name: "QuarterSettings");

            migrationBuilder.DropTable(
                name: "ReportingPeriods");

            migrationBuilder.DropTable(
                name: "ResignationRequests");

            migrationBuilder.DropTable(
                name: "RoleClaims");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "ShiftDetails");

            migrationBuilder.DropTable(
                name: "TaskMembers");

            migrationBuilder.DropTable(
                name: "TaskMemoReply");

            migrationBuilder.DropTable(
                name: "Trainees");

            migrationBuilder.DropTable(
                name: "TraineesPictures");

            migrationBuilder.DropTable(
                name: "Trainers");

            migrationBuilder.DropTable(
                name: "TrainingReports");

            migrationBuilder.DropTable(
                name: "UserClaims");

            migrationBuilder.DropTable(
                name: "UserLogins");

            migrationBuilder.DropTable(
                name: "UserRoles");

            migrationBuilder.DropTable(
                name: "UserTokens");

            migrationBuilder.DropTable(
                name: "VacancyDocuments");

            migrationBuilder.DropTable(
                name: "VacancyStatuses");

            migrationBuilder.DropTable(
                name: "Volunters");

            migrationBuilder.DropTable(
                name: "DeviceSettings");

            migrationBuilder.DropTable(
                name: "EmployeeFingerPrints");

            migrationBuilder.DropTable(
                name: "BankLists");

            migrationBuilder.DropTable(
                name: "BenefitLists");

            migrationBuilder.DropTable(
                name: "EmployeePerformances");

            migrationBuilder.DropTable(
                name: "PerformancePlanDetails");

            migrationBuilder.DropTable(
                name: "EmploymentDetails");

            migrationBuilder.DropTable(
                name: "EmployeeLoans");

            migrationBuilder.DropTable(
                name: "LeaveTypes");

            migrationBuilder.DropTable(
                name: "ActivityProgresses");

            migrationBuilder.DropTable(
                name: "ProjectFundSources");

            migrationBuilder.DropTable(
                name: "RoleCategories");

            migrationBuilder.DropTable(
                name: "ShiftLists");

            migrationBuilder.DropTable(
                name: "TaskMemos");

            migrationBuilder.DropTable(
                name: "Trainings");

            migrationBuilder.DropTable(
                name: "ApplicantVacancies");

            migrationBuilder.DropTable(
                name: "PerformancePlans");

            migrationBuilder.DropTable(
                name: "LoanRequests");

            migrationBuilder.DropTable(
                name: "ActivityTargetDivisions");

            migrationBuilder.DropTable(
                name: "Applicants");

            migrationBuilder.DropTable(
                name: "VacancyLists");

            migrationBuilder.DropTable(
                name: "LoanSettings");

            migrationBuilder.DropTable(
                name: "Activities");

            migrationBuilder.DropTable(
                name: "EducationalFields");

            migrationBuilder.DropTable(
                name: "EducationalLevels");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "ActivitiesParents");

            migrationBuilder.DropTable(
                name: "ProjectTeams");

            migrationBuilder.DropTable(
                name: "StrategicPlans");

            migrationBuilder.DropTable(
                name: "UnitOfMeasurment");

            migrationBuilder.DropTable(
                name: "Tasks");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Departments");

            migrationBuilder.DropTable(
                name: "Employees");

            migrationBuilder.DropTable(
                name: "Zones");

            migrationBuilder.DropTable(
                name: "Regions");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
