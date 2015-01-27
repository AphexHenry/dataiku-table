var expect = require("chai").expect;
var db = require("../libs/dbWrapper.js");
var chai = require("chai");
chai.should();
chai.use(require('chai-things'));

describe("dbWrapper", function(){
    describe("#setup()", function(){
       it("should return that valid db exist", function(done){
           var results = db.setup("us-census.db", function(err)
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
              console.log(data);
              data.should.include.something.that.deep.equals({name:'occupation code'});
              data.should.not.include.something.that.deep.equals({name:'age'});
              done();
            }); 
       });
   });
});