// Use a different DB for tests
var app = require("../app");

var db = require('mongoose');
var dbtools = require("./fixtures/dbtools");
var should = require("should");require("should-http");

describe("api.documents", function(){
  var request= require('supertest');
  var _=require('underscore');
  

  before(function(done){
    done()
  });

  after(function(done){
    dbtools.clean(function(){    
      done();
    });    
  });

  it.skip('GET /v1/documents/sku/12345 should return 200',function(done){
    request(app)
      .get('/v1/documents/sku/12345')
      .end(function(err, res){
        res.should.have.status(200);
        res.body.length.should.equal(1)
        done();
      });
  });

  it.skip('GET /v1/documents should return 401',function(done){
    request(app)
      .get('/v1/documents')
      .expect(401,done);
  });

  it.skip('POST /v1/documents should return 401 for anonymous',function(done){
    var doc=_.extend({},data.Documents[0]);
    request(app)
      .post('/v1/documents')
      .set('Content-Type','application/json')
      .send(doc)
      .expect(401,done);
  });

  
});

