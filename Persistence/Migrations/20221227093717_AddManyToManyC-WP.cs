using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddManyToManyCWP : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Clients_WorkPlaces_WorkPlaceId",
                table: "Clients");

            migrationBuilder.DropIndex(
                name: "IX_Clients_WorkPlaceId",
                table: "Clients");

            migrationBuilder.DropColumn(
                name: "WorkPlaceId",
                table: "Clients");

            migrationBuilder.CreateTable(
                name: "ClientWorkPlace",
                columns: table => new
                {
                    ClientsId = table.Column<int>(type: "int", nullable: false),
                    WorkPlacesId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClientWorkPlace", x => new { x.ClientsId, x.WorkPlacesId });
                    table.ForeignKey(
                        name: "FK_ClientWorkPlace_Clients_ClientsId",
                        column: x => x.ClientsId,
                        principalTable: "Clients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ClientWorkPlace_WorkPlaces_WorkPlacesId",
                        column: x => x.WorkPlacesId,
                        principalTable: "WorkPlaces",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ClientWorkPlace_WorkPlacesId",
                table: "ClientWorkPlace",
                column: "WorkPlacesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ClientWorkPlace");

            migrationBuilder.AddColumn<int>(
                name: "WorkPlaceId",
                table: "Clients",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Clients_WorkPlaceId",
                table: "Clients",
                column: "WorkPlaceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Clients_WorkPlaces_WorkPlaceId",
                table: "Clients",
                column: "WorkPlaceId",
                principalTable: "WorkPlaces",
                principalColumn: "Id");
        }
    }
}
