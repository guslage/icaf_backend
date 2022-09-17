'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const words = [
      'abacaxi',
      'abelha',
      'anel',
      'aranha',
      'cabelo',
      'cachorro',
      'cama',
      'caminhão',
      'carro',
      'casa',
      'celular',
      'chapéu',
      'chave',
      'chiclete',
      'chiclete',
      'chuva',
      'cobra',
      'colher',
      'copo',
      'criança',
      'cruz',
      'dedo',
      'dente',
      'dente',
      'dragão',
      'escova',
      'estrela',
      'explosão',
      'faca',
      'flecha',
      'flor',
      'fogão.wav',
      'formiga',
      'fralda',
      'galinha',
      'gato',
      'girafa',
      'igreja',
      'jacaré',
      'janela',
      'laranja',
      'livro',
      'lápis',
      'língua',
      'macaco',
      'maçã',
      'mesa',
      'microfone',
      'morango',
      'mosca',
      'mão',
      'nariz',
      'nuvem',
      'olha',
      'ovo',
      'panela',
      'pato',
      'pedra',
      'peixe',
      'pepivunha.wav',
      'placa',
      'planta',
      'prato',
      'pé',
      'rato',
      'refrigerante',
      'refrigerante',
      'refrigerante',
      'relógio',
      'sapato',
      'sapo',
      'sofá',
      'sol',
      'soprar',
      'tapete',
      'tapete',
      'tenis',
      'tesoura',
      'tesoura',
      'tigre',
      'travesseiro',
      'trem',
      'trigre',
      'umbigo',
      'unha',
      'uva',
      'vaca',
      'vassoura',
      'zebra',
      'zero',
      'árvore'
    ]

    for (const word of words) {
      await queryInterface.bulkInsert('Words', [{
        description: word,
        filename: `/assets/images/words/${word}.png`
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

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete('Words', null, {});
  }
};
