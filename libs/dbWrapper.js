
var fs = require("fs");
var sqlite3 = require("sqlite3").verbose();
var db;
exports.setup = function(aName, aCallback)
{
	var exists = fs.existsSync(aName);
	if(!exists)
	{
		aCallback("no such file");
	}
	else
	{
		aCallback(null);
		db = new sqlite3.Database(aName);
	}
}

exports.getAllColumnNames = function(aCallback)
{
  	db.all("PRAGMA table_info(census_learn_sql);", function(err, data) 
  	{
	  	var rTable = [];
	  	console.log(err);
	  	for(var field in data)
	  	{
	  		if(data[field].name != 'age')
	  		{
	  			rTable.push({name:data[field].name});
	  		}
	  	}
	  	aCallback(rTable);
	 });
}

exports.getColumnWithName = function(aName, aCallback)
{
	 db.all("SELECT `" + aName + "` , age FROM census_learn_sql ORDER BY age", function(err, data) {
	 	aCallback(data);
	});
}