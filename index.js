var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var path = require('path');
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

app.get('/', function (req, res) {
  res.cookie("status", "logged in")
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/', function (req, res) {
  var cookie = req.cookies;
  console.log(cookie)
  console.log(req.body)
  if (cookie.status === "logged in" && cookie._csrf && req.body._csrf && cookie._csrf === req.body._csrf) {
    console.log(`deleted ${req.body.delete}`)
    res.send(`deleted ${req.body.delete}`);
  } else {
    console.log('unauthorized')
    res.send('unauthorized');
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

//var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
//xmlhttp.open("POST", "http://127.0.0.1:3000/");
//xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//xmlhttp.withCredentials = true;
//xmlhttp.send("delete=Tom's account");