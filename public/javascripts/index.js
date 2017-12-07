const clickHandlerPost = (e) => {
	console.log("post button was clicked");

	fetch("http://192.168.24.151:3001/api/post", {
		method: "POST"
	})
		.then(res => res.text())
		.then(bodyText => console.log(bodyText));
};

const clickHandlerPut = (e) => {
	console.log("put button was clicked");

	fetch("http://192.168.24.151:3001/api/put", {
		method: "PUT"
	})
		.then(res => res.text())
		.then(bodyText => console.log(bodyText));
};

if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('sw.js')
		.then(function(registration) {
			console.log('Service Worker registration successful with scope: ',
				registration.scope);
		})
		.catch(function(err) {
			console.log('Service Worker registration failed: ', err);
		});
}
