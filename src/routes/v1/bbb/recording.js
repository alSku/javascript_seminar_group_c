import axios from 'axios';
import Router from 'express-promise-router';
import xml2js from 'xml2js';
import bodyParser from 'body-parser';

import { bbb } from '~/bbb/module';
import { isValidUrl } from '~/utils';

const recordingRouter = Router();

const api = bbb.api;
const http = bbb.http;

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

const route = '/recording';

//returns list of recordings
recordingRouter.get(route + '/get_recordings', async (req, res, next) => {
    const meetings = api.recording.getRecordings();

    // https://attacomsian.com/blog/nodejs-convert-xml-to-json#async-await

    if (isValidUrl(meetings)) {
        try {
            const xmlResponse = await axios.get(meetings);
			const result = await xml2js.parseStringPromise(xmlResponse.data,
				{ mergeAttrs: true });
			res.status(200).json(result.response);
        } catch (error) {
			res.status(500).json('Could not get recordings');
		}
    }
});

recordingRouter.post(route + '/publish_recordings', urlencodedParser,
    async (req, res, next) => {
        if (!req.body)
				return res.sendStatus(400);

        const b = req.body;

        const recordinginfo = api.recording.publishRecordings(b.recordId, b.publish);

        // https://attacomsian.com/blog/nodejs-convert-xml-to-json#async-await
		if (isValidUrl(recordinginfo)) {
			try {
				const xmlResponse = await axios.get(recordinginfo);
				const result = await xml2js.parseStringPromise(xmlResponse.data,
					{ mergeAttrs: true });
				res.status(200).json(result.response);
			} catch (error) {
				res.status(500).json('Could not publish recordings');
			}
		}
});

recordingRouter.post(route + '/delete_recordings', urlencodedParser,
    async (req, res, next) => {
        if (!req.body)
				return res.sendStatus(400);

        const b = req.body;

        const recordinginfo = api.recording.deleteRecordings(b.recordId);

        // https://attacomsian.com/blog/nodejs-convert-xml-to-json#async-await
		if (isValidUrl(recordinginfo)) {
			try {
				const xmlResponse = await axios.get(recordinginfo);
				const result = await xml2js.parseStringPromise(xmlResponse.data,
					{ mergeAttrs: true });
				res.status(200).json(result.response);
			} catch (error) {
				res.status(500).json('Could not delete recordings');
			}
		}
});

recordingRouter.post(route + '/update_recordings', urlencodedParser,  
    async (req, res, next) => {
        if (!req.body)
				return res.sendStatus(400);

        const b = req.body;

        const recordinginfo = api.recording.updateRecordings(b.recordId);

        // https://attacomsian.com/blog/nodejs-convert-xml-to-json#async-await
		if (isValidUrl(recordinginfo)) {
			try {
				const xmlResponse = await axios.get(recordinginfo);
				const result = await xml2js.parseStringPromise(xmlResponse.data,
					{ mergeAttrs: true });
				res.status(200).json(result.response);
			} catch (error) {
				res.status(500).json('Could not update recordings');
			}
		}
});

recordingRouter.get(route, async (req, res, next) => {
	await res.sendStatus(402);
});

export { recordingRouter };