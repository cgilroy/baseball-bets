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
            date: currentDate,
            created: moment().format('lll')
          }

          try {
            collection.findOneAndUpdate(
                { date: dayData.date },
                { $setOnInsert: dayData },
                { upsert: true }
                ).then(result => {
                  // console.log(result,'result')
                  console.log("Updated Team Stats")
                    // updating starting pitchers
                    collection.find({ date: currentDate }).toArray()
                    .then(result => {
                        // console.log(result,'result')
                        if (result.length !== 0) {
                            fetchFunction.fetchStartingPitcherStats(currentDate,result[0].allData,(data)=>  {
                                // console.log('pitcheroutput',data)
                                if (data.length !== 0) {
                                  try {
                                    collection.findOneAndUpdate(
                                        { date: currentDate },
                                        { $set: { "allData.pitcherData": { "data": data, "lastUpdate": moment().format('lll') } } },
                                        { upsert: true }
                                        ).then(result => console.log("Updated Pitchers"))
                                  } catch(e) {
                                      console.log(e)
                                  }
                                }
                            })
                        }
                    })
                  })
          } catch(e) {
              console.log(e)
          }
        }
    })

    console.log("Connected to `" + DATABASE_NAME + "`!");
});
