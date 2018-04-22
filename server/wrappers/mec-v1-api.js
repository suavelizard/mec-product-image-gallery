'use strict'
const rp = require('request-promise');
const _ = require('lodash')

const BASE_URL = 'http://www.mec.ca/api/v1'
const OPTIONS = {
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
}

function search (keywords) {
    return rp.get(_.extend({
        method: 'GET',
        uri: `${BASE_URL}/products/search`,
        qs: {
            keywords: keywords
        },
    }, OPTIONS))
}

module.exports = {
    products: {
        search: search
    }
}