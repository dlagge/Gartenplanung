const mysql = require('mysql2');

const dotenv = require('dotenv');
let instance = null;
dotenv.config();

// create a new MySQL connection
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.log(err.message);
  }
});

class DbService {
  static getDbServiceInstance() {
    return instance ? instance : new DbService();
  }

  async getAllAvailablePlants() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM gardenapp.availableplants;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllPositionedPlants() {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM gardenapp.plantpositions;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  //http://localhost:5000/getSearchResult/karotte
  async searchData(searchTerm) {
    try {
      const response = await new Promise((resolve, reject) => {
        const query = "SELECT * FROM gardenapp.availableplants WHERE plant_link LIKE ? OR plant_name LIKE ? OR plant_tags LIKE ?;";
        const searchValue = `%${searchTerm}%`;

        connection.query(query, [searchValue, searchValue, searchValue], (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        })
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  /*
  http://localhost:5000/addPlantArray
  {
    "plant_link": "gruenkohl",
    "x_position" : 1.2,
    "y_position" : 2.2,
    "z_position" : 3
  }
  */
  async insertPlantPosition(plant_link, x_position, y_position, z_position) {
    try {
      const insertId = await new Promise((resolve, reject) => {
        const query = "INSERT INTO gardenapp.plantpositions(plant_link,x_position,y_position,z_position) VALUES (?,?,?,?);";

        connection.query(query, [plant_link, x_position, y_position, z_position], (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.insertId);
        })
      });
      return {
        id: insertId,
        plant_link: plant_link,
        x_position: x_position,
        y_position: y_position,
        z_position: z_position,
      };
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = DbService;

