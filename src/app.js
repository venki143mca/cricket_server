const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');

const { routes } = require('./routes');


const app = express();
app.set('jwtTokenSecret', 'YOUR_SECRET_STRING');
app.use(cors());
const server = http.createServer(app);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

function startServer() {
    server.listen(port, () => {
        console.log('server started');
    });
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
routes(app);

setImmediate(startServer);

module.exports = app;
exports = module.exports;