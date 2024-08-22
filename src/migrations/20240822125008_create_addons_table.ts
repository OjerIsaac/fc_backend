import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('addons', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('price', 10, 2).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('addons');
}
