'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();


// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const campus = require('./controllers/campus.js');
const building = require('./controllers/building.js');
const room = require('./controllers/room.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/about', about.index);
router.get('/dashboard', dashboard.index);
router.get('/dashboard/deleteCampus/:id', dashboard.deleteCampus);
router.get('/about/deleteComment/:id/deleteUser/:userid', about.deleteComment);
router.post('/about/addComments', about.addComments);
router.post('/dashboard/addCampus', dashboard.addCampus);

router.get('/campus/:id', campus.index);
router.get('/campus/:id/deleteBuilding/:buildingid', campus.deleteBuilding);
router.post('/campus/:id/addBuilding', campus.addBuilding);

router.get('/building/:id/build/:buildingid', building.index);
router.get('/building/:id/build/:buildingid/deleteRoom/:roomid', building.deleteRoom);
router.post('/building/:id/build/:buildingid/addRoom', building.addRoom);

router.get('/room/:id/build/:buildingid/getRoom/:roomid', room.index);
router.get('/room/:id/build/:buildingid/getRoom/:roomid/getClass/:classid', room.index);
router.get('/room/:id/build/:buildingid/getRoom/:roomid/addClass', room.index);
router.get('/room/:id/build/:buildingid/getRoom/:roomid/getClass/:classid/updateClass/:classid', room.updateClass);
router.get('/room/:id/build/:buildingid/getRoom/:roomid/deleteClass/:classid', room.deleteClass);
router.post('/room/:id/build/:buildingid/getRoom/:roomid/addClass', room.addClass);
router.post('/room/:id/build/:buildingid/getRoom/:roomid/getClass/:classid/updateClass/:classid', room.updateClass);






// export router module
module.exports = router;
