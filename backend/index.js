const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3001;
const home = require("./routes/home");

app.use(cors());
app.use("/home", home);
app.listen(port, function () {
    console.log("Running on " + port);
});

module.exports = app