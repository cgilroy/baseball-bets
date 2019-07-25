const MongoClient = require("mongodb").MongoClient;
require('dotenv').config()
const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = "betsDB";
const moment = require('moment')
const momentTZ = require('moment-timezone')
const fetchFunction = require('./FetchData.js')

var database, collection;

MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }
    let currentDate = momentTZ.tz('America/Edmonton').format('YYYY-MM-DD')
    let updateTime = momentTZ("03:15", "HH:mm").tz("America/Edmonton")
    database = client.db(DATABASE_NAME);
    collection = database.collection("gamesData");

    if (momentTZ.tz('America/Edmonton').isSameOrAfter(updateTime)) {
      fetchFunction.fetchTeamData(currentDate,(data)=>  {
        // console.log(data)
        if (data.length !== 0) {
          let dayData = {
            allData: { "teamStats": data },
            date: currentDate,
            created: momentTZ.tz('America/Edmonton').format('MMM DD, YYYY h:mm A z')
          }

          try {
            collection.findOneAndUpdate(
                { date: dayData.date },
                { $setOnInsert: {
                    "date": currentDate,
                    "allData.teamStats": data,
                    "created": momentTZ.tz('America/Edmonton').format('MMM DD, YYYY h:mm A z')
                  }
                },
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
                                        { $set: { "allData.pitcherData": { "data": data, "lastUpdate": momentTZ.tz('America/Edmonton').format('MMM DD, YYYY h:mm A z') } } },
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
    }

    console.log("Connected to `" + DATABASE_NAME + "`!");
});
