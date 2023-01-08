const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../util/db');

class ActiveSession extends Model {}

ActiveSession.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'users', key: 'id' }
    }
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'activeSession'
  }
);

module.exports = ActiveSession;
