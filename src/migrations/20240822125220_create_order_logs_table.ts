import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('order_logs', table => {
    table.increments('id').primary();
    table.integer('orderId').unsigned().notNullable();
    table.string('status').notNullable();
    table.timestamp('timestamp').defaultTo(knex.fn.now());

    table.foreign('orderId').references('id').inTable('orders').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('order_logs');
}
