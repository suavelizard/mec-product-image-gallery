'use strict';
const _ = require('lodash')
const Promise = require('bluebird')

const common = require('../common/index');
const mecApi = require('../../wrappers/mec-v1-api')
const mecImgixApi = require('../../wrappers/mec-imgix-api')

/**
 * Get products
 */
function index(req, res) {
    return mecApi.products.search(req.keywords)
        .then(response => {
            return Promise.map(_.get(response, 'products'), p => {
                const parts = _.get(p, 'default_image_urls.main_image_url').split('/')
                const imagePath = _.join([parts[parts.length - 2], parts[parts.length - 1]], '/')
                return mecImgixApi.getColors(imagePath)
                .then(colors => {
                    p.colors = colors
                    return p
                })
            })
        })
        .then(productsWithColors => {
           return common.respondWithResult(productsWithColors)
        })
        .catch(common.handleError(res));
}

module.exports = {
    index
}