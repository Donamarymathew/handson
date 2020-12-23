const express = require('express');
const router = require('./route/route');
const errorLogger = require('./utilities/errorlogger');
const requestLogger = require('./utilities/requestlogger');
const cors = require("cors")
const app = express();

app.use(cors())
app.use(requestLogger);
app.use('/', router);
app.use(errorLogger);


app.listen(1050);
console.log("Server listening in port 1050");


module.exports = app;