'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Templates', [{
      title: "Talk Like A Pirate",
      teaser: "Ye can always pretend to be a bloodthirsty...",
      templateBody: "Ye can always pretend to be a bloodthirsty <singularNoun>, threatening everyone by waving yer <descriptiveAdjective> sword in the air, but until ye learn to <rootVerb> like a pirate, ye'll never be <mannerAdverb> accepted as an authentic <singularNoun>. So here's what ye do: Cleverly work into yer daily conversations <descriptiveAdjective> pirate phrases such as \"Ahoy there, <pluralNoun>,\" \"Avast, ye <pluralNoun>,\" and \"Shiver me <pluralNoun>.\" Remember to drop all yer g's when ye say such words as \"sailin'\", \"spittin'\", and \"fightin'\".  This will give ye a/an <singularNoun> start to being recognized as a swashbucklin' <singularNoun>.  Once ye have the lingo down pat, it helps to wear a three-cornered <singularNoun> on yer head, stash a/an <singularNoun> in yer pants, and keep a/an <singularNoun> perched atop yer <singularNoun>. Aye, now ye be a real pirate!",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Templates', null, {});
  }
};
