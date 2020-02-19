'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'Wishes',
      [
        {
          title: 'iPhone 11 Pro',
          UserId: 1,
          link: 'https://apple.com',
          price: '100000',
          priority: 3,
          currency: 'rur',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Зеркалка',
          description: 'Зеркальный фотоаппарат, чтобы фотать себя красивую',
          link: 'https://google.com',
          price: '50000',
          currency: 'rur',
          priority: 2,
          UserId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Elgato Key Light',
          description: 'Освещение для стримов',
          link: 'https://google.com',
          price: '12000',
          currency: 'rur',
          priority: 1,
          UserId: 2,
          GiverId: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Вольный жеребец',
          link: 'https://google.com',
          price: '1000000',
          currency: 'rur',
          priority: 2,
          UserId: 2,
          GiverId: 3,
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
