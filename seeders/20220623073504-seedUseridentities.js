'use strict';
const fs = require('fs')

module.exports = {
  up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    let useridentities = fs.readFileSync('./data/usersIdentity.json', 'utf8')
    useridentities = JSON.parse(useridentities)
    useridentities = useridentities.map(el => {
      el["createdAt"] = new Date()
      el["updatedAt"] = new Date()
      return el
    })
    //  console.log(useridentities)
    return queryInterface.bulkInsert('UserIdentities', useridentities, {})

  },

  down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete('UserIdentities', null, {})
  }
};
