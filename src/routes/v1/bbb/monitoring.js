import axios from 'axios';
import Router from 'express-promise-router';
import xml2js from 'xml2js';

import { bbb } from '~/bbb/module';
import { isValidUrl } from '~/utils';

const monitoringRouter = Router();

const api = bbb.api;
const http = bbb.http;

const route = '/monitoring';

monitoringRouter.get(route + '/get_meetings', async (req, res, next) => {
	const meetings = api.monitoring.getMeetings();

	// https://attacomsian.com/blog/nodejs-convert-xml-to-json#async-await

	if (isValidUrl(meetings)) {
		try {
			const xmlResponse = await axios.get(meetings);
			const result = await xml2js.parseStringPromise(xmlResponse.data,
				{ mergeAttrs: true });
			res.status(200).json(result.response);
		} catch (error) {
			res.status(500).json('Could not get meetings');
		}
	}
});

monitoringRouter.get(route, async (req, res, next) => {
	await res.sendStatus(402);
});

export { monitoringRouter };
