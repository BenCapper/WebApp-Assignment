'use strict';

const logger = require('../utils/logger');
const campusStore = require('../models/campus-store');
const uuid = require('uuid');

const building = {
  index(request, response) {
    const buildingId = request.params.id;
    logger.debug('building id = ' + buildingId);
    const viewData = {
      title: 'building',
      building: campusStore.getCampus(buildingId),
    };
    response.render('campus', viewData);
  },
  
  deleteRoom(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    logger.debug(`Deleting building ${buildingId} from Campus ${campusId}`);
    campusStore.removeBuilding(campusId, buildingId);
    response.redirect('/campus/' + campusId);
  },
  
  addRoom(request, response) {
    const campusId = request.params.id;
    const campus = campusStore.getCampus(campusId);
    const newRoom = {
      id: request.body.id,
      capacity: request.body.capacity,
      equipment: request.body.equipment,
    };
    campusStore.addRoom(campusId, newRoom);
    response.redirect('/campus/' + campusId);
  },

  updateRoom(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    logger.debug("updating building " + buildingId);
    const updatedBuilding = {
      id: request.body.id,
      phone: request.body.phone,
    };
    campusStore.editBuilding(campusId, buildingId, updatedBuilding);
    response.redirect('/campus/' + campusId);
  },
  
};

module.exports = building;