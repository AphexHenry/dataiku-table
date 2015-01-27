var expect = require("chai").expect;
var db = require("../lib/dbWrapper.js");

describe("dbWrapper", function(){
    describe("#setup()", function(){
       it("should return that db us-census.db exist", function(done){
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
});