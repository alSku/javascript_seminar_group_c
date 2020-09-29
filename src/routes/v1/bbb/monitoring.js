const router = require('express-promise-router')();
const { bbb } = require('../../../bbb/module');
const bodyParser = require('body-parser');
const axios = require('axios');
const { isValidUrl } = require('../../../utils');
const xml2js = require('xml2js');

// https://attacomsian.com/blog/nodejs-convert-xml-to-json#async-await

const api = bbb.api;
const http = bbb.http;

const route = '/monitoring';

router.get(route + '/get_meetings', async (req, res, next) => {
	const meetings = api.monitoring.getMeetings();

	if (isValidUrl(meetings)) {
		try {
			const xmlResponse = await axios.get(meetings);
			const result = await xml2js.parseStringPromise(xmlResponse.data,
				{ mergeAttrs: true });
			res.json(result);
		}	catch (error) {
			res.status(500).json('Could not get meetings');
		}
	}
});

router.get(route, async (req, res, next) => {
	await res.sendStatus(402);
});

module.exports = router;