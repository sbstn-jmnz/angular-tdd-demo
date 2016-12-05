var cors = require('cors');
var express = require('express');

var app = express();
app.use(cors());
var contacts = [{ name: "Wilfred"}, { name: "Robert"}];

app.get('/contacts', function(req, res){
  res.status(200).json(contacts);
});

app.listen('9001');
