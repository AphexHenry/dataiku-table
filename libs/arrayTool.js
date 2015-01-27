
/*
 * contain array management functions.
 */

exports.compactArray = function(aArray, aColumnName)
{
	// we create an object and not an array for easier access to its member.
	var temp = {};
	var lTempSize = 0;
	for(var i in aArray)
	{
		var lOutIndex = aArray[i][aColumnName];
		if(temp[lOutIndex]== null)
		{
			temp[aArray[i][aColumnName]]  = {age:0, count:0};
		}

		temp[aArray[i][aColumnName]].age += aArray[i].age;
		temp[aArray[i][aColumnName]].count++;
		lTempSize++;
	}
	return temp;
}

exports.makeCompactObjectIntoSortedArray = function(aObject)
{
	var outAll = [];
	// transform onject into an array so we can sort it.
	for(var i in aObject)
	{
		outAll.push({name:i, age:aObject[i].age, count:aObject[i].count});

	}

	function compare(a,b) {
	  if (a.count > b.count)
	     return -1;
	  if (a.count < b.count)
	    return 1;
	  return 0;
	}

	outAll.sort(compare);
	return outAll;
}

exports.getProcessedArray = function(aArray)
{
	return this.makeCompactObjectIntoSortedArray(this.compactArray(aArray));
}