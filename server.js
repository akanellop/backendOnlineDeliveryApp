/*
console.log('Online Delivery Service Application Server is Running...')

const http= require('http');
const app = require('./app');

const PORT = (process.env.Port || 3000);

//This was commented because now all the intaken requests will be handled from the  express app
//const server = http.createServer((req,res) => { //this function will be executed whenever our server is receiving a call
//    res.end('This method returns the server\'s response');

//});

app.set('port', PORT)
const server = http.createServer(app);
server.listen(PORT); //process.env.Port will be selected in case the server is deployed

*/

console.log('Online Delivery Service Application Server is Running...')
const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind +'\n\n');
});

server.listen(port);

