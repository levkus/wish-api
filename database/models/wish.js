'use strict'
module.exports = (sequelize, DataTypes) => {
  const Wish = sequelize.define(
    'Wish',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
    },
    {},
  )
  Wish.associate = function(models) {
    Wish.belongsTo(models.User)
    // associations can be defined here
  }
  return Wish
}
