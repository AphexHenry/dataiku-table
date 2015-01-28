
var fs = require("fs");
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var db = require('./libs/dbWrapper.js');
var arrayTool = require('./libs/arrayTool.js');

// Setup and configure Express http server. Expect a subfolder called "public" to be the web root.
var httpApp = express();
var webServer = require('http').Server(httpApp);

httpApp.use(express.static(__dirname + "/public/"));
httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json());

db.setup("us-census.db", function()
{
	httpApp.get('/', function(req, res)
	{
	  res.sendFile(__dirname + '/' + 'public/index.html');
	});

	httpApp.post('/getData', function(req, res) {
		var lColumnName = req.body.name;
		db.getColumnWithName(lColumnName, function(aData)
		{
			var rData = arrayTool.getProcessedArray(aData, lColumnName);
			console.log(rData);
			res.send(JSON.stringify(rData));
		});
	});

	httpApp.get('/getList', function(req, res)
	{
		db.getAllColumnNames(function(aData)
		{
			res.send(JSON.stringify(aData));
		});
	});
})

var port = Number(process.env.PORT || 3000);
webServer.listen(port, function(){
  console.log('listening on *:' + port);
});

