importScripts("https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js");

workbox.core.setLogLevel(workbox.core.LOG_LEVELS.debug);

workbox.routing.setDefaultHandler(({url, event, params}) => {
	console.info(`request to ${url} didn't match any registered route. Event: ${JSON.stringify(event, null, 2)}, params: ${JSON.stringify(params, null, 2)}`);
});

workbox.routing.setCatchHandler(({url, event, params}) => {
	console.error(`request to ${url} threw an unhandled error. Event: ${JSON.stringify(event, null, 2)}, params: ${JSON.stringify(params, null, 2)}`);
});

workbox.routing.registerRoute(
	({url, event}) => {
		return (url.pathname === '/api/get');
	},
	workbox.strategies.networkFirst({
		cacheName: "get-v1"//,
		// plugins: [
		// 	new workbox.expiration.Plugin({
		// 		maxAgeSeconds: 120,
		// 		maxEntries: 5
		// 	})
		// ]
	})
);

workbox.routing.registerRoute(
	({url, event}) => {
		return (url.pathname === '/api/post');
	},
	workbox.strategies.networkOnly({
		plugins: [
			new workbox.backgroundSync.Plugin(
				"post-v1",
				{
					callbacks: {
						queueDidReplay: async (reqs) => {
							// each item looks like { request, error } OR { request, response }
							const successfulReqs = _.filter(reqs, "response");
							const failedReqs = _.filter(reqs, "error");

							if(successfulReqs.length) {
								console.log(`${successfulReqs.length} requests have been replayed successfully`);
							}
							if(failedReqs.length) {
								console.debug(`${failedReqs.length} requests could not be replayed`);
							}

							return reqs
						},
						requestWillEnqueue: async ({url, timestamp, requestInit}) => {
							console.log("request just failed and will be enqueued now");
							return {url, timestamp, requestInit}
						},
						requestWillReplay: async (req) => {
							console.debug("request will be replayed now");
							return req
						},
					},
					maxRetentionTime: 60000
				}
			)
		]
	}),
	"POST"
);
