import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("user", function (table) {
    table.string("id", 255).primary().notNullable().unique();
    table.string("name", 255).notNullable();
    table.string("email", 255).notNullable().unique();
    table.string("password", 255).nullable();
    table.string("salt", 255).nullable();
    table.string("role", 64).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("user");
}
