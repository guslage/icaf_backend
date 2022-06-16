'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('results', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      audio: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      fileId: {
        type: Sequelize.STRING(200),
        allowNull: true
      }
    })

    await queryInterface.addColumn(
      'results',
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
      'results',
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
      'results',
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
    await queryInterface.dropTable('results');
  }
};
