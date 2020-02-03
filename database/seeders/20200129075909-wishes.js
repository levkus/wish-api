'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Wishes',
      [
        {
          title: 'Ableton Push 2',
          description: 'Контроллер для Ableton Live',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'iPhone 11 Pro',
          UserId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Зеркалка',
          description: 'Зеркальный фотоаппарат, чтобы фотать себя красивую',
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Elgato KeyLight',
          description: 'Освещение для стримов',
          UserId: 2,
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
