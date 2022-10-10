const os = require("os");
const express = require('express');

const app = express();
const port = 3000;

/**
 * Headers common for all responces
 * @type {Array[Array[String]]}
 */
const DEFAULT_HEADERS = [
	["Access-Control-Allow-Origin", "*"],
	["Content-Type", "text/plain; Charset=UTF-8"]
];

/**
 * Adds default headers to response
 * @param {express::Response} res - response object
 */
function appendDefaultHeaders(res) {
	DEFAULT_HEADERS.map(hs => res.header(...hs));
}

/**
 * Counter incrementing after `/stat/` route is visited
 * @type {Number}
 */
let counter = 0;

/**
 * Showing current `counter` value
 * When visiting `/` path
 */
app.get('/', (req, res) => {
	appendDefaultHeaders(res);
	res.send(String(counter));
})

/**
 * Showing current `counter` value and incrementing it
 * When visiting `/stat/` path
 */
app.get('/stat/', (req, res) => {
	appendDefaultHeaders(res);
	res.send(String(counter));
	counter ++;
})

/**
 * Showing hostname of the container
 * When visiting `/about/` path
 */
app.get('/about/', (req, res) => {
	appendDefaultHeaders(res);
	res.header("Content-Type", "text/html; Charset=UTF-8");
	res.send(`<h3>Hello, Илья!</h3><b>Hostname:</b> ${os.hostname()}<br/>`);
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

