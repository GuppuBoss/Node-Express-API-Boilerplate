const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
dotenv.config({ path: "./.env" });
require("./entities/auth/passport");

const config = require("./config");
const swaggerDocument = require("../src/config/swagger.json");
const { jwtAuthorize } = require("../src/middlewares/auth");
const helpers = require("./helpers");
const { routes, secureRoute } = require("./routes");
const pjson = require("../package.json");

const app = express();
const swaggerOptions = {
  explorer: true,
};
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);
if (config.ENVIORMENT !== "test" || config.ENVIORMENT !== "production") {
  app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

app.use(express.json());
// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());
// pass variables to all requests
app.use((req, res, next) => {
  console.log("Request -> ", req.body);
  res.locals.h = helpers;
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// routes
app.use("/api/v1", routes);
app.use("/api/v1", jwtAuthorize, secureRoute);

app.use(
  "/version",
  routes.get("/", function (req, res, next) {
    res.status(200).json({
      version: pjson.version,
    });
  })
);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(helpers.notFound);
// Otherwise this was a really bad error we didn't expect! Shoot eh
if (config.ENVIORMENT === "development") {
  /* Development Error Handler - Prints stack trace */
  app.use(helpers.developmentErrors);
}
// production error handler
app.use(helpers.productionErrors);
// Connect to our Database and handle any bad connections
mongoose.connect(
  config.MONGO_URI,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (!err)
      console.log("Successfully connected with Mongo", config.MONGO_URI);
  }
);

mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on("error", (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

const port = config.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is running on port ☛ ${server.address().port}`);
});

module.exports = server; // to import in testing
