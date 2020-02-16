'use strict'
module.exports = (sequelize, DataTypes) => {
  const FriendshipRequest = sequelize.define(
    'FriendshipRequest',
    {
      RequesterId: DataTypes.INTEGER,
      ResponderId: DataTypes.INTEGER,
      status: DataTypes.STRING,
    },
    {},
  )
  FriendshipRequest.associate = function(models) {
    FriendshipRequest.belongsTo(models.User, {
      foreignKey: 'RequesterId',
    })
    FriendshipRequest.belongsTo(models.User, {
      foreignKey: 'ResponderId',
    })
  }
  return FriendshipRequest
}
