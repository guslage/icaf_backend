'use strict';

const { Word } = require('../models')

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('transcriptions', {
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
      'transcriptions',
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
<<<<<<< HEAD
=======

    await queryInterface.addColumn(
      'transcriptions',
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
>>>>>>> d9e512fc283cb7095715ba2a7498fd167ac04b19
    
    await queryInterface.addColumn(
      'transcriptions',
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
