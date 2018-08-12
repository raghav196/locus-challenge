'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.schema.createTableIfNotExists('permissions', (table) => {
			table.increments('id');
			table.integer('role_id').references('id').inTable('roles').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.string('resource').references('resource').inTable('resources').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.string('access_level').references('access_level').inTable('action_types').notNullable().onUpdate('CASCADE').onDelete('CASCADE').index();
			table.boolean('grant').defaultTo(false);
			table.timestamp('created_at', false).defaultTo(knex.fn.now());
			table.timestamp('updated_at', false).defaultTo(knex.fn.now());
			table.unique(['role_id', 'resource', 'access_level', 'grant']);
		})
	])
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.schema.dropTableIfExists('permissions')
	]);
};
