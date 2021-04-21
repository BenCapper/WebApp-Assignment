'use strict';
const logger = require('../utils/logger');
const campusStore = require('../models/campus-store');
const uuid = require('uuid');
const accounts = require ('./accounts.js');

const room = {
  index(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const classId = request.params.classid;
    const loggedInUser = accounts.getCurrentUser(request);
    logger.debug(`Reading Room ${roomId} from building ${buildingId} from Campus ${campusId}`);
    const viewData = {
      title: 'room',
      campus: campusStore.getCampus(campusId),
      building: campusStore.getBuilding(campusId, buildingId),
      room: campusStore.getRoom(campusId, buildingId, roomId),
      class: campusStore.getClass(campusId, buildingId, roomId, classId),
      fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      picture: loggedInUser.picture,
    };
    logger.info('about to render', viewData.room);
    response.render('room', viewData);
  },
  
  deleteClass(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const classId = request.params.classid;
    logger.debug(`Deleting building ${buildingId} from Campus ${campusId}`);
    campusStore.removeClass(campusId, buildingId, roomId, classId);
    response.redirect(`/room/${campusId}/build/${buildingId}/getRoom/${roomId}`);
  },
  
  addClass(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const building = campusStore.getBuilding(campusId,buildingId);
    const scheduledClass = {
      id: uuid(),
      userid: loggedInUser.id,
      lecturer: "",
      time: "",
      day: "",
      studentgroup: "",
      module: "",
    };
    campusStore.addClass(campusId, buildingId, roomId, scheduledClass);
    response.redirect(`/room/${campusId}/build/${buildingId}/getRoom/${roomId}`);
  },

  updateClass(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const classId = request.params.classid;
    logger.debug("updating room " + roomId);
    const updatedClass = {
      id: uuid(),
      lecturer: request.body.lecturer,
      time: request.body.time,
      day: request.body.day,
      studentgroup: request.body.studentgroup,
      module: request.body.module,
    };
    if(campusStore.checkDateTime(campusId, buildingId, roomId, updatedClass.day, updatedClass.time)){
      logger.info("This Time and Date Combination is not Reserved");
      campusStore.editClass(campusId, buildingId, roomId, classId, updatedClass);
      response.redirect(`/room/${campusId}/build/${buildingId}/getRoom/${roomId}`);
    }
    else {
       response.redirect(`/room/${campusId}/build/${buildingId}/getRoom/${roomId}`);
    }
  },
  
  
};

module.exports = room;