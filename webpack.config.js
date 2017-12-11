const path = require('path'),
	htmlPlugin = require('html-webpack-plugin'),
	cleanPlugin = require('clean-webpack-plugin'),
	dist = 'dist',
	workboxPlugin = require('workbox-webpack-plugin');

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
			globDirectory: dist,
			globPatterns: ['**/*.{html,js,css}'],
			swDest: path.join(dist, 'sw.js'),
			swSrc: path.join("src", 'sw.js'),
			clientsClaim: true,
			skipWaiting: true
		})
	]
};
