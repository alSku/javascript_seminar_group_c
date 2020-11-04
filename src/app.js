import express from 'express';
import fs from 'fs';
import spdy from 'spdy';

import { rootRouter } from './routes/v1';

const port = process.env.BBB_BRIDGE_PORT;
const key = process.env.BBB_P_KEY;
const cert = process.env.BBB_P_CERT;

const staticFilesRoot = 'public';

function Server (app) {

	app.get('/bbb', (req, res) => {
		res.redirect('/bbb/client');
	});

	app.use('/bbb/client', express.static(staticFilesRoot));

	// let angular handle the rest, send them to the index file
	app.all('/bbb/client/*', async (_req, res) => {
		res.status(200).sendFile(`/`, { root: staticFilesRoot });
	});

	app.use(rootRouter);

	const options = {
		key: fs.readFileSync(key),
		cert: fs.readFileSync(cert),
	};

	spdy.createServer(options, app).listen(port, (err) => {
		if (err) {
			console.error(err);
			return process.exit(1);
		} else {
			console.log(`Listening on port ${port}`);
		}
	});
}

export { Server };
