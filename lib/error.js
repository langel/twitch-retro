module.exports = {

	log: (e, res) => {

		console.log('BIG ERROR WOW 404/500');
		console.log(e);
		res.writeHead(500);
		res.end();
	}
};
