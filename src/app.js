const express = require('express');
const spdy = require('spdy');
const db = require('./db');
const fs = require('fs');
const path = require('path');

const port = process.env.BBB_BRIDGE_PORT;
const key = process.env.BBB_P_KEY;
const cert = process.env.BBB_P_CERT;

module.exports = function (app) {

	const options = {
		key: fs.readFileSync(key),
		cert: fs.readFileSync(cert)
	}

	spdy.createServer(options, app).listen(port, (err) => {
		if (err) {
			console.error(err);
			return process.exit(1);
		} else {
			console.log(`Listening on port ${port}`);
		}
	});
};