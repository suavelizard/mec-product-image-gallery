const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const path = require('path')
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Routes
require('./routes')(app);

const port = process.env.PORT || 8090;
app.listen(port);
console.log('server started '+ port);

