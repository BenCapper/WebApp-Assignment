'use strict';

const logger = require('../utils/logger');
const campusStore = require('../models/campus-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const building = {
  index(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const rooms = campusStore.getBuilding(campusId,buildingId);
    const loggedInUser = accounts.getCurrentUser(request);
    for(let classes of rooms.room){
      let classcount = classes.class.length;
      logger.info(classcount);
      const newRoom = {
      id: classes.id,
      userid: loggedInUser.id,
      name: classes.name,
      capacity: classes.capacity,
      equipment: classes.equipment,
      picture: classes.picture,
      classcount: classcount,
      class: classes.class,
      }
      campusStore.editRoom(campusId, buildingId, classes.id, newRoom)
    }
    const viewData = {
      title: 'Building',
      room: campusStore.getRoom(campusId, buildingId, roomId),
      building: campusStore.getBuilding(campusId, buildingId),
      campus: campusStore.getCampus(campusId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
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
    const loggedInUser = accounts.getCurrentUser(request);
    const campusId = request.params.id;
    const buildingId = request.params.buildingid
    const newRoom = {
      id: uuid(),
      userid: loggedInUser.id,
      name: request.body.name,
      capacity: request.body.capacity,
      equipment: request.body.equipment,
      picture: request.files.picture,
      classcount: 0,
      class: [],
    };
    campusStore.addRoom(campusId, buildingId, newRoom, function() {
    response.redirect('/building/' + campusId + '/build/' + buildingId);
    });
    },
  updateRoom(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomId;
    logger.debug("updating building " + buildingId);
    const updatedRoom = {
      id: uuid(),
      name: request.body.name,
      capacity: request.body.capacity,
      equipment: request.body.equipment,
    };
    campusStore.editRoom(campusId, buildingId, roomId, updatedRoom);
    response.redirect('/building/' + campusId + '/build/' + buildingId);
  },
  
};

module.exports = building;