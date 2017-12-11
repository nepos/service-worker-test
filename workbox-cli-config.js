module.exports = {
  "globDirectory": "src/",
  "globPatterns": [
    "**/*.{js,css,html}"
  ],
  "swDest": "dist/sw.js",
  "swSrc": "src/sw.js",
  "globIgnores": [
    "../workbox-cli-config.js"
  ]
};
