/* eslint-disable */
'use strict';

module.exports = {
  // eslint-disable-line no-alert
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('Templates', [
      {
        title: "Talk Like A Pirate",
        teaser: "Ye can always pretend to be a bloodthirsty...",
        templateBody: "Ye can always pretend to be a bloodthirsty <singularNoun>, threatening everyone by waving yer <descriptiveAdjective> sword in the air, but until ye learn to <rootVerb> like a pirate, ye'll never be <mannerAdverb> accepted as an authentic <singularNoun>. So here's what ye do: Cleverly work into yer daily conversations <descriptiveAdjective> pirate phrases such as \"Ahoy there, <pluralNoun>,\" \"Avast, ye <pluralNoun>,\" and \"Shiver me <pluralNoun>.\" Remember to drop all yer g's when ye say such words as \"sailin'\", \"spittin'\", and \"fightin'\".  This will give ye a/an <singularNoun> start to being recognized as a swashbucklin' <singularNoun>.  Once ye have the lingo down pat, it helps to wear a three-cornered <singularNoun> on yer head, stash a/an <singularNoun> in yer pants, and keep a/an <singularNoun> perched atop yer <singularNoun>. Aye, now ye be a real pirate!",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Fairy Tale",
        teaser: "Once upon a time there was a...",
        templateBody: "Once upon a time there was a <descriptiveAdjective> <properNoun> who lived in a giant <singularNoun>. One day a <singularNoun> came to visit, bringing news about a <properNoun> in a nearby <singularNoun>. The <properNoun> was very <descriptiveAdjective> to hear such interesting news and quickly made plans to visit the <properNoun>. Before they arrived, a ghastly <singularNoun> leaped out in front of their carriage. The <singularNoun> demanded all of their <pluralNoun>. It was then that a handsome <singularNoun> appeared as if out of nowhere and chased away the <singularNoun>. The <properNoun> and the handsome <singularNoun> decided to throw a grand party to celebrate. The End.",
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Stay Home",
        teaser: "Once there was a strange time where a...",
        templateBody: "Once there was a strange time where a <properNoun> took over the world and made us all stay <descriptiveAdjective> at home. So we <simplePastVerb> into our imagination and found out the key to <descriptiveAdjective> was all about wearing <singularNoun> with <singularNoun>. It turned out that this was also the trick to turning on our <properNoun> and getting to do everything you love all at once. Now, we can eat <singularNoun> while playing <singularNoun>, or search for <singularNoun> while singing <singularNoun>. One time, we even turned <singularNoun> into a <properNoun>. Don't believe us? Just say <singularNoun> and we'll show you.",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Templates', null, {});
  }
};
