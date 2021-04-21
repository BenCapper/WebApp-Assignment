'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');
const cloudinary = require('cloudinary');
const logger = require('../utils/logger');

try {
  const env = require('../.data/.env.json');
  cloudinary.config(env.cloudinary);
}
catch(e) {
  logger.info('You must provide a Cloudinary credentials file - see README.md');
  process.exit(1);
}


const campusStore = {

  store: new JsonStore('./models/campus-store.json', { campusCollection: [] }),
  collection: 'campusCollection',
  
  getUserCollection(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  getAllCampus() {
    return this.store.findAll(this.collection);
  },
  
  getAllBuilding() {
    const campuses = this.store.findAll(this.collection);
    const buildings = [];
    
    campuses.forEach(campus => buildings.push(campus.building));
    
    logger.info(buildings);
    return buildings;
  },
  
  getAllRoom() {
    const campuses = this.store.findAll(this.collection);
    const buildings = [];
    const rooms = [];
    campuses.forEach(campus => buildings.push(campus.building));
    buildings.forEach(building => rooms.push(building.room));
    return rooms;
  },

  getCampus(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },
  
  addCampus(campus, response) {
    campus.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            campus.picture = result.url;
            response();
          });
        }
      });
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
  
  /*addBuilding(id, building) {
    const campus = this.getCampus(id);
    campus.building.push(building);
  },*/
  
    addBuilding(id, building, response) {
    const campus = this.getCampus(id);
    building.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            building.picture = result.url;
            response();
          });
        }
      });
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
  
  /*addRoom(id, buildingId, room) {
    const building = this.getBuilding(id, buildingId);
    building.room.push(room);
  },*/
  
  addRoom(id, buildingId, room, response) {
    const building = this.getBuilding(id, buildingId);
    room.picture.mv('tempimage', err => {
        if (!err) {
          cloudinary.uploader.upload('tempimage', result => {
            console.log(result);
            room.picture = result.url;
            response();
          });
        }
      });
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
  
  checkDateTime(id, buildId, roomId, date, time){
    const room = this.getRoom(id, buildId, roomId);
    const classes = room.class;
    for (let schedClass of classes){
      if(schedClass.time === time && schedClass.day === date){
        return false;
      }
      else{
        return true
      }
    }
  }
};

module.exports = campusStore;