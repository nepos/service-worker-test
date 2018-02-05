document.getElementById("get-btn").addEventListener("click", () => {
	console.log("get button was clicked");

	for (i = 0; i < 2000; i++) {
		setTimeout((i) => {
			fetch("http://192.168.24.151:3001/api/get/" + i, {
				method: "GET"
			})
				.then(res => res.text())
				.then((bodyText) => {
					console.log(bodyText.slice(0,10));
				})
				.catch(err => console.log(err))
		}, 20, i);
	}
});

document.getElementById("post-btn").addEventListener("click", () => {
	console.log("post button was clicked");

	fetch("http://192.168.24.151:3001/api/post", {
		method: "POST"
	})
		.then(res => res.text())
		.then((bodyText) => {
			console.log(bodyText);
			return new Response(bodyText);
		})
		.catch(err => console.log(err))
});

document.getElementById("put-btn").addEventListener("click", () => {
	console.log("put button was clicked");

	fetch("http://192.168.24.151:3001/api/put", {
		method: "PUT"
	})
		.then(res => res.text())
		.then(bodyText => console.log(bodyText));
});

document.getElementById("cache-keys-btn").addEventListener("click", () => {
	caches.keys().then(function(cacheNames) {
		console.log(cacheNames);
	});

	caches.open('get-v2').then(function(cache) {
		for (i = 0; i < 4000; i++) {
			cache.match('http://192.168.24.151:3001/api/get/' + i).then(function(response) {
				console.log(response);
			});
		}
	})
});

// register service worker
if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('sw.js')
			.then((registration) => {
				console.log('Service Worker registration successful with scope: ',
					registration.scope);
			})
			.catch((err) => {
				console.log('Service Worker registration failed: ', err);
			});
	});
}