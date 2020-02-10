'use strict'
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
    },
    {},
  )
  User.associate = function(models) {
    User.hasMany(models.Wish)
    User.hasMany(models.Friendship, { foreignKey: 'RequesterId' })
    User.hasMany(models.Friendship, { foreignKey: 'AddresseeId' })
    // associations can be defined here
  }
  return User
}
