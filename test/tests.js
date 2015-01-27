var expect = require("chai").expect;
var db = require("../libs/dbWrapper.js");
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
       it("should array of objects with fields 'age', 'field1'", function(done){
           db.getColumnWithName("field1", function(data)
            {
              console.log(data);
              expect(data[0].age).to.exist();
              expect(data[0]['field1']).to.exist();
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