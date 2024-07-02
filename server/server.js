require("dotenv").config();
const path = require("path");
const express = require("express");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const models = require("./models");
const hbs = exphbs.create();
const fetch = require("node-fetch");
