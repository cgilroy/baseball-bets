const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
// const ObjectId = require("mongodb").ObjectID;
require('dotenv').config()
// const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 4000;
const path = require('path');

const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = "betsDB";

const server = Express();
server.use(BodyParser.json());
server.use(BodyParser.urlencoded({ extended: true }));

var database, collection;

server.use(Express.static(path.join(__dirname, 'build')));

server.listen(port, () => {
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("gamesData");

        server.get("/api/games", (request, response) => {
          collection.find({}).toArray((error, result) => {
              if(error) {
                  return response.status(500).send(error);
              }
              response.send(result);
          });
        });

        server.get("/api/games/:date", (request, response) => {
          // console.log(request.params.date,'date')
          collection.find({ date: request.params.date }).toArray((error, result) => {
            if (error) {
              return response.status(500).send(error);
            }
            response.send(result);
          });
        });
        
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});


