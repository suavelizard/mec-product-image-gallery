const common = require('../api/common')
const nock = require('nock')
const httpMocks = require('node-mocks-http')
describe("Common response handlers", function() {
    describe("handleError()", function() {
        let response = {}
        beforeEach(function() {
            response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
          });
        it("should return 500 when not given a code", function(done) {
            response.on('end', function() {
                expect(response.statusCode ).toEqual(500)
                done()
              })
            Promise.reject("ERROR")
            .catch(common.handleError(response))
        });
        it("should return set the status code when provided", function(done) {
            response.on('end', function() {
                expect(response.statusCode ).toEqual(404)
                done()
              })
            Promise.reject("ERROR")
            .catch(common.handleError(response, 404))
        });
    });

    describe("respondWithResult()", function() {
        let response = {}
        beforeEach(function() {
            response = httpMocks.createResponse({eventEmitter: require('events').EventEmitter})
          });
        it("should return a status code 200 by default", function(done) {
            response.on('end', function() {
                expect(response.statusCode ).toEqual(200)
                done()
              })
            Promise.resolve({})
            .then(common.respondWithResult(response))
        });
        it("should return the resolved object as JSON", function(done) {
            let data = {foo: 'bar'}
            response.on('end', function() {
                expect(response._isJSON()).toEqual(true)
                expect(response._getData()).toBe(JSON.stringify(data))
                done()
              })
            Promise.resolve(data)
            .then(common.respondWithResult(response))
        });
        it("should return null when no data is provided", function() {
            Promise.resolve()
            .then(common.respondWithResult(response))
            .then(nullResponse => {
                expect(nullResponse).toEqual(null)
            })
        });
    });
});