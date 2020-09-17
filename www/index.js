
let ajax = {
	call: async (url, options = {}) => {
		const response = await fetch(url, options);
		return response;
	},
		
	get_text: async (url) => {
		return await ajax.call(url, {
			method: 'GET',
		}).then(response => {
			return response.text();
		}).then(data => {
			console.log(data);
			return data;
		});
	},
	
	get_json: async (url) => {
		return await ajax.call(url, {
			method: 'GET',
		}).then(response => {
			return response.JSON();
		}).then(data => {
			console.log(data);
			return data;
		});
	},

	post: async (url, data) => {
		ajax.call(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(data),
		}).then(data => {
			console.log(data);
		});
	},
}

let page_container = document.getElementById('main_cont');
let nav_options = document.querySelectorAll("nav button");
nav_options.forEach((el) => {
	el.addEventListener('click', () => {
		let page = el.textContent.toLowerCase();
		ajax.get_text('/pages/' + page + '.html').then(data => {
			page_container.innerHTML = data; 
			if (typeof page_shit[page] == 'function') page_shit[page]();
		});
	});
});


let page_shit = {
	'add game': () => {
		document.getElementById('add-game-form').addEventListener('submit', (e) => {
			e.preventDefault(e);
			ajax.post('/api/add_game', {
				'game_title': document.getElementById('add-game-title').value
			});
			return false;
		});
	}
};


window.onload = () => {
	document.getElementById('home_button').click();
};

