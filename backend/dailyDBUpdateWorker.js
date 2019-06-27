const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()
const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = "betsDB";
const moment = require('moment')
const fetchFunction = require('./FetchData.js')

var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    database = client.db(DATABASE_NAME);
    collection = database.collection("gamesData");

    fetchFunction.fetchTeamData(moment().format('L'),(data)=>  {
        // console.log(data)
        if (data.length !== 0) {
          let dayData = {
            gamesData: data,
            date: moment().format('L')
          }

          try {
              collection.insertOne(dayData);
          } catch(e) {
              console.log(e)
          }
        }
    })

    console.log("Connected to `" + DATABASE_NAME + "`!");
});
