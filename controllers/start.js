"use strict";

// import all required modules
const logger = require("../utils/logger");
const accounts = require("./accounts.js");
const campusStore = require("../models/campus-store.js");
const userStore = require("../models/user-store.js");

// create start object
const start = {
  // index method - responsible for creating and rendering the view
  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info("start rendering");
    if (loggedInUser) {
      const campuses = campusStore.getAllCampus();
      const buildings = campusStore.getAllBuilding();
      const rooms = campusStore.getAllRoom();
      const classes = campusStore.getAllClass();
      const users = userStore.getAllUsers();
      let totalCampus = campuses.length;
      let totalUser = users.length;
      let avgCampus = totalCampus / totalUser;
      let avgBuild = buildings / totalUser;
      let avgRoom = rooms / totalUser;
      let avgClass = classes / totalUser;
      const userCollection = campusStore.getUserCollection(loggedInUser.id);
      let userCampuses = userCollection.length;
      let userBuildings = campusStore.getNumOfUserBuilding(loggedInUser.id);
      let userRooms = campusStore.getNumOfUserRoom(loggedInUser.id);
      let userClasses = campusStore.getNumOfUserClass(loggedInUser.id);
      let count = 0;
      let mostUser;
      for (let user of users) {
        let matchCount = 0;
        for (let campus of campuses) {
          if (campus.userid == user.id) {
            matchCount++;
            if (matchCount > count) {
              count = matchCount;
              mostUser = user;
            }
          }
        }
      }
      let userName;
      if(mostUser == null){
        userName = "";
      } else {
        userName = mostUser.firstName + " " + mostUser.lastName.substring(0,1);
      }
      let total = 0;
      let mostUserBuild;
      for (let user of users){
        let count = campusStore.getNumOfUserBuilding(user.id);
        if (count > total){
          total = count;
          mostUserBuild = user.firstName + " " + user.lastName.substring(0,1);
        }
      }
      let totalRooms = 0;
      let mostUserRoom;
      for (let user of users){
        let count = campusStore.getNumOfUserRoom(user.id);
        if (count > totalRooms){
          totalRooms = count;
          mostUserRoom = user.firstName + " " + user.lastName.substring(0,1);
        }
      }
      let totalClasses = 0;
      let mostUserClass;
      for (let user of users){
        let count = campusStore.getNumOfUserClass(user.id);
        if (count > totalClasses){
          totalClasses = count;
          mostUserClass= user.firstName + " " + user.lastName.substring(0,1);
        }
      }

      
      const viewData = {
        title: "WIT Class Manager",
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
        usercampus: userCampuses,
        userbuilding: userBuildings,
        userroom: userRooms,
        userclass: userClasses,
        avgcampus: avgCampus,
        avgbuilding: avgBuild,
        avgroom: avgRoom,
        avgclass: avgClass,
        mostcampus: userName,
        mostbuilding: mostUserBuild,
        mostroom: mostUserRoom,
        mostclass: mostUserClass,
        totalcampus: totalCampus,
        totalbuilding: buildings,
        totalroom: rooms,
        totalclass: classes,
        users: totalUser
      };

      response.render("start", viewData);
    } else response.redirect("/");
  }
};

// export the start module
module.exports = start;
