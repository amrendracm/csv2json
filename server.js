 /* csv to json */

const express = require("express"),
app = express(),
upload = require("express-fileupload"),
csvtojson = require("csvtojson");

let csvData = "test";
app.use(upload());
app.use(function(req, res, next) {
res.setHeader("Access-Control-Allow-Origin", "*");
res.setHeader(
  "Access-Control-Allow-Headers",
  "Origin, X-Requested-With, Content-Type, Accept"
);
res.setHeader(
  "Access-Control-Allow-Methods",
  "POST, GET, OPTIONS"
);
next();
});
app.get("/", (req, res, next) => {
res.sendFile(__dirname + "/index.html");
});

app.post("/file", (req, res) => {
csvData = req.files.csvfile.data.toString('utf8');
return csvtojson().fromString(csvData).then(json => {return res.status(201).json({csv:csvData, json:json})})
});

app.listen(process.env.PORT || 4000, function(){
console.log('Your node js server is running');
});