'use strict';

exports.up = function(knex, Promise) {
	return Promise.all([
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON user_role_mappings FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON resources FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON action_types FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()'),
		knex.raw('CREATE TRIGGER trigger_updated_at BEFORE UPDATE ON permissions FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column()')
	]);
};

exports.down = function(knex, Promise) {
	return Promise.all([
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON roles'),
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON users'),
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON user_role_mappings'),
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON resources'),
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON action_types'),
		knex.raw('DROP TRIGGER IF EXISTS trigger_updated_at ON permissions')
	]);
};
