const api = require('./api');
const error = require('./error');
const fs = require('fs');
const mime = require('mime-types');
const path = require('path');
const url = require('url');

module.exports = {

	process: (req, res) => {
		req.url = decodeURI(req.url);
		if (req.url == '/') req.url = '/index.html';
		console.log('request: ' + req.url);
		let mime_type = mime.contentType(path.extname(req.url));
		let url_parsed = req.url.split('/');
		try {
			let file_path;
			if (url_parsed[1] == 'api') {
				api.process(req, res, url_parsed);
			}
			else if (url_parsed[1] == 'bootstrap') {
				file_path = 'node_modules/bootstrap/' + url_parsed.slice(2).join('/');
			}
			else if (url_parsed[1] == 'bootswatch') {
				file_path = 'node_modules/bootswatch/dist/' + url_parsed[2] + '/bootstrap.css';
			}
			else {
				file_path = 'www' + req.url;
			}
			if (typeof file_path !== 'undefined') {
				let file = fs.readFileSync(file_path);
				res.writeHead(200, {'Content-Type': mime_type});
				res.end(file, 'binary');
				console.log('response: ' + file_path);
			}
		}
		catch(e) {
			error.log(e, res);
		}
	}

};
