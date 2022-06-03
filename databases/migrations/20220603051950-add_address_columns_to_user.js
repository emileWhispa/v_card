'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn('Users', 'street', {
        type: Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Users', 'city', {
        type: Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Users', 'zip', {
        type: Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Users', 'state', {
        type: Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Users', 'country', {
        type: Sequelize.STRING,
        allowNull:true
      }),
      queryInterface.addColumn('Users', 'website', {
        type: Sequelize.TEXT,
        allowNull:true
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('Users', 'street'),
      queryInterface.removeColumn('Users', 'city'),
      queryInterface.removeColumn('Users', 'zip'),
      queryInterface.removeColumn('Users', 'state'),
      queryInterface.removeColumn('Users', 'country'),
      queryInterface.removeColumn('Users', 'website'),
    ])
  }
};
