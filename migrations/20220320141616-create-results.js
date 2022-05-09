'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Results', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      audio: {
        type: Sequelize.STRING(100),
        allowNull: false,
      }
    })

    await queryInterface.addColumn(
      'Results',
      'wordId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'words',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )

    await queryInterface.addColumn(
      'Results',
      'transcriptionId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'transcriptions',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )

    await queryInterface.addColumn(
      'Results',
      'testId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'tests',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        allowNull: true
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Results');
  }
};
