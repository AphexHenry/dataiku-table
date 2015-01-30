
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

// setup the db
db.setup("us-census.db", function()
{
	httpApp.get('/', function(req, res)
	{
	  res.sendFile(__dirname + '/' + 'public/index.html');
	});

	httpApp.post('/getData', function(req, res) {
		db.getColumnWithName(req.body.name, function(aData)
		{
			arrayTool.getProcessedArray(aData, function(aArrayOut, aTotalCount)
			{
				var lOutObj = {totalLength:aTotalCount, array:aArrayOut};
				res.send(JSON.stringify(lOutObj));		
			});
			
		});
	});

	httpApp.get('/getList', function(req, res)
	{
		db.getAllColumnNames(function(aData)
		{
			aData.sort(function(a, b){
			    if(a.name < b.name) return -1;
			    if(a.name > b.name) return 1;
			    return 0;
			});

			res.send(JSON.stringify(aData));
		});
	});
})

var port = Number(process.env.PORT || 3000);
webServer.listen(port, function(){
  console.log('listening on *:' + port);
});

