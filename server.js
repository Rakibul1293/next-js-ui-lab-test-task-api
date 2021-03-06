const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const infoRoute = require("./routes/infoRoute");

mongoose.connect("mongodb+srv://dbUser:YN8cDaSJksn8nro6@tmcluster.wbdpu.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, () => {
    console.log("DB Connected .....");
})

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
    res.json({
        message: "Hello World"
    })
})

app.use("/api", infoRoute);

const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
    console.log(`App is running on port: 9001`);
})
