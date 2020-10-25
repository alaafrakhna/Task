
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('email');
        table.string('password');
        table.string('PhoneNumber');
        table.date('DOB');
    
      });

  
};

exports.down = function(knex) {

    return knex.schema.dropTableIfExists('users');
  
};
