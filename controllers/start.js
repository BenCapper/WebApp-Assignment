'use strict';

// import all required modules
const logger = require('../utils/logger');
const accounts = require ('./accounts.js');
const campusStore = require('../models/campus-store.js');
const userStore = require('../models/user-store.js');

// create start object
const start = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');
    if(loggedInUser){
      
      const campuses = campusStore.getAllCampus();
      const buildings = campusStore.getAllBuilding();
      const building = [];
      logger.info(buildings.length);
      
      const rooms = campusStore.getAllRoom();
      const users = userStore.getAllUsers();
      let totalUser = users.length;


      
      
      let userCampus = campuses.filter(campus => campus.userid == loggedInUser.id);
      let userCampusResult = userCampus.length;
      
      let userBuilding = buildings.filter(building => building.userid == loggedInUser.id);
      logger.info(userBuilding);
      let userBuildingResult = userBuilding.length;
      logger.info(userBuildingResult);
    
      let roomresult = rooms.filter(room => room != null);
      let totalCampus = campuses.length;
      
      let totalRoom = rooms.length;
      
    const viewData = {
      title: 'WIT Class Manager',
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
      usercampus: userCampusResult,
      userbuilding: userBuildingResult,
      userroom: "",
      userclass: "",
      avgcampus: "",
      avgbuilding: "",
      avgroom: "",
      avgclass: "",
      totalcampus: totalCampus,
      totalbuilding: buildings.length,
      totalroom: totalRoom,
      totalclass: "",
      users: totalUser,
    };

    response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;