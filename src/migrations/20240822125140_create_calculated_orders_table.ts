import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('calculated_orders', table => {
    table.increments('id').primary();
    table.integer('orderId').unsigned().notNullable();
    table.decimal('totalPrice', 10, 2).notNullable();
    table.timestamp('calculationDate').defaultTo(knex.fn.now());

    table.foreign('orderId').references('id').inTable('orders').onDelete('CASCADE');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('calculated_orders');
}
