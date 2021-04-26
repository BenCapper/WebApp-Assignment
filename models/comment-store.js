'use strict';
const JsonStore = require('./json-store');
const _ = require('lodash');


const commentStore = {

  // import the comment collection object
  store: new JsonStore('./models/comment-store.json', { commentCollection: [] }),
  collection: 'commentCollection',
  userstore: new JsonStore('./models/user-store.json', { users: [] }),
  usercollection: 'users',

  getAllComments() {
    return this.store.findAll(this.collection);
  },

  getComment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  addComments(comment) {
    this.store.add(this.collection, comment);
  },

  removeComment(id) {
    const comment = this.getComment(id);
    this.store.remove(this.collection, comment);
  },

  removeAllComments() {
    this.store.removeAll(this.collection);
  },
  
  editComment(id, updatedComment) {
    const comment = this.getComment(id);
    comment.id = updatedComment.id;
    comment.name = updatedComment.name;
    comment.date = updatedComment.date;
    comment.image = updatedComment.image;
    comment.comment = updatedComment.comment;
  },


};

// export the developerStore object so it can be used elsewhere
module.exports = commentStore;