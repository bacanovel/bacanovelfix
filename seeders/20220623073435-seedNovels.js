'use strict';
const fs = require('fs')
module.exports = {
   up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let novels = fs.readFileSync('./data/novels.json', 'utf8')
    novels = JSON.parse(novels)
    novels= novels.map(el =>{
      el["createdAt"] = new Date()
      el["updatedAt"] = new Date()
      return el
    })
      return  queryInterface.bulkInsert('Novels' , novels , {})
  },

   down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return  queryInterface.bulkDelete('Novels' , null , {})
  }
};
