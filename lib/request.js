const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const url = require('url');

module.exports = {

	process: (req, res) => {
		if (req.url == '/') req.url = '/index.html';
		console.log('request: ' + req.url);
		let mime_type = mime.contentType(path.extname(req.url));
		let req_url = url.parse(req.url);
		//console.log(req_url);
		let req_path = path.parse(req_url.pathname);
		//console.log(req_path);
		let req_parse = req_path.dir.split('/');
		//console.log(req_parse);
		try {
			let file_path;
			if (req_parse[1] == 'bootstrap') {
			}
			else {
				file_path = 'www' + req_url.path;
			}
			let file = fs.readFileSync(file_path);
			res.writeHead(200, {'Content-Type': mime_type});
			res.end(file, 'binary');
		}
		catch(e) {
			console.log('BIG ERROR WOW 404/500');
			res.writeHead(500);
			res.end();
		}
	}

};
