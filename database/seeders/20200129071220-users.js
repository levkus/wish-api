'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'starpact',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'levkus@gmail.com',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'noch212',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'noch212@mail.ru',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'adm1n',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'admin@mail.ru',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'kassad',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'kassad@mail.ru',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'magun',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'magun@mail.ru',
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
