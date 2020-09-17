const error = require('./error');
const mime = require('mime-types');
const twitch = require('./twitch');


module.exports = {
	
	process: (req, res, url_parsed) => {

		try {
			//console.log(req);
			let body = '';
			req.on('data', (data) => {
				body += data;
			});
			req.on('end', () => {
				twitch.call(url_parsed[2], body);
				res.writeHead(200, mime.contentType('json'));
				res.end(body);
// this working? json default?
			console.log('response rendered?');
			});

		}
		catch(e) {
			error.log(e, res);
		}


	}

};
