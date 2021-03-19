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
  
  getBuilding(id, buildingId) {
    const campus = this.getCampus(id);
    const building = campus.building;
    const foundBuild = building.find(buildings => buildings.id === buildingId);
    return foundBuild;
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
  
  addRoom(id, buildingId, room) {
    const building = this.getBuilding(id, buildingId);
    building.room.push(room);
  },
};

module.exports = campusStore;