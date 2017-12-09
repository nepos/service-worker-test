document.getElementById("get-btn").addEventListener("click", () => {
	console.log("get button was clicked");

	fetch("http://192.168.24.151:3001/api/get", {
		method: "GET"
	})
		.then(res => res.text())
		.then(bodyText => console.log(bodyText));
});

document.getElementById("post-btn").addEventListener("click", () => {
	console.log("post button was clicked");

	fetch("http://192.168.24.151:3001/api/post", {
		method: "POST"
	})
		.then(res => res.text())
		.then(bodyText => console.log(bodyText));
});

document.getElementById("put-btn").addEventListener("click", () => {
	console.log("put button was clicked");

	fetch("http://192.168.24.151:3001/api/put", {
		method: "PUT"
	})
		.then(res => res.text())
		.then(bodyText => console.log(bodyText));
});

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