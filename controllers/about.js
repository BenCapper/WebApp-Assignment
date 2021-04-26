'use strict';

// import all required modules
const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const commentStore = require('../models/comment-store.js');
const accounts = require ('./accounts.js');
const uuid = require('uuid');

// create about object
const about = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('about rendering');
    const loggedInUser = accounts.getCurrentUser(request);
    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'About WIT Class Manager',
      developers: developerStore.getAllDevelopers(),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      comments: commentStore.getAllComments()
    };

    // render the about view and pass through the data
    logger.info('about to render', viewData.developers);
    response.render('about', viewData);
  },
  
  addComments(request, response) {
    const date = new Date();
    const min = date.getMinutes();
    let time = date.getHours() + ":" + date.getMinutes();
    const loggedInUser = accounts.getCurrentUser(request);
    let comment = {
    id: uuid(),
    userid: loggedInUser.id,
    name: loggedInUser.firstName + " " + loggedInUser.lastName,
    date: date,
    time: time,
    image: loggedInUser.picture,
    comment: request.body.comment
  };
    logger.info('adding comment: ' + comment);
    commentStore.addComments(comment)
    response.redirect('/about');
},
  
  deleteComment(request, response) {
    const id = request.params.id;
    const userid = request.params.userid;
    const loggedInUser = accounts.getCurrentUser(request);
    if(userid == loggedInUser.id){
    commentStore.removeComment(id);
    }
    response.redirect('/about');
  },
  
  editComment(request, response) {
    const id = request.params.id;
    const comment = commentStore.getComment(id);
    const updatedComment = {
      id: comment.id,
      name: comment.name,
      date: comment.date,
      image: comment.image,
      comment: request.body.comment,
    };
    commentStore.editComment(id, updatedComment);
    response.redirect('/about');
  },
};

// export the about module
module.exports = about;