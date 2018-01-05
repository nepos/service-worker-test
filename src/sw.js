importScripts("https://cdn.jsdelivr.net/npm/lodash@4.17.4/lodash.min.js");

workbox.routing.registerRoute(
	/.+api\/get/,
	workbox.strategies.cacheFirst()
);

workbox.routing.registerRoute(
	/.+api\/post/,
	workbox.strategies.networkOnly({
		plugins: [
			new workbox.backgroundSync.Plugin(
				"post-v1",
				{
					callbacks: {
						queueDidReplay: (reqs) => {
							// each item looks like { request, error } OR { request, response }
							const successfulReqs = _.filter(reqs, "response");
							const failedReqs = _.filter(reqs, "error");

							if(successfulReqs.length) {
								console.log(`${successfulReqs.length} requests have been replayed successfully`);
							}
							if(failedReqs.length) {
								console.debug(`${failedReqs.length} requests could not be replayed`);
							}
						},
						requestWillEnqueue: (req) => {
							console.log("request just failed and will be enqueued now");
							return req
						},
						requestWillReplay: (req) => {
							console.debug("request will be replayed now");
							return req
						},
					},
				}
			)
		]
	}),
	"POST"
);
