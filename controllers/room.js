'use strict';

const logger = require('../utils/logger');
const campusStore = require('../models/campus-store');
const uuid = require('uuid');

const room = {
  index(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const classId = request.params.classid
    logger.debug(`Reading Room ${roomId} from building ${buildingId} from Campus ${campusId}`);
    const viewData = {
      title: 'room',
      campus: campusStore.getCampus(campusId),
      building: campusStore.getBuilding(campusId, buildingId),
      room: campusStore.getRoom(campusId, buildingId, roomId),
      class: campusStore.getClass(campusId, buildingId, roomId, classId),
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
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid;
    const building = campusStore.getBuilding(campusId,buildingId);
    const scheduledClass = {
      id: uuid(),
      lecturer: "Lecturer Name",
      time: "Class Time",
      day: "Class Day",
      studentgroup: "Student Group",
      module: "Module",
    };
    campusStore.addClass(campusId, buildingId, roomId, scheduledClass);
    response.redirect(`/room/${campusId}/build/${buildingId}/getRoom/${roomId}`);
  },

  updateClass(request, response) {
    const campusId = request.params.id;
    const buildingId = request.params.buildingid;
    const roomId = request.params.roomid
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
    campusStore.editClass(campusId, buildingId, roomId, classId, updatedClass);
    response.redirect(`/room/${campusId}/build/${buildingId}/getRoom/${roomId}`);
  },
  
};

module.exports = room;