'use strict';

const { Word } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Transcriptions', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      description: {
        type: Sequelize.STRING(50),
        allowNull: false,
      }
    })

    await queryInterface.addColumn(
      'Transcriptions',
      'wordId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'words',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )

    await queryInterface.addColumn(
      'Transcriptions',
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
    
    await queryInterface.addColumn(
      'Transcriptions',
      'pseudowordId',
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'pseudowords',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    )
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('transcriptions');
  }
};
