
const http = require('http');
let router = require('./lib/router');

//require('bootstrap');

const server_listen_port = 1666;

console.log('staring server . . .');

let server = http.createServer(function(req, res) {

	router.process(req, res);

})

server.listen(server_listen_port);

console.log('server listening on port ' + server_listen_port);
