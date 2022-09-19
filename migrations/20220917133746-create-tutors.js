'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tutors', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }
    })

    await queryInterface.addColumn(
      'users',
      'tutorId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'tutors',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tutors');
  }
};
