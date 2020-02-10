'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Friendships',
      [
        {
          RequesterId: 1,
          AddresseeId: 2,
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 1,
          AddresseeId: 3,
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 1,
          AddresseeId: 4,
          status: 'requested',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 2,
          AddresseeId: 4,
          status: 'declined',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 5,
          AddresseeId: 1,
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Friendships', null, {})
  },
}
