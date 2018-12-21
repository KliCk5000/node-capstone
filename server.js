const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(express.static("public"));
app.use(morgan('common'));

if (require.main === module) {
  app.listen(process.env.PORT || 8080, function() {
    console.info(`App listening on ${this.address().port}`);
  });
}

module.exports = { app };