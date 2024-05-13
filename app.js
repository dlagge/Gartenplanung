const express = require('express');
const app = express();

const cors = require('cors');

const dovenv = require('dotenv');
dovenv.config();

const dbService = require('./db_conn');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// read
app.get('/getAllAvailablePlants', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllAvailablePlants();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

app.get('/getAllPositionedPlants', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllPositionedPlants();
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// search
app.get('/getSearchResult/:searchTerm', (request, response) => {
    const { searchTerm } = request.params;

    const db = dbService.getDbServiceInstance();

    const result = db.searchData(searchTerm);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// create
app.post("/addPlantArray", (request, response) => {
    const { plant_link, x_position, y_position, z_position } = request.body;
    const db = dbService.getDbServiceInstance();
    
    const result = db.insertPlantPosition(plant_link, x_position, y_position, z_position);

    result
    .then(data => response.json({ data: data}))
    .catch(err => console.log(err));
});

// update


// delete


app.listen(process.env.PORT, () => console.log('app is running'));