const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.static("public"));
app.listen(process.env.PORT || 8080);

app.use(morgan('common'));

module.exports = { app };