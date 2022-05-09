'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      name: {
        type: Sequelize.STRING(30),
        allowNull: false,
      },
      school: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      birthDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      motherName: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      phone:  {
        type: Sequelize.STRING(13),
        allowNull: false
      },
      residentialPhone: {
        type: Sequelize.STRING(10)
      },
      username: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(20),
        allowNull: false
      }
    })

    
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('users');
  }
};
