using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class stringtoempty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {

            //migrationBuilder.AlterColumn<double>(
            //  name: "PreSummary",
            //  table: "Trainees",
            //  type: "float",
            //  nullable: true,
            //  oldClrType: typeof(string),
            //  oldType: "nvarchar(max)",
            //  oldNullable: true);

            //migrationBuilder.AlterColumn<double>(
            //    name: "PostSummary",
            //    table: "Trainees",
            //    type: "float",
            //    nullable: true,
            //    oldClrType: typeof(string),
            //    oldType: "nvarchar(max)",
            //    oldNullable: true);

            //migrationBuilder.AlterColumn<double>(
            //    name: "PreSummary",
            //    table: "Trainees",
            //    type: "float",
            //    nullable: false,
            //    defaultValue: 0.0,
            //    oldClrType: typeof(double),
            //    oldType: "float",
            //    oldNullable: true);

            //migrationBuilder.AlterColumn<double>(
            //    name: "PostSummary",
            //    table: "Trainees",
            //    type: "float",
            //    nullable: false,
            //    defaultValue: 0.0,
            //    oldClrType: typeof(double),
            //    oldType: "float",
            //    oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.AlterColumn<double>(
            //    name: "PreSummary",
            //    table: "Trainees",
            //    type: "float",
            //    nullable: true,
            //    oldClrType: typeof(double),
            //    oldType: "float");

            //migrationBuilder.AlterColumn<double>(
            //    name: "PostSummary",
            //    table: "Trainees",
            //    type: "float",
            //    nullable: true,
            //    oldClrType: typeof(double),
            //    oldType: "float");
        }
    }
}
