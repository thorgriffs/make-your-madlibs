'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Templates', [{
      title: "Talk Like A Pirate",
      templateBody: "Ye can always pretend to be a bloodthirsty <singularNoun>, threatening everyone by waving yer <descriptiveAdjective> sword in the air, but until ye learn to <rootVerb> like a pirate, ye'll never be <mannerAdverb> accepted as an authentic <singularNount>.",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Templates', null, {});
  }
};
