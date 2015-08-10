var chai = require('chai');
var request = require('supertest');
var express = require('express');
var expect = chai.expect;
var Sequelize = require('sequelize');
var WikiArticle = require('../server/models/wikiArticle.js');


describe('Wiki db load/store function', function() {

  var testArticle = {
    title: 'David',
    content: 'Pinhead'
  };

  beforeEach('remove test Article from database', function() {
    WikiArticle.destroy({
      where: {
        title: testArticle.title
      }
    });
  })

  after('remove test Article from database', function() {
    WikiArticle.destroy({
      where: {
        title: testArticle.title
      }
    });
  })

  it('should return Article if Article exists and no new data added to database', function(done){
    //add the Articule to database
    return WikiArticle.create({title: testArticle.title, content: testArticle.content})
    .then(function(){
      //check the total number of data in database
      return WikiArticle.findAll()
      .then(function(result){
        console.log('Before result.length', result.length);
        var datacount = result.length;
        request('http://localhost:8000')
        .get('/wiki/' + testArticle.title)
        .end(function (err, res) {
         expect(res.status).to.equal(200);
          // this.timeout(500)
          //check the total number of data in database 
          return WikiArticle.findAll()
          .then(function(result){
            console.log('After result.length', result.length)
            expect(result.length).to.equal(datacount);
            done();
          });
        });
      });
    });
  });
  this.slow(10000);
  it('Should find Article in the database after the get request if Article didn\'t exist in database before the request', function(done){
    //sign up our test user
      request('http://localhost:8000')
        .get('/wiki/'+ testArticle.title)
        .expect(200, function(err){
          // console.log(err);
        })
        .end(function (err, res) {
         // console.log('err:', err);
         // console.log('res:', res);
//          expect(res.status).to.equal(200);
           // setTimeout(function(){
            console.log('yes!')
            // this.timeout(500)
            return WikiArticle.findOne({
              where: {
                title: testArticle.title
              }
            })
            .then(function(result){
              // console.log('result:', result)
              expect(result).to.not.equal('null');
              done();
            });
           // },100);
           // done();
        });
  });
});



