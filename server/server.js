const express = require("express");
const routes = require("./controllers");
const path = require("path");
var cors = require("cors");

// Import the connection object
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

// Add specifics to cors
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
