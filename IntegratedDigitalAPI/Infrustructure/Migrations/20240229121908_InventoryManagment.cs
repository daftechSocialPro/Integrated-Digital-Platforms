using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntegratedInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class InventoryManagment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "StoreRequests",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "FinalApproverId",
                table: "StoreRequestLists",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsFinalApproved",
                table: "StoreRequestLists",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "PurchaseRequests",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "Products",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_StoreRequests_ProjectId",
                table: "StoreRequests",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_StoreRequestLists_FinalApproverId",
                table: "StoreRequestLists",
                column: "FinalApproverId");

            migrationBuilder.CreateIndex(
                name: "IX_PurchaseRequests_ProjectId",
                table: "PurchaseRequests",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProjectId",
                table: "Products",
                column: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Projects_ProjectId",
                table: "Products",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PurchaseRequests_Projects_ProjectId",
                table: "PurchaseRequests",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreRequestLists_Employees_FinalApproverId",
                table: "StoreRequestLists",
                column: "FinalApproverId",
                principalTable: "Employees",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StoreRequests_Projects_ProjectId",
                table: "StoreRequests",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Projects_ProjectId",
                table: "Products");

            migrationBuilder.DropForeignKey(
                name: "FK_PurchaseRequests_Projects_ProjectId",
                table: "PurchaseRequests");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreRequestLists_Employees_FinalApproverId",
                table: "StoreRequestLists");

            migrationBuilder.DropForeignKey(
                name: "FK_StoreRequests_Projects_ProjectId",
                table: "StoreRequests");

            migrationBuilder.DropIndex(
                name: "IX_StoreRequests_ProjectId",
                table: "StoreRequests");

            migrationBuilder.DropIndex(
                name: "IX_StoreRequestLists_FinalApproverId",
                table: "StoreRequestLists");

            migrationBuilder.DropIndex(
                name: "IX_PurchaseRequests_ProjectId",
                table: "PurchaseRequests");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProjectId",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "StoreRequests");

            migrationBuilder.DropColumn(
                name: "FinalApproverId",
                table: "StoreRequestLists");

            migrationBuilder.DropColumn(
                name: "IsFinalApproved",
                table: "StoreRequestLists");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "PurchaseRequests");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Products");
        }
    }
}
