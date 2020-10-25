'use strict';

const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password','firstName','lastName','DOB','PhoneNumber'],
  
      properties: {
        id: { type: 'integer' },
        email: { type: 'string', minLength: 8},
        firstName: { type: 'string', minLength: 3, maxLength: 255 },
        lastName: { type: 'string', minLength: 3, maxLength: 255 },
        password: { type: 'string' , minLength: 8},
        DOB: { type: 'date' },
        PhoneNumber: { type: 'string', maxLength: 10 },
  
  
      }
    };
  }


}



module.exports = {
 User
};
