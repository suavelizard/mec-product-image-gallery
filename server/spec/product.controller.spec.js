const nock = require('nock')
const httpMocks = require('node-mocks-http')
const _ = require('lodash')
const ProductController = require('../api/products/products.controller')
const mecApi = require('../wrappers/mec-v1-api')
const productFixture = require('./fixtures/mec-product.fixture.json')
const colorFixture = require('./fixtures/mec-imgix-colors.fixture.json')

describe("Products controller", function() {
    describe("index()", function() {
        it('returns 200 code when given a normal request', function(done) {
            const request = httpMocks.createRequest({
                method: 'GET',
                url:'/api/products',
                query: {keywords: 'bike'}
            })
            const response = httpMocks.createResponse({req: request, eventEmitter: require('events').EventEmitter})
            let mecApiMock = nock('http://www.mec.ca')
                .get('/api/v1/products/search')
                .query({keywords: 'bike'})
                .reply(200, {
                    products: [productFixture]
                });
            let mecImgixApi = nock('https://mec.imgix.net')
                .get(`/medias/sys_master/fallback/fallback/8871568310302/5050660-GRY23-fallback.jpg`)
                .query({
                    palette: 'json',
                    colors: 3
                })
                .reply(200, colorFixture);
            response.on('end', function() {
                expect(response.statusCode ).toEqual(200)                
                done()
              })
            ProductController.index(request, response)
        })

        it("calls the mecApi wrapper with the search keyword", function(done) {
            const request = httpMocks.createRequest({
                method: 'GET',
                url:'/api/products',
                query: {keywords: 'bike'}
            })
            const response = httpMocks.createResponse({req: request, eventEmitter: require('events').EventEmitter})
                        spyOn(mecApi.products, 'search').and.returnValue(Promise.resolve())
            ProductController.index(request, response)
                .then((result) => {
                    expect(mecApi.products.search).toHaveBeenCalledWith('bike')
                    done();
            });
        });
    });
});