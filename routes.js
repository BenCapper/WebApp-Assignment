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

// connect routes to controllers
router.get('/', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);
router.get('/campus/:id', campus.index);
router.get('/building/:id', building.index);
router.post('/campus/:id/addBuilding', campus.addBuilding);
router.post('/building/:id/addRoom', building.addRoom);
router.post('/dashboard/addCampus', dashboard.addCampus);


// export router module
module.exports = router;