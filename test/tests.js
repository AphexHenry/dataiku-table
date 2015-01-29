var expect = require("chai").expect;
var db = require("../libs/dbWrapper.js");
var arrayTool = require("../libs/arrayTool.js");
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("dbWrapper", function(){
    describe("#setup()", function(){
       it("should return that valid db exist", function(done){
           var results = db.setup("test/us-censusTest.db", function(err)
            {
              expect(err).to.equal(null);
              done();
            });
       });
        it("should return that db Fakeus-census.db doesn not exist", function(done){
           var results = db.setup("Fakeus-census.db", function(err)
            {
              expect(err).to.not.equal(null);
              done();
            });
       });
   });

    describe("#getAllColumnNames()", function(){
       it("should return names of columns that are not 'age'", function(done){
           db.getAllColumnNames(function(data)
            {
              data.should.include.something.that.deep.equals({name:'field1'});
              data.should.not.include.something.that.deep.equals({name:'age'});
              done();
            }); 
       });
   });

    describe("#getColumnWithName()", function(){
       it("should array of objects with fields 'age', 'name'", function(done){
           db.getColumnWithName("field1", function(data)
            {
              expect(data[0].age).to.exist();
              expect(data[0].name).to.exist();
              done();
            });
       });

        it("should have as many row as the db", function(done){
           db.getColumnWithName("field1", function(data)
            {
              data.should.have.length(3);
              done();
            });
       });
   });
});

describe("arrayTool", function(){

  describe('#compactArray', function()
  {
    var lArrayIn = [{name:'field1', age:10}, {name:'field2', age:10}, {name:'field1', age:20}];
    var larrayOut = arrayTool.compactArray(lArrayIn);
    it("should reduce the size if a fiels appear more than once", function(){
      var lCount = 0;
      for(var i in larrayOut)
      {
        lCount++;
      }
      expect(lCount).to.equal(2);
    });

    it("should merge 2 same fields by adding the age", function(){
      var lCount = 0;
      expect(larrayOut.field1.age).to.equal(30);
    });

    it("should count the number of iteration", function(){
      var lCount = 0;
      expect(larrayOut.field1.count).to.equal(2);
      expect(larrayOut.field2.count).to.equal(1);
    });
  });

  describe('#makeCompactObjectIntoSortedArray', function()
  {
    var lArrayIn = {field1: {count: 3, age:10}, field2: {count: 1, age:30}, field3: {count: 33, age:76}};
    var larrayOut = arrayTool.makeCompactObjectIntoSortedArray(lArrayIn);

    it("should make an array", function(){
      larrayOut.should.not.have.length(0);    
    });

    it("should sort array by count.", function(){
      expect(larrayOut[2].count).to.equal(1);
      expect(larrayOut[0].count).to.equal(33);
    });

  });

  describe('#cropAndRefine', function()
  {
    var lArrayIn = [];
    for(var i = 0; i < 200; i++)
    {
      lArrayIn.push({name:'field', age:200, count:4});
    }

    var larrayOut = arrayTool.cropAndRefine(lArrayIn, 800);
    it("should have length of max 100", function(){
      expect(larrayOut.length > 100).to.be.false;  
    });

    it("make average of ages.", function(){
      expect(larrayOut[0].age).to.equal(50);  
    });
  });

  describe('#smartCropFloat', function()
  {
    it("should crop float after the first number if under 0", function(){
      expect(arrayTool.smartCropFloat(10.1)).to.equal(10);
      expect(arrayTool.smartCropFloat(10)).to.equal(10);
      expect(arrayTool.smartCropFloat(0.00108)).to.equal(0.001);
    });
  });
});