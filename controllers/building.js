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
    const roomId = request.params.roomid;
    logger.debug(`Deleting room ${roomId} from building ${buildingId}`);
    campusStore.removeRoom(campusId, buildingId, roomId);
    response.redirect('/building/' + campusId + '/build/' + buildingId);
  },
  
  addRoom(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid
    const newRoom = {
      id: request.body.id,
      capacity: request.body.capacity,
      equipment: request.body.equipment,
      class: [],
    };
    campusStore.addRoom(campusId, buildingId, newRoom);
    response.redirect('/building/' + campusId + '/build/' + buildingId);
  },

  updateRoom(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomId;
    logger.debug("updating building " + buildingId);
    const updatedRoom = {
      id: request.body.id,
      capacity: request.body.capacity,
      equipment: request.body.equipment,
    };
    campusStore.editRoom(campusId, buildingId, roomId, updatedRoom);
    response.redirect('/building/' + campusId + '/build/' + buildingId);
  },
  
};

module.exports = building;