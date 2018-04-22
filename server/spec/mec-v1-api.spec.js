const nock = require('nock')
const mecApi = require('../wrappers/mec-v1-api')
describe('MEC API Wrapper', function() {
    describe("GET product/search", function() {
    let mecApiMock = nock('http://www.mec.ca')
        .get('/api/v1/products/search')
        .query({keywords: 'bike'})
        .reply(200, {
            products: []
        });
        it("returns status code 200", function(done) {
            mecApi.products.search('bike')
            .then(resp => {
                expect(resp).toEqual({products: []})
                done()
            })
        });
    });
});