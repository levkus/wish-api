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
          color: '#2196F3',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'noch212',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'noch212@mail.ru',
          color: '#f44336',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'adm1n',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'admin@mail.ru',
          color: '#607D8B',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'kassad',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'kassad@mail.ru',
          color: '#9C27B0',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'magun',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'magun@mail.ru',
          color: '#00BCD4',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'hyper',
          password:
            '$2b$10$p7IRYOfgoyQt4o/qfwLKpuW3X7aGBsLVjK/ysNJQr7BNT/oxvGWoq',
          email: 'hyper@mail.ru',
          color: '#4CAF50',
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
