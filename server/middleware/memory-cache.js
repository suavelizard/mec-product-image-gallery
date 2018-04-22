/**
 * Simple in memory Express cache
 * Source: https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
 */
const memoryCache = require('memory-cache')

module.exports = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = memoryCache.get(key)
    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.send
      res.send = (body) => {
        memoryCache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next()
    }
  }
}