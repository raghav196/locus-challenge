'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('user_role_mappings', (table) => {
			table.uuid('user_id').references('id').inTable('users').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.integer('role_id').references('id').inTable('roles').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.boolean('deleted').defaultTo(false);
			table.timestamp('created_at', false).defaultTo(knex.fn.now());
			table.timestamp('updated_at', false).defaultTo(knex.fn.now());
			table.primary(['user_id', 'role_id'])
		})
	]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTableIfExists('user_role_mappings')
	]);
};
