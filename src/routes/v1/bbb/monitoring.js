import axios from 'axios';
import Router from 'express-promise-router';
import xml2js from 'xml2js';
import bodyParser from 'body-parser';

import { bbb } from '~/bbb/module';
import { isValidUrl } from '~/utils';

const monitoringRouter = Router();

const api = bbb.api;
const http = bbb.http;

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

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


monitoringRouter.get(route + '/get_meeting_info',  urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
				return res.sendStatus(400);

		const b = req.body;

		const meetinginfo = api.monitoring.getMeetingInfo(b.meetingId);
	
		if (isValidUrl(meetinginfo)) {
			try {
				const xmlResponse = await axios.get(meetinginfo);
				const result = await xml2js.parseStringPromise(xmlResponse.data,
					{ mergeAttrs: true });
				res.status(200).json(result.response);
			} catch (error) {
				res.status(500).json('Could not get meetings');
			}
		}
});


monitoringRouter.get(route + '/is_meeting_running', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		const b = req.body;

		const meetinginfo = api.monitoring.isMeetingRunning(b.meetingId);

		if (isValidUrl(meetinginfo)) {
			try {
				const xmlResponse = await axios.get(meetinginfo);
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
