const app = require('express')();
require('dotenv').config();
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const mongourl = process.env.db || "mongodb://127.0.0.1:27017/chatApp"
const UserRouter= require("./routes/UserRoutes.js");
const ChatRouter= require("./routes/ChatRoutes.js");



mongoose.connect(mongourl).then(()=> {
    console.log("mongo connected");
})

app.use(bodyParser.json())

app.use("/user",UserRouter);
app.use("/chat",ChatRouter);

app.listen(port,()=> {
    console.log("app running on port " + port);
})