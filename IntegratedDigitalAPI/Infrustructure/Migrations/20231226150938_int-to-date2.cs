using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class inttodate2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<long>(
               name: "PeriodStartAt",
               table: "Projects",
               type: "datetime2",
               nullable: false,
               oldClrType: typeof(int),
               oldType: "datetime");

            migrationBuilder.AlterColumn<long>(
                name: "PeriodEndAt",
                table: "Projects",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "datetime");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
