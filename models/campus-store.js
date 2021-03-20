'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const logger = require('../utils/logger');
const campusStore = {

  store: new JsonStore('./models/campus-store.json', { campusCollection: [] }),
  collection: 'campusCollection',

  getAllCampus() {
    return this.store.findAll(this.collection);
  },

  getCampus(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  addCampus(campus) {
    this.store.add(this.collection, campus);
  },

  removeCampus(id) {
    const campus = this.getCampus(id);
    this.store.remove(this.collection, campus);
  },

  removeAllCampus() {
    this.store.removeAll(this.collection);
  },
  
  getBuilding(id, buildingId) {
    const campus = this.getCampus(id);
    const building = campus.building;
    const foundBuild = building.find(buildings => buildings.id === buildingId);
    return foundBuild;
  },
  
  addBuilding(id, building) {
    const campus = this.getCampus(id);
    campus.building.push(building);
  },

  removeBuilding(id, buildingId) {
    const campus = this.getCampus(id);
    const building = campus.building;
    _.remove(building, { id: buildingId});
  },
  
  editBuilding(id, buildingId, updatedBuilding) {
    const campus = this.getCampus(id);
    const building = campus.building;
    const index = building.findIndex(building => building.id === buildingId);
    building[index].id = updatedBuilding.id;
    building[index].roomamount = updatedBuilding.roomamount;
    building[index].phone = updatedBuilding.phone;
  },
  
  getRoomAmount(id, buildingId){
    const building = this.getBuilding(id, buildingId);
    let amount = building.room.length;
    return amount
  },
  
  getRoom(id, buildingId, roomId) {
    const building = this.getBuilding(id, buildingId);
    const room = building.room;
    const foundRoom = room.find(rooms => rooms.id === roomId);
    return foundRoom;
  },
  
  removeRoom(id, buildingId, roomId) {
    const building = this.getBuilding(id, buildingId);
    const room = building.room;
    _.remove(room, { id: roomId});
  },
  
  editRoom(id, buildingId, roomId, updatedRoom) {
    const building = this.getBuilding(id, buildingId);
    const room = building.room;
    const index = room.findIndex(rooms => rooms.id === roomId);
    room[index].id = updatedRoom.id;
    room[index].capacity = updatedRoom.capacity;
    room[index].equipment = updatedRoom.equipment;
  },
  
  addRoom(id, buildingId, room) {
    const building = this.getBuilding(id, buildingId);
    building.room.push(room);
  },
  
  getClass(id, buildingId, roomId, classId) {
    const room = this.getRoom(id, buildingId, roomId);
    const roomsClasses = room.class;
    const foundClass = roomsClasses.find(classes => classes.id === classId);
    return foundClass;
  },
  
  removeClass(id, buildingId, roomId, classId) {
    const room = this.getRoom(id, buildingId, roomId, classId);
    const classes = room.class;
    _.remove(classes, { id: classId});
  },
  
  editClass(id, buildingId, roomId, classId, updatedClass) {
    const room = this.getRoom(id, buildingId, roomId);
    const classes = room.class;
    const index = classes.findIndex(classCheck => classCheck.id === classId);
    logger.info(classes);
    classes[index].id = updatedClass.id;
    classes[index].lecturer = updatedClass.lecturer;
    classes[index].time = updatedClass.time;
    classes[index].day = updatedClass.day;
    classes[index].studentgroup = updatedClass.studentgroup;
    classes[index].module = updatedClass.module;
  },
  
  addClass(id, buildingId, roomId, scheduledClass) {
    const room = this.getRoom(id, buildingId, roomId);
    room.class.push(scheduledClass);
  },
};

module.exports = campusStore;