using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class UsedItemsMaintain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsedItems");

            migrationBuilder.DropColumn(
                name: "RemainingItems",
                table: "ItemReceivals");

            migrationBuilder.AddColumn<string>(
                name: "Remark",
                table: "ItemRecivalTags",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "ReturnApproved",
                table: "ItemRecivalTags",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "UsedItemStatus",
                table: "ItemRecivalTags",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remark",
                table: "ItemRecivalTags");

            migrationBuilder.DropColumn(
                name: "ReturnApproved",
                table: "ItemRecivalTags");

            migrationBuilder.DropColumn(
                name: "UsedItemStatus",
                table: "ItemRecivalTags");

            migrationBuilder.AddColumn<double>(
                name: "RemainingItems",
                table: "ItemReceivals",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "UsedItems",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ItemReceivalId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Remark = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Rowstatus = table.Column<int>(type: "int", nullable: false),
                    TotalItems = table.Column<double>(type: "float", nullable: false),
                    UsedItemStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsedItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsedItems_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsedItems_CreatedById",
                table: "UsedItems",
                column: "CreatedById");
        }
    }
}
