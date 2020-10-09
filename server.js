const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
var path= require("path");

const PORT = 8181 || process.env.PORT

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/deep-thoughts',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  }
);
;

// routes
app.use(require("./routes/api"));
if (process.env.NODE_ENV === "production"{
  app.use(express.static("build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "build", "index.html"));
  });
}
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});