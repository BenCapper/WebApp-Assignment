'use strict';

// import all required modules
const logger = require('../utils/logger');
const campusStore = require('../models/campus-store.js');
const uuid = require('uuid');

// create dashboard object
const dashboard = {

  // index method - responsible for creating and rendering the view
  index(request, response) {

    // display confirmation message in log
    logger.info('dashboard rendering');
    const campusStore = require('../models/campus-store');

    // create view data object (contains data to be sent to the view e.g. page title)
    const viewData = {
      title: 'W.I.T Reservations Dashboard',
      campus: campusStore.getAllCampus(),
    };

    // render the dashboard view and pass through the data
    logger.info('about to render', viewData.campus);
    response.render('dashboard', viewData);
  },
  
  deleteCampus(request, response) {
    const campusId = request.params.id;
    logger.debug(`Deleting Campus: ${campusId}`);
    campusStore.removeCampus(campusId);
    response.redirect('/dashboard');
  },
  
  addCampus(request, response) {
    const newCampus = {
      id: uuid(),
      name: request.body.name
    };
    campusStore.addCampus(newCampus);
    response.redirect('/dashboard');
  },
};

// export the dashboard module
module.exports = dashboard;