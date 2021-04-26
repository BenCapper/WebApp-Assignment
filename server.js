// Imports logger module


// use javascript in strict mode
"use strict";

// import all required modules
const express = require("express");
const logger = require('./utils/logger');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');

// initialise project
const app = express();

app.use(express.static("public"));

// static files output to public folder
app.use(bodyParser.urlencoded({ extended: false, }));
app.use(cookieParser());
app.use(fileUpload());

// use handlebars as view engine
app.engine('.hbs', exphbs({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    
    titleCapitals: function(string){
    return string[0].toUpperCase() + string.slice(1).toLowerCase();
  },
    
    populate: function(genre) {
      const genres = ["Classical", 'Rock', "Pop", "Disco", "Soul"]
      genres.splice(genres.indexOf(genre), 1)
      let options = ``
      for (let item of genres) {
        options+=`<option value ="${item}">${item}</option>`         
      }    
      return options      
    },
    
    formatDate: function(date, time) {
      let dateCreated = new Date(date);
      let day = dateCreated.getDay();
      let dateNum = dateCreated.getDate();
      let month = dateCreated.getMonth();
      let year = dateCreated.getFullYear();
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let monthname = months[month];
      return `${days[day]} ${monthname} ${dateNum}, ${year}`;
      },
  }
}));
app.set('view engine', '.hbs');

const routes = require('./routes');
app.use('/', routes);

// listen for requests :)
const listener = app.listen(process.env.PORT || 4000, function () {
  logger.info('Your app is listening on port ' + listener.address().port);
});
