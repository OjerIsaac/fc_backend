import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('meals', table => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.integer('brandId').unsigned().nullable();

    table.foreign('brandId').references('id').inTable('brands').onDelete('SET NULL');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('meals');
}
