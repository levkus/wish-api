'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {},
  )
  User.associate = function(models) {
    User.hasMany(models.Wish)
    User.hasMany(models.FriendshipRequest, { foreignKey: 'RequesterId' })
    User.hasMany(models.FriendshipRequest, { foreignKey: 'ResponderId' })
    // associations can be defined here
  }
  return User
}
