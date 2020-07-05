const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const url = require('url');

module.exports = {

	process: (req, res) => {
		if (req.url == '/') req.url = '/index.html';
		console.log('request: ' + req.url);
		let mime_type = mime.contentType(path.extname(req.url));
		let req_parse = req.url.split('/');
		try {
			let file_path;
			if (req_parse[1] == 'bootstrap') {
				file_path = 'node_modules/bootstrap/' + req_parse.slice(2).join('/');
			}
			else if (req_parse[1] == 'bootswatch') {
				file_path = 'node_modules/bootswatch/dist/' + req_parse[2] + '/bootstrap.css';
			}
			else {
				file_path = 'www' + req.url;
			}
			console.log('response: ' + file_path);
			let file = fs.readFileSync(file_path);
			res.writeHead(200, {'Content-Type': mime_type});
			res.end(file, 'binary');
		}
		catch(e) {
			console.log('BIG ERROR WOW 404/500');
			console.log(e);
			res.writeHead(500);
			res.end();
		}
	}

};
