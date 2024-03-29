'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('words', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      silables: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      filename: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('words');
  }
};
