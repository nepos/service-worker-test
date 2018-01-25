const path = require('path'),
	htmlPlugin = require('html-webpack-plugin'),
	cleanPlugin = require('clean-webpack-plugin'),
	dist = 'dist',
	workboxPlugin = require('workbox-webpack-plugin').InjectManifest;

module.exports = {
	entry: {
		index: './src/javascripts/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, dist)
	},
	plugins: [
		new cleanPlugin([dist]),
		new htmlPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		}),
		new workboxPlugin({
			globDirectory: "src",
			globPatterns: ['**/*.{html,js,css}'],
			swDest: 'sw.js',
			swSrc: path.join("src", 'sw.js'),
			maximumFileSizeToCacheInBytes: 4 * 1024 * 1024
		})
	]
};
