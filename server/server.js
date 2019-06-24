const Express = require("express");
const BodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;
const next = require('next')
require('dotenv').config()
const dev = process.env.NODE_ENV !== 'production'
const app = next({dev})
const port = process.env.PORT || 3000;

const handle = app.getRequestHandler()

const CONNECTION_URL = process.env.CONNECTION_URL
const DATABASE_NAME = "stocksDB";
app.prepare()
.then(() => {
  const server = Express();
  server.use(BodyParser.json());
  server.use(BodyParser.urlencoded({ extended: true }));

  var database, collection;

  server.listen(port, () => {
      MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
          if(error) {
              throw error;
          }
          database = client.db(DATABASE_NAME);
          collection = database.collection("transactions");
          pricesCollection = database.collection("stock-prices");
          server.get("/api/transactions", (request, response) => {
            collection.find({}).toArray((error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
          });

          server.delete("/api/transaction/:id", (request, response) => {
            collection.remove({ "id": request.params.id }, (error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
          });
          server.put("/api/transaction/:id", (request, response) => {
            collection.findOneAndUpdate(
              { id: request.params.id },
              { $set: request.body },
              (err, transaction) => {
                if (err) {
                  response.status(500).send(err);
                }
                response.status(200).json(transaction);
              }
            );
          });

          server.post("/api/transaction", (request, response) => {
              collection.insert(request.body, (error, result) => {
                  if(error) {
                      return response.status(500).send(error);
                  }
                  response.send(result.result);
              });
          });

          server.post("/api/prices", (request, response) => {
              pricesCollection.insert(request.body, (error, result) => {
                  if(error) {
                      // return response.status(500).send(error);
                  }
                  response.send(result.result);
              });
          });

          server.put("/api/prices/:stock", (request, response) => {

            pricesCollection.findOneAndUpdate(
              { stock: request.params.stock },
              { $set: request.body },
              { upsert: true },
              (err, stock) => {
                if (err) {
                  response.status(500).send(err);
                }
                response.status(200).json(stock);
              }
            );
          });

          server.get("/api/prices", (request, response) => {
            pricesCollection.find({}).toArray((error, result) => {
                if(error) {
                    return response.status(500).send(error);
                }
                response.send(result);
            });
          });
          server.get('*', (req,res) => {
              return handle(req,res) // for all the react stuff
          })
          console.log("Connected to `" + DATABASE_NAME + "`!");
      });
  });

})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
