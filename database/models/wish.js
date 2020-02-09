'use strict'
module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define(
    'Wish',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      price: DataTypes.STRING,
      currency: DataTypes.STRING,
      priority: DataTypes.INTEGER,
    },
    {},
  )
  Wish.associate = function(models) {
    Wish.belongsTo(models.User, {
      foreignKey: 'UserId',
    })
    Wish.belongsTo(models.User, {
      foreignKey: 'GiverId',
    })
    // associations can be defined here
  }
  return Wish
}
