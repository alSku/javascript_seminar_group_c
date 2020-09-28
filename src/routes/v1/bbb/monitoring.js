const router = require('express-promise-router')();
const { get_api, get_http } = require('../../../bbb/module');

const api = get_api();
const http = get_http();

const route = '/monitoring';

router.get(route + '/get_meetings', async (req, res, next) => {
	const meetings = api.monitoring.getMeetings();
	await res.status(200).json(meetings);
});

router.get(route, async (req, res, next) => {
	await res.sendStatus(402);
});

module.exports = router;