// Use a different DB for tests
var app = require("../app");

var db = require('mongoose');
var dbtools = require("./fixtures/dbtools");
var should = require("should");


describe("system", function(){

  before(function(done){
    done()
  });
  describe("tools", function(){
    it("Sort array of ['2012.12','2012.13']",function (done) {
      var a=[ 
        '2014.11','2014.12','2015.1','2015.2','2015.7','2015.8','2015.9','2015.10','2015.11'
        ].sortSeparatedAlphaNum(),
          b=[ '2014.11','2014.12','2015.1','2015.2','2015.7','2015.8','2015.9','2015.10','2015.11'];

      a.should.eql(b);
      done()
    })

    it("Crypt string", function(done){
        var crypt="Hello World".crypt()
            done()
    });

    it("DeCrypt string", function(done){
        "Hello World".crypt().decrypt().should.equal("Hello World")
        done()
    });


    it("DeCrypt string without padding", function(done){
        "6faad2f00aa175cafb0e0cb425f3ba9b7433379b88a443acd675a13b20db6642".decrypt().should.equal("ch_16aUeYBTMLb4og7PSbvQwVpl")
        done()
    });


    it("DeCrypt string with padding in code", function(done){
        "ch_16aUeYBTMLb4og7PSbvQwVpl".crypt().decrypt().should.equal("ch_16aUeYBTMLb4og7PSbvQwVpl")
        done()
    });

    it("crypt already crypted string", function(done){
        "olivier".crypt().crypt().crypt().decrypt().should.equal("olivier")
        done()
    });



  });

  describe("Administration", function(){
  
    it("Get default stored config",function(done) {
        db.model('Config').getMain(function(e,c) {
            should.not.exist(e);
            should.exist(c);
            should.exist(c.messages);
            should.exist(c.maintenance);
            done()
        })
    })

    it("Save default stored config",function(done) {
        var c={
            messages:[{content:'hello',active:true,updated:Date.now()}],
            noshipping:[{reason:'paques',when:Date.now()}],
            other:'not possible'
        }
        db.model('Config').saveMain(c,function(e,c) {
            should.not.exist(e);
            should.exist(c);

            done()
        })
    })

  });
  
 
  describe("System notifications", function(){
    it("Basic testing of the Bus", function(done){
        var bus=require('../app/bus'), em=0;
        bus.on('test',function(a,cb){
            cb(0,a+'-1')
        })
        bus.on('test',function(a,cb){
            cb(0,a+'-2')
        })

        //
        // this emiter will receive multiple callback 
        // and this is an issue because only one done is permitted
        bus.emit('test','msg',function(out){

            //console.log(out,bus.listeners('test').length)            
            if(++em===2)done()
        })
    });

    

  });
    


});

