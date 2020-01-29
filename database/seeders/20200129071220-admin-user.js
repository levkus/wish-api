'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'admin',
          password: '1234',
          email: 'admin@admin.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'noch212',
          password: '1234',
          email: 'noch212@mail.ru',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  },
}
