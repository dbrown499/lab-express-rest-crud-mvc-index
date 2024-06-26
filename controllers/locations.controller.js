// import express
const express = require('express');
// create an istance of our express router 
const locations = express.Router();
// import the models info being used
const locationsData = require('../models/location.model');
const personsData = require('../models/person.model')

// import the valisation function AKA MIDDLEWARE
const { checkForNameKey } = require('../validations/locationsValidation');

// create route that at goes to the corrct data file
// Index route
locations.get('/', (req, res) => {
    res.json(locationsData);
});

// show route 
locations.get('/:persons', (req, res) => {
    locationsData.map(locate => {
        locate["people"] = [];
        personsData.map(person => {
            if (locate.zip === person.mainLocation) {
                locate["people"].push(person);
                // console.log(person)
            }
        });
    });

    res.json(locationsData);
});

// show route 
// locations.get('/:arrayIndex', (req, res) => {
//     const { arrayIndex } = req.params;
//     if (locationsData[arrayIndex]) {
//         res.json(locationsData[arrayIndex]);
//     } else {
//         res.json({ error: "Location not Found" });
//     }

//     res.json(locationsData);
// });

// create route
locations.post('/', checkForNameKey, (req, res)=>{
    locationsData.push(req.body);
    res.json(locationsData[locationsData.length-1]);
});






//export router
module.exports = locations;