'use strict';


const app = require('../../../server');
const request = require('supertest').agent(app.listen());

const expect = require('chai').expect;
const should = require('should');


//describe('GET /mediaDoc', function() {
//    it('should respond with 200 type Array', function(done) {
//        request
//            .get('/mediaDoc')
//            .expect(200, function(err, res) {
//                expect(Array.isArray(res.body.payload)).to.be.true;
//                done();
//            });
//    });
//});