
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
		let page = ajax.get_text('/pages/' + el.textContent.toLowerCase() + '.html').then(data => {
			page_container.innerHTML = data; 
		});
	});
});


document.getElementById('home_button').click();
