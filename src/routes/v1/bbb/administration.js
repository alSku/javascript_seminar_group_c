import bodyParser from 'body-parser';
import Router from 'express-promise-router';

import { bbb } from '~/bbb/module';

const administrationRouter = Router();

const api = bbb.api;
const http = bbb.http;

const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

const route = '/administration';

/**
 * {
 *   name:            [meeting name]
 *   meetingId:       [meeting Id]
 *   attendeePW:      [Attendee password]
 *   moderatorPW:     [Moderator password]
 *   welcome:         [Chat welcome message]
 *   dialNumber:      [Cell phone access number]
 *   voiceBridge:     [FreeSWITCH voice conference number]
 *   maxParticpants:  [Maximum number of participants]
 *   logoutURL:       [Redirect URL after logout]
 *   record:          [Enable/disable meeting record]
 *   duration:        [Meeting maximum duration]
 *
 *   isBreakout:      [true for a breakout room]
 *   parentMeetingId: [Top-level meeting id of the breakout room]
 *   sequence:        [Breakout room sequence number]
 *   freeJoin:        [true allows user to have a choice of breakout room to join]
 *
 *   meta:                    [Meeting metadata]
 *   moderatorOnlyMessage:    [Moderator only chat message]
 *   autoStartRecording:      [true will instruct to start recording on first user join]
 *   allowStartStopRecording: [Allow users to start/stop recordings]
 *   webcamsOnlyForModerator: [Users webcams are only seeing by moderators]
 *   logo:                    [Default logo in Flash client]
 *   bannerText:              [Banner text]
 *   bannerColor:             [Banner background color]
 *   copyright:               [Copyright text]
 *   muteOnStart:             [Mute all users on meeting start]
 *   allowModsToUnmuteUsers:  [Allow moderators to unmute users]
 *
 *   lockSettingsDisableCam:              [true will prevent users from sharing webcams]
 *   lockSettingsDisableMic:              [true will prevent users from sharing microphones]
 *   lockSettingsDisablePrivateChat:      [true will disable private chats]
 *   lockSettingsDisablePublicChat:       [true will disable public chat]
 *   lockSettingsDisableNote:             [true will disable notes]
 *   lockSettingsLockedLayout:            [true will lock meeting layout]
 *   lockSettingsLockOnJoin:              [false will disable applying settings]
 *   lockSettingsLockOnJoinConfigurable:  [true will allow applying lockSettingsLockOnJoin]
 *   guestPolicy:                         [Possible values: ALWAYS_ACCEPT, ALWAYS_DENY, ASK_MODERATOR]
 * }
 */

administrationRouter.post(route + '/create', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		const b = req.body;

		// console.log(b);

		// api module itself is responsible for constructing URLs
		let meetingCreateUrl = api.administration.create(b.meetingName, b.meetingId, {
			duration: b.duration,
			attendeePW: b.attendeePW,
			moderatorPW: b.moderatorPW,
		});

		let meetingInfo = {};
		console.log(meetingCreateUrl)

		// http method should be used in order to make calls
		await http(meetingCreateUrl).then((result) => {

			let moderatorUrl = api.administration.join(b.moderator, b.meetingId,
				b.moderatorPW);
			let attendeeUrl = api.administration.join(b.attendee, b.meetingId,
				b.attendeePW);
			let meetingEndUrl = api.administration.end(b.meetingId, b.moderatorPW);

			meetingInfo.attendeeUrl = attendeeUrl;
			meetingInfo.attendeePW = b.attendeePW;

			meetingInfo.moderatorUrl = moderatorUrl;
			meetingInfo.moderatorPW = b.moderatorPW;

			meetingInfo.meetingEndUrl = meetingEndUrl;
			meetingInfo.result = result;
		});

		await res.status(200).json(meetingInfo);
	});

administrationRouter.post(route + '/join', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		const b = req.body;

		// console.log(b);

		// api module itself is responsible for constructing URLs
		// password is either moderatorPW/attendeePW
		let meetingJoinUrl = api.administration.join(b.fullName, b.meetingId, b.password);

		let meetingInfo = {};
		meetingInfo.attendeeName = b.fullName
		meetingInfo.meetingId = b.meetingId
		meetingInfo.password = b.password
		meetingInfo.joinURL = meetingJoinUrl

		await res.status(200).json(meetingInfo);
	});

	administrationRouter.post(route + '/end', urlencodedParser,
	async (req, res, next) => {

		if (!req.body)
			return res.sendStatus(400);

		const b = req.body;

		// console.log(b);

		// api module itself is responsible for constructing URLs
		// password has to be moderatorPW
		let meetingEndUrl = api.administration.end(b.meetingId, b.moderatorPW);

		let meetingInfo = {};
		meetingInfo.attendeeName = b.fullName
		meetingInfo.meetingId = b.meetingId
		meetingInfo.moderatorPW = b.moderatorPW;
		meetingInfo.endURL = meetingEndUrl

		await res.status(200).json(meetingInfo);
	});

administrationRouter.get(route, async (req, res, next) => {
	await res.sendStatus(402);
});

export { administrationRouter };

