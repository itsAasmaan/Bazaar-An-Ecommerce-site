const expressSession = require("express-session");
const mongoDbStore = require("connect-mongodb-session");

const createSessionStore = () => {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: "mongodb://localhost:27017",
    databaseName: "online-shop",
    collection: "sessions",
  });

  return store;
};

const createSessionConfig = () => {
  return {
    secret: "AkashSingh",
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 31 * 24 * 60 * 60 * 1000,
    },
  };
};

module.exports = createSessionConfig;
