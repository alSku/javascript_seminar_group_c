const router = require('express-promise-router')();
const { get_api, get_http } = require('../../../bbb/module');
const bodyParser = require('body-parser');

// why does this even work #it-just-works-**16x the details**
const api = get_api();
const http = get_http();

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

const route = '/administration';

router.post(route + '/create_meeting', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		console.dir(req.body);
		const b = req.body;

		// api module itself is responsible for constructing URLs
		let meetingCreateUrl = api.administration.create(b.meetingName, b.roomId, {
			duration: b.duration,
			attendeePW: b.attendeePW,
			moderatorPW: b.moderatorPW,
		});

		let meetingInfo = {};

		// http method should be used in order to make calls
		await http(meetingCreateUrl).then((result) => {

			let moderatorUrl = api.administration.join(b.moderator, b.roomId,
				b.moderatorPW);
			let attendeeUrl = api.administration.join(b.attendee, b.roomId,
				b.attendeePW);
			let meetingEndUrl = api.administration.end(b.roomId, b.moderatorPW);

			meetingInfo.attendeeUrl = attendeeUrl;
			meetingInfo.attendeePW = b.attendeePW;

			meetingInfo.moderatorUrl = moderatorUrl;
			meetingInfo.moderatorPW = b.moderatorPW;

			meetingInfo.meetingEndUrl = meetingEndUrl;
			meetingInfo.result = result;
		});

		await res.status(200).json(meetingInfo);
		// await res.status(418).json(req.body);
	});

router.get(route, async (req, res, next) => {
	await res.sendStatus(402);
});

module.exports = router;