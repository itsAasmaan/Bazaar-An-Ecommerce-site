const path = require("path");

const express = require("express");
const csrf = require("csurf");
const expressSession = require("express-session");

const db = require("./data/database");
const createSessionConfig = require("./config/session");
const addCsrfTokenMiddleware = require("./middlewares/csrfToken");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const authStatusMiddleware = require("./middlewares/checkAuth");
const protectRoutesMiddleware = require("./middlewares/protectRoutes");
const updateCartPricesMiddleware = require("./middlewares/updateCartPrices");
const notFoundMiddleware = require("./middlewares/notFound");
const cartMiddleware = require("./middlewares/cart");
const authRoutes = require("./routes/auth.routes");
const baseRoutes = require("./routes/base.routes");
const productsRoutes = require("./routes/products.routes");
const adminRoutes = require("./routes/admin.routes");
const cartRoutes = require("./routes/cart.routes");
const ordersRoutes = require("./routes/orders.routes");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const session = createSessionConfig();

app.use(expressSession(session));
app.use(csrf());

app.use(cartMiddleware);
app.use(updateCartPricesMiddleware);

app.use(addCsrfTokenMiddleware);
app.use(authStatusMiddleware);

app.use(baseRoutes);
app.use(authRoutes);
app.use(productsRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", protectRoutesMiddleware, ordersRoutes);
app.use("/admin", protectRoutesMiddleware, adminRoutes);

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

db.connectToDatabase()
  .then(function () {
    app.listen(3000);
  })
  .catch(function (error) {
    console.log("Failed to connect to database!");
    console.log(error);
  });
