import axios from 'axios';
import bodyParser from 'body-parser';
import Router from 'express-promise-router';
import xml2js from 'xml2js';

import { bbb } from '~/bbb/module';

const monitoringRouter = Router();

const api = bbb.api;

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

const route = '/monitoring';

monitoringRouter.get(route + '/get_meetings', async (req, res, next) => {
	const getMeetingsUrl = api.monitoring.getMeetings();

	try {
		const xmlResponse = await axios.get(getMeetingsUrl);
		const result = await xml2js.parseStringPromise(xmlResponse.data,
			{ mergeAttrs: true });
		res.status(200).json(result.response);
	} catch (error) {
		res.status(500).json('Could not get meetings');
	}
});

monitoringRouter.post(route + '/get_meeting_info', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		const b = req.body;

		if (b.meetingId === undefined)
			return res.sendStatus(400);

		const getMeetingInfoUrl = api.monitoring.getMeetingInfo(b.meetingId);

		try {
			const xmlResponse = await axios.get(getMeetingInfoUrl);
			const result = await xml2js.parseStringPromise(xmlResponse.data,
				{ mergeAttrs: true });

			res.status(200).json(result.response);
		} catch (error) {
			res.status(500).json('Could not get meeting info');
		}
	});

monitoringRouter.post(route + '/is_meeting_running', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		const b = req.body;

		if (b.meetingId === undefined)
			return res.sendStatus(400);

		const isMeetingRunningUrl = api.monitoring.isMeetingRunning(b.meetingId);

		try {
			const xmlResponse = await axios.get(isMeetingRunningUrl);
			const result = await xml2js.parseStringPromise(xmlResponse.data,
				{ mergeAttrs: true });
			res.status(200).json(result.response);
		} catch (error) {
			res.status(500).json('Could not check if meeting is running');
		}
	});

monitoringRouter.get(route, async (req, res, next) => {
	await res.sendStatus(403);
});

export { monitoringRouter };

/**
 * @swagger
 * tags:
 *  - name: monitoring
 *    description: monitoring calls
 */

/**
 * @swagger
 *
 * /monitoring/get_meetings:
 *  get:
 *    summary: Gets meetings
 *    tags:
 *    - monitoring
 *    responses:
 *      200:
 *        description: OK
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 *
 * /monitoring/get_meeting_info:
 *  post:
 *    summary: Gets meeting Info
 *    tags:
 *    - monitoring
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - meetingId
 *            properties:
 *              meetingId:
 *                type: string
 *                description: The meeting ID that identifies the meeting you are attempting to check on.
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 *
 * /monitoring/is_meeting_running:
 *  post:
 *    summary: Checks if meeting is running
 *    tags:
 *    - monitoring
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            required:
 *              - meetingId
 *            properties:
 *              meetingId:
 *                type: string
 *                description: The meeting ID that identifies the meeting you are attempting to check on.
 *    responses:
 *      200:
 *        description: OK
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal Server Error
 */

/**
 * @swagger
 *
 * /monitoring:
 *  get:
 *    tags:
 *    - monitoring
 *    summary: Forbidden
 *    responses:
 *      403:
 *        description: Forbidden
 */
