'use strict';

const logger = require('../utils/logger');
const campusStore = require('../models/campus-store');
const uuid = require('uuid');

const campus = {
  index(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const campus = campusStore.getCampus(campusId) ;
    for(let buildings of campus.building){
      let roomAmount = buildings.room.length;
      const newBuild = {
        id: buildings.id,
        roomamount: roomAmount,
        phone: buildings.phone,
        room: buildings.room,
      }
      campusStore.editBuilding(campus.id, buildings.id, newBuild)
    }
    logger.debug('campus id = ' + campusId);
    const viewData = {
      title: 'Campus',
      campus: campusStore.getCampus(campusId),
      building: campusStore.getBuilding(campusId, buildingId)
    };
    logger.info('about to render', viewData.campus);
    response.render('campus', viewData);
  },
  
  deleteBuilding(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    logger.debug(`Deleting building ${buildingId} from Campus ${campusId}`);
    campusStore.removeBuilding(campusId, buildingId);
    response.redirect('/campus/' + campusId);
  },
  
  
  addBuilding(request, response) {
    const campusId = request.params.id;
    const newBuilding = {
      id: request.body.id,
      roomamount: 0,
      phone: request.body.phone,
      room: [],
    };
    campusStore.addBuilding(campusId, newBuilding);
    response.redirect('/campus/' + campusId);
  },

  updateBuilding(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const rooms = campusStore.getRoomAmount(campusId,buildingId)
    logger.debug("updating building " + buildingId);
    const updatedBuilding = {
      id: request.body.id,
      roomamount: rooms,
      phone: request.body.phone,
    };
    campusStore.editBuilding(campusId, buildingId, updatedBuilding);
    response.redirect('/campus/' + campusId);
  }
};

module.exports = campus;