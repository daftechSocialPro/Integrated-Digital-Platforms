using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class TagAndRecivedItem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BarCodePath",
                table: "ProductTags",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Printed",
                table: "ProductTags",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "ItemRecivalTags",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemRecivalDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ItemReceivalDetailId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ProductTagId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedById = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Rowstatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ItemRecivalTags", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ItemRecivalTags_ItemReceivalDetails_ItemReceivalDetailId",
                        column: x => x.ItemReceivalDetailId,
                        principalTable: "ItemReceivalDetails",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ItemRecivalTags_ProductTags_ProductTagId",
                        column: x => x.ProductTagId,
                        principalTable: "ProductTags",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ItemRecivalTags_Users_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "Users",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ItemRecivalTags_CreatedById",
                table: "ItemRecivalTags",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRecivalTags_ItemReceivalDetailId",
                table: "ItemRecivalTags",
                column: "ItemReceivalDetailId");

            migrationBuilder.CreateIndex(
                name: "IX_ItemRecivalTags_ProductTagId",
                table: "ItemRecivalTags",
                column: "ProductTagId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ItemRecivalTags");

            migrationBuilder.DropColumn(
                name: "BarCodePath",
                table: "ProductTags");

            migrationBuilder.DropColumn(
                name: "Printed",
                table: "ProductTags");
        }
    }
}
