'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      artist: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {
      paranoid: true,
      underscored: true
    }
  );
  Album.associate = models => Album.belongsTo(models.User, { foreignKey: 'userId' });

  return Album;
};
