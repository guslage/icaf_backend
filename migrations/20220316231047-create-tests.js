'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('tests', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      completedWords: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    })

    await queryInterface.addColumn(
      'tests',
      'userId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tests');
  }
};
