const os = require("os");
const express = require('express');

const app = express();
const port = 3000;

const DEFAULT_HEADERS = [
	["Access-Control-Allow-Origin", "*"],
	["Content-Type", "text/plain; Charset=UTF-8"]
];

function appendDefaultHeaders(res) {
	DEFAULT_HEADERS.map(hs => res.header(...hs));
}

let counter = 0;

app.get('/', (req, res) => {
	appendDefaultHeaders(res);
	res.send(String(counter));
})

app.get('/stat/', (req, res) => {
	appendDefaultHeaders(res);
	res.send(String(counter));
	counter ++;
})

app.get('/about/', (req, res) => {
	appendDefaultHeaders(res);
	res.header("Content-Type", "text/html; Charset=UTF-8");
	res.send(`<h3>Hello!</h3><b>Hostname:</b> ${os.hostname()}<br/>`);
})

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
})

