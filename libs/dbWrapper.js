
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
		db = new sqlite3.Database(aName);
		db.serialize(function() {
			// remove every invalid row.
			db.run("DELETE FROM census_learn_sql WHERE age IS NULL;")
			aCallback(null);
		});
	}
}

exports.getAllColumnNames = function(aCallback)
{
  	db.all("PRAGMA table_info(census_learn_sql);", function(err, data) 
  	{
	  	var rTable = [];
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
	 db.all("SELECT `" + aName + "` AS 'name' , age FROM census_learn_sql", function(err, data) {
	 	aCallback(data);
	});
}