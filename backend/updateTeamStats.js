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
    let currentDate = moment().format('YYYY-MM-DD')
    database = client.db(DATABASE_NAME);
    collection = database.collection("gamesData");

    fetchFunction.fetchTeamData(currentDate,(data)=>  {
        // console.log(data)
        if (data.length !== 0) {
          let dayData = {
            allData: { "teamStats": data },
            date: currentDate
          }

          try {
            collection.findOneAndUpdate(
                { date: dayData.date },
                { $set: dayData },
                { upsert: true }
                ).then(result => console.log("Updated Team Stats"))
          } catch(e) {
              console.log(e)
          }
        }
    })

    console.log("Connected to `" + DATABASE_NAME + "`!");
});
