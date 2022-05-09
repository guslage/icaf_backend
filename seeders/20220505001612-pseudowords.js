'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const pseudowords = [
      'apomé',    'babonha', 'béz',
      'crá',      'dem',     'flô',
      'fogata',   'féqui',   'gar',
      'gipada',   'glabu',   'jar',
      'lemo',     'maquero', 'maqués',
      'mépa',     'pamoca',  'pepivunha',
      'poqui',    'péfa',    'ramilha',
      'ropi',     'supi',    'suteca',
      'tapapina', 'vum'
    ]

    for(const word of pseudowords) {
      await queryInterface.bulkInsert('Pseudowords', [{
        description: word,
        filename: `/assets/images/pseudowords/${word}.png`
      }], {})
    }
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Pseudowords', null, {});
  }
};
