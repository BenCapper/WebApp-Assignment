'use strict';

const logger = require('../utils/logger');
const campusStore = require('../models/campus-store');
const uuid = require('uuid');

const building = {
  index(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    logger.debug(`Reading building ${buildingId} from Campus ${campusId}`);
    const viewData = {
      title: 'building',
      building: campusStore.getBuilding(campusId, buildingId),
      campus: campusStore.getCampus(campusId),
    };
    logger.info('about to render', viewData.building);
    response.render('building', viewData);
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
    const buildingId = request.params.buildingid
    const building = campusStore.getBuilding(campusId,buildingId);
    const newRoom = {
      id: request.body.id,
      capacity: 20,
      equipment: "none",
    };
    campusStore.addRoom(campusId, buildingId, newRoom);
    response.redirect('/building/' + campusId + '/viewroom/' + buildingId);
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