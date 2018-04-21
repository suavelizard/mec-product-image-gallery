'use strict'
const rp = require('request-promise');
const _ = require('lodash')
const Promise = require('bluebird')

const BASE_URL = 'https://mec.imgix.net/medias/sys_master/fallback/fallback'
const OPTIONS = {
    headers: {
        'User-Agent': 'Request-Promise'
    },
    json: true
}

function getColors (imagePath, palette='json', colorCount=3) {
    if(!imagePath){
        return Promise.reject('No image path provided')
    }
    console.info('Getting color data for', imagePath)
    return rp.get(_.extend({
        method: 'GET',
        uri: `${BASE_URL}/${imagePath}`,
        qs: {
            palette: palette,
            colors: colorCount
        },
    }, OPTIONS))
    .then(response => {
       return response
    })
    .catch(error => {
        console.error('Error retrieving color', error)
    })
}
module.exports = {
    getColors: getColors
}