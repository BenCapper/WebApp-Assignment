"use strict";

// import all required modules
const logger = require("../utils/logger");
const campusStore = require("../models/campus-store.js");
const uuid = require("uuid");
const accounts = require("./accounts.js");

// create dashboard object
const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    const campuses = campusStore.getUserCollection(loggedInUser.id);
    for (let build of campuses){
      let buildcount = build.building.length;
      const newCamp = {
        id: build.id,
        userid: build.userid,
        name: build.name,
        picture: build.picture,
        buildcount: buildcount,
        building: build.building
      }
      campusStore.editCampus(build.id, newCamp)
    }
    if (loggedInUser) {
      const viewData = {
        title: "Dashboard",
        campus: campusStore.getUserCollection(loggedInUser.id),
        fullname: loggedInUser.firstName + " " + loggedInUser.lastName,
        picture: loggedInUser.picture,
      };
      logger.info("about to render" + viewData.campus);
      response.render("dashboard", viewData);
    } else response.redirect("/");
  },

  deleteCampus(request, response) {
    const campusId = request.params.id;
    logger.debug(`Deleting Campus: ${campusId}`);
    campusStore.removeCampus(campusId);
    response.redirect("/dashboard");
  },

  addCampus(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newCampus = {
      id: uuid(),
      userid: loggedInUser.id,
      name: request.body.name,
      picture: request.files.picture,
      bulildcount: 0,
      building: []
    };
    campusStore.addCampus(newCampus, function() {
      response.redirect("/dashboard");
    });
  }
};

// export the dashboard module
module.exports = dashboard;
