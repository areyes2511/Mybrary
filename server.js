if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require("./routes/index");

app.use(indexRouter);

//Set view engine
app.set("view engine", "ejs");
//Set view dir path
app.set("views", __dirname + "/views");
//Set layout dir path
app.set("layout", "layouts/layout");
//Tell express we want to use exressLayouts
app.use(expressLayouts);
//Tell express where puglic files will be. CSS, JS, IMG etc
app.use(express.static("public"));

const mongoose = require("mongoose");
//Connect to mogoose DB server
mongoose.connect(process.env.DATABASE_URL, {
    //(property) ConnectionOptions.useNewUrlParser?: boolean
    //Flag for using new URL string parser instead of current (deprecated) one
    useNewUrlParser: true,
    //Enables the new unified topology layer
    //useUnifiedTopology: true
});

const db = mongoose.connection;
//Check for connection error
db.on("error", error => console.error(error));

db.once("open", () => console.log("Connected to Mongoose"));


app.listen(process.env.PORT || 3000);