import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('orders', table => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('customerId').unsigned().notNullable();
    table.uuid('mealId').notNullable();
    table.uuid('addonId').nullable();
    table.integer('quantity').notNullable();
    table.string('status').nullable();
    table.timestamp('createdAt').defaultTo(knex.fn.now());
    table.timestamp('updatedAt').defaultTo(knex.fn.now());
    table.timestamp('deletedAt').nullable();

    table.foreign('mealId').references('id').inTable('meals').onDelete('CASCADE');
    table.foreign('addonId').references('id').inTable('addons').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('orders');
}
