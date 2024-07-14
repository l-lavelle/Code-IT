const express = require("express");
const routes = require("./controllers");
const path = require("path");
var cors = require("cors");

// Import the connection object
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

let corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://lostack-code-it-eca13016c372.herokuapp.com",
  ],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(routes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log("Server listening on: http://localhost:" + PORT)
  );
});
