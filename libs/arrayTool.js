
/*
 * contain array management functions.
 */

exports.compactArray = function(aArray)
{
	// we create an object and not an array for easier access to its member.
	var temp = {};
	var lTempSize = 0;
	var lColumnName = "name";
	for(var i in aArray)
	{
		var lOutIndex = aArray[i][lColumnName];
		if(temp[lOutIndex]== null)
		{
			temp[aArray[i][lColumnName]]  = {age:0, count:0};
		}

		temp[aArray[i][lColumnName]].age += aArray[i].age;
		temp[aArray[i][lColumnName]].count++;
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

exports.cropAndRefine = function(aArray, aTotalRowCount)
{
	var out = [];
	for(i = 0; i < aArray.length; i++ )
	{
		var lPercent = this.smartCropFloat(100 * aArray[i].count / aTotalRowCount);

		out.push({name:aArray[i].name, age:Math.round(aArray[i].age / aArray[i].count), count:lPercent});
		// we only show the 100 first results.
		if(out.length >= 100)
		{
			break;
		}
	}
	return out;
}

exports.smartCropFloat = function(aValue)
{
	var lMult = 1;
	if(aValue > 0)
	{
		var lFloatPos = Math.floor(Math.log(aValue) /  Math.LN10);
		if(lFloatPos < 0)
		{
			lMult = Math.pow(10, -lFloatPos);
		}
	}
	return Math.round(lMult * aValue) / lMult;
}

exports.getProcessedArray = function(aArray, aCallback)
{
	var lCompactArray = this.makeCompactObjectIntoSortedArray(this.compactArray(aArray));
	var rArray = this.cropAndRefine(lCompactArray, aArray.length);
	aCallback(rArray, lCompactArray.length);
}