import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("category", function (table) {
    table.string("id", 255).primary().notNullable().unique();
    table.string("name", 128).notNullable();
    table.string("user_id", 255).notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("category");
}
