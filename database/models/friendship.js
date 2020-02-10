'use strict'
module.exports = (sequelize, DataTypes) => {
  const Friendship = sequelize.define(
    'Friendship',
    {
      RequesterId: DataTypes.INTEGER,
      AddresseeId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {},
  )
  Friendship.associate = function(models) {
    Friendship.belongsTo(models.User, {
      foreignKey: 'RequesterId',
    })
    Friendship.belongsTo(models.User, {
      foreignKey: 'AddresseeId',
    })
  }
  return Friendship
}
