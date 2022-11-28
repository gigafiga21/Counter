const os = require("os");
const mysql = require("mysql");
const express = require("express");

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
 * Initializes connection to data base with counter value
 * @returns {mysql::Connection}
 */
function counterDataBaseInit() {
	return mysql.createConnection({
			host: process.env.COUNTER_DB_HOST,
			port: process.env.COUNTER_DB_PORT,
			user: process.env.COUNTER_DB_USER,
			database: "counter",
			password: process.env.COUNTER_DB_PASSWORD,
		});
}

/**
 * Gets counter value from data base
 * @param {mysql::Connection} counterDB - initialized connection to data base with counter 
 * @return {Promise}
 */
function counterDataBaseGetCounter(counterDB) {
	return new Promise((resolve, reject) => {
			counterDB.query("SELECT value FROM Counter LIMIT 1", (error, results) => {
				if (error) reject(error);
				else resolve(results[0].value);
			});
		});
}

/**
 * Sets new counter value in data base
 * @param {mysql::Connection} counterDB - initialized connection to data base with counter 
 * @param {Number} newValue - new counter value to set
 * @return {Promise}
 */
function counterDataBaseSetCounter(counterDB, newValue) {
	return new Promise((resolve, reject) => {
			counterDB.query(`UPDATE Counter SET value = ${newValue}`, (error, results) => {
				if (error) reject(error);
				else resolve();
			});
		});
}

/**
 * Showing current `counter` value
 * When visiting `/` path
 */
app.get('/', async (req, res) => {
	let answer = "";
	const counterDB = counterDataBaseInit();
	try {
		const counterValue = await counterDataBaseGetCounter(counterDB);
		answer = String(counterValue);
	} catch (error) {
		answer = "Failed to retrieve counter value";
		console.error("[ERROR]: ", answer, error);
	}

	counterDB.end();
	appendDefaultHeaders(res);
	res.send(answer);
});

/**
 * Showing current `counter` value and incrementing it
 * When visiting `/stat/` path
 */
app.get('/stat/', async (req, res) => {
	let answer = [];
	let counterValue;
	const counterDB = counterDataBaseInit();
	try {
		counterValue = await counterDataBaseGetCounter(counterDB);
		answer.push(String(counterValue));
	} catch (error) {
		const errorText = "Failed to retrieve counter value";
		answer.push(errorText);
		console.error("[ERROR]: ", errorText, error);
	}

	if (counterValue !== undefined) {
		try {
			await counterDataBaseSetCounter(counterDB, counterValue + 1);
		} catch (error) {
			const errorText = "Failed to increase counter value";
			answer.push(errorText);
			console.error("[ERROR]: ", errorText, error);
		}
	}

	counterDB.end();
	appendDefaultHeaders(res);
	res.send(answer.join("\n"));
});

/**
 * Showing hostname of the container
 * When visiting `/about/` path
 */
app.get('/about/', (req, res) => {
	appendDefaultHeaders(res);
	res.header("Content-Type", "text/html; Charset=UTF-8");
	res.send(`<h3>Hello, Илья!</h3><b>Hostname:</b> ${os.hostname()}<br/>`);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`)
});

