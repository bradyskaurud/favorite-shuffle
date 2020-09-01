'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OauthConnection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  OauthConnection.init({
    user_id: DataTypes.INTEGER,
    token: DataTypes.STRING,
    refresh_token: DataTypes.STRING,
    expires: DataTypes.INTEGER,
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'OauthConnection',
  });
  return OauthConnection;
};