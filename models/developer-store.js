'use strict';
const JsonStore = require('./json-store');
const _ = require('lodash');


const developerStore = {

  // import the developer collection object
  store: new JsonStore('./models/developer-store.json', { developerCollection: [] }),
  collection: 'developerCollection',

  getAllDevelopers() {
    return this.store.findAll(this.collection);
  },

  getDeveloper(name) {
    return this.store.findOneBy(this.collection, { name: name });
  },

  addDeveloper(developer) {
    this.store.add(this.collection, developer);
  },

  removeDeveloper(name) {
    const developer = this.getDeveloper(name);
    this.store.remove(this.collection, developer);
  },

  removeAllDevelopers() {
    this.store.removeAll(this.collection);
  },

  addDeveloper(name, developer) {
    const developers = this.getDeveloper(name);
    developers.push(developer);
  },


};

// export the developerStore object so it can be used elsewhere
module.exports = developerStore;