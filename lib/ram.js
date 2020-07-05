const fs = require('fs');


let ram;
let ram_file = 'ram.json';
let ram_saved = true;

module.exports = {

	init: () => {
		ram = (fs.existsSync(ram_file)) ? JSON.parse(fs.readFileSync(ram_file)) : {};
		// check every 10 seconds if we need to save and save
		setInterval(() => {
			if (!ram_saved) {
				fs.writeFileSync(JSON.stringify(ram));
				ram_saved = false;
			}
		}, 10000	});
	},

	load: (key) => {
		return ram[key];
	},

	save: (key, val) => {
		ram[key] = val;
		ram_saved = false;
	},

};
