const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const path = require('path')
const env = require('dotenv').config()
const secure = require('express-force-https')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(secure)

// Routes
require('./routes')(app);

const port = process.env.PORT || 8090
app.listen(port)
console.log('server started '+ port)

