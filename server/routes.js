/**
 * Main application routes
 */

'use strict';
const path = require('path');
const express = require('express')
module.exports = app => {
  app.use('/api/products', require('./api/products'));
  if(process.env.NODE_ENV === 'production'){
    console.log('Serving static files', path.join(__dirname + '/../client/dist/static'))
    app.use('/static', express.static(path.join(__dirname + '/../client/dist/static')))
    app.get('/', function(req, res) {
      res.sendFile(path.join(__dirname + '/../client/dist/index.html'));
    })
  }
}