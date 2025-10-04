using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MembershipInfrustructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPerformanceIndexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Index for RegionId filtering
            migrationBuilder.CreateIndex(
                name: "IX_Members_RegionId",
                table: "Members",
                column: "RegionId");

            // Index for Gender filtering
            migrationBuilder.CreateIndex(
                name: "IX_Members_Gender",
                table: "Members",
                column: "Gender");

            // Index for MembershipTypeId filtering
            migrationBuilder.CreateIndex(
                name: "IX_Members_MembershipTypeId",
                table: "Members",
                column: "MembershipTypeId");

            // Index for CreatedDate sorting and filtering
            migrationBuilder.CreateIndex(
                name: "IX_Members_CreatedDate",
                table: "Members",
                column: "CreatedDate");

            // Composite index for common filtering combinations
            migrationBuilder.CreateIndex(
                name: "IX_Members_RegionId_Gender",
                table: "Members",
                columns: new[] { "RegionId", "Gender" });

            // Composite index for search and filtering
            migrationBuilder.CreateIndex(
                name: "IX_Members_RegionId_MembershipTypeId",
                table: "Members",
                columns: new[] { "RegionId", "MembershipTypeId" });

            // Index for MemberPayments table for payment status filtering
            migrationBuilder.CreateIndex(
                name: "IX_MemberPayments_MemberId_LastPaid",
                table: "MemberPayments",
                columns: new[] { "MemberId", "LastPaid" });

            // Index for payment status filtering
            migrationBuilder.CreateIndex(
                name: "IX_MemberPayments_PaymentStatus",
                table: "MemberPayments",
                column: "PaymentStatus");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop MemberPayments indexes
            migrationBuilder.DropIndex(
                name: "IX_MemberPayments_PaymentStatus",
                table: "MemberPayments");

            migrationBuilder.DropIndex(
                name: "IX_MemberPayments_MemberId_LastPaid",
                table: "MemberPayments");

            // Drop Members composite indexes
            migrationBuilder.DropIndex(
                name: "IX_Members_RegionId_MembershipTypeId",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_RegionId_Gender",
                table: "Members");

            // Drop Members single column indexes
            migrationBuilder.DropIndex(
                name: "IX_Members_CreatedDate",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_MembershipTypeId",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_Gender",
                table: "Members");

            migrationBuilder.DropIndex(
                name: "IX_Members_RegionId",
                table: "Members");
        }
    }
}
