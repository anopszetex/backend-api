export function up(knex) {
  return knex.schema.createTable('students', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable();
    table.string('email').notNullable();
    table.string('ra').notNullable().unique();
    table.string('cpf').notNullable();
  });
}

export function down(knex) {
  return knex.schema.dropTable('students');
}
