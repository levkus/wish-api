'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Wishes',
      [
        {
          title: 'wish1',
          description: 'description1',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'wish2',
          description: 'description2',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Wishes', null, {})
  },
}
