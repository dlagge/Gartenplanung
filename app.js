const express = require('express');
const app = express();

const cors = require('cors');

const dovenv = require('dotenv');
dovenv.config();

const dbService = require('./db_conn');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));


// create
app.post('/insert', (request, response) => {

});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    
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

// insert
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