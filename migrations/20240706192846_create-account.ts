import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("account", function (table) {
    table.string("id", 255).primary().notNullable().unique();
    table.string("user_id", 255).notNullable();
    table.float("initial_value").notNullable();
    table.string("name", 128).notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("account");
}
