import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("transaction", function (table) {
    table.string("id", 255).primary().notNullable().unique();
    table.string("name", 128).notNullable();
    table.float("value").notNullable();
    table.datetime("date").notNullable();
    table.string("notes", 1024).nullable();
    table.string("user_id", 255).notNullable();
    table.string("account_id", 255).notNullable();
    table.string("category_id", 255).nullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .foreign("user_id")
      .references("id")
      .inTable("user")
      .onDelete("CASCADE");
    table
      .foreign("account_id")
      .references("id")
      .inTable("account")
      .onDelete("CASCADE");
    table
      .foreign("category_id")
      .references("id")
      .inTable("account")
      .onDelete("SET NULL");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("transaction");
}
