using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class inttodate4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
    name: "PeriodStartAt",
    table: "Projects",
    type: "datetime2",
    nullable: false,
    oldClrType: typeof(int),
    oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "PeriodEndAt",
                table: "Projects",
                type: "datetime2",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
