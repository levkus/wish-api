'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'FriendshipRequests',
      [
        {
          RequesterId: 1,
          ResponderId: 2,
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 1,
          ResponderId: 3,
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 1,
          ResponderId: 4,
          status: 'pending',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 2,
          ResponderId: 4,
          status: 'rejected',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          RequesterId: 5,
          ResponderId: 1,
          status: 'accepted',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FriendshipRequests', null, {})
  },
}
