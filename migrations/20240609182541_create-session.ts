import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("session", function (table) {
    table.string("id", 255).primary().notNullable().unique();
    table.string("user_id", 255).notNullable();
    table.datetime("expires_at").notNullable();
    table.string("token").notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("session");
}
