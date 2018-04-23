'use strict';
const _ = require('lodash')
const Promise = require('bluebird')

const common = require('../common/index');
const mecApi = require('../../wrappers/mec-v1-api')
const mecImgixApi = require('../../wrappers/mec-imgix-api')

/**
 * Get products by keyword
 * @param {any} req 
 * @param {any} res
 * @returns Promise<any>
 */
function index(req, res) {
    return mecApi.products.search(req.query.keywords)
        .then(response => {
            return getColorData(_.slice(_.get(response, 'products'), 0, 5))
            .then(productsWithColorData => {
                response.products = productsWithColorData
                return response
            })
        })
        .then(common.respondWithResult(res))
        .catch(common.handleError(res))
}

/**
 * Unused. Example of extending the API to more endpoints.
 * 
 * @param {any} req 
 * @param {any} res 
 * @returns Promise<any>
 */
function getByCode(req, res) {
    return mecApi.products.getByCode(req.params.code)
    .then(common.respondWithResult(res))
    .catch(common.handleError(res))
}

/**
 * returns color data for products based on the main_image_url
 * @param {array} products 
 * @returns Promise<any>
 */
function getColorData(products) {
    return Promise.map(products, p => {
        const parts = _.get(p, 'default_image_urls.main_image_url').split('/')
        const imagePath = _.join([parts[parts.length - 2], parts[parts.length - 1]], '/')
        return mecImgixApi.getColors(imagePath)
        .then(colors => {       
            p.colors_data = colors
            return p
        })
    }, {concurrency: 5})
}
module.exports = {
    index,
    getColorData,
    getByCode
}