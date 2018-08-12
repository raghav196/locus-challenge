'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('action_types', (table) => {
			// table.increments('id');
			table.string('access_level').primary();
			table.timestamp('created_at', false).defaultTo(knex.fn.now());
			table.timestamp('updated_at', false).defaultTo(knex.fn.now());
		})
	])
};

exports.down = function(knex, Promise) {
  
};
