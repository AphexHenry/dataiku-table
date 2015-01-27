
var fs = require("fs");
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var db = require('dbWrapper');
var arrayTool = require('arrayTool');

// Setup and configure Express http server. Expect a subfolder called "public" to be the web root.
var httpApp = express();
var webServer = require('http').Server(httpApp);

httpApp.use(express.static(__dirname + "/public/"));
httpApp.use(bodyParser.urlencoded({ extended: true }));
httpApp.use(bodyParser.json());


httpApp.get('/', function(req, res)
{
  res.sendFile(__dirname + '/' + 'public/index.html');
});

httpApp.post('/getData', function(req, res) {
	db.getColumnWithName(req.body.name, function(err, aData)
	{
		if(err)
		{
			// manage this later.
			res.send("error");
		}
		else
		{
			res.send(JSON.stringify(arrayTool.getProcessedArray());
		}
	});
}

var port = Number(process.env.PORT || 3000);
webServer.listen(port, function(){
  console.log('listening on *:' + port);
});