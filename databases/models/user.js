'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    title: DataTypes.STRING,
    name: DataTypes.STRING,
    company: DataTypes.STRING,
    logo: DataTypes.STRING,
    position: DataTypes.STRING,
    phone1: DataTypes.STRING,
    phone2: DataTypes.STRING,
    email: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    zip: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    website: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};