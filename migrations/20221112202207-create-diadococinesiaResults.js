'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('diadococinesiaResults', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true 
      },
      fileId: {
        type: Sequelize.STRING(1000),
        allowNull: false,
      },
      transcriptions: {
        type: Sequelize.STRING(500),
        allowNull: true
      }
    })

    await queryInterface.addColumn(
      'diadococinesiaResults',
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
