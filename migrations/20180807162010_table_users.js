'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('users', (table) => {
			table.uuid('id').primary();
			table.string('name').notNullable();
			table.string('email').notNullable().unique();
			table.string('country_code');
			table.string('phone');
			table.string('password').notNullable();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at', false).defaultTo(knex.fn.now());
			table.timestamp('updated_at', false).defaultTo(knex.fn.now());
		})
	])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('users')
	]);
};
