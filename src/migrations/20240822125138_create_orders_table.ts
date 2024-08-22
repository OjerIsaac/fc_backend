import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', table => {
    table.increments('id').primary();
    table.integer('customerId').unsigned().notNullable();
    table.integer('mealId').unsigned().notNullable();
    table.integer('addonId').unsigned().nullable();
    table.integer('quantity').notNullable();
    table.string('status').notNullable();

    table.foreign('mealId').references('id').inTable('meals').onDelete('CASCADE');
    table.foreign('addonId').references('id').inTable('addons').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
