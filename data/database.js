const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connectToDatabase() {
  const client = await MongoClient.connect("mongodb://localhost:27017");
  database = client.db("online-shop");
}

function getDb() {
  if (!database) {
    throw new Error("You first need to connect!");
  }

  return database;
}

module.exports = {
  connectToDatabase,
  getDb,
};
