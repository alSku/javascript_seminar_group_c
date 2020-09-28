const bbb = require('bigbluebutton-js');

const bbbHost = process.env.BBB_URL;
const bbbSecret = process.env.BBB_SECRET;

module.exports = {
	get_api: function () {
		return bbb.api(bbbHost, bbbSecret)
	},
	get_http: function () {
		return bbb.http
	}
}