'use strict';

require('@babel/register');
require('@babel/polyfill');

const app = require('../app').default;

var config = require('../config')

const http = require ('http');
const server = http.createServer(app);

var configValue = config.get(process.env.NODE_ENV);

var port = configValue.PORTNO;
server.listen(port);
server.on('listening',() =>{
    console.log('server is created on.listen on ' + port);
});