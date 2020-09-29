const bbb = require('bigbluebutton-js');

// https://aakatev.github.io/bigbluebutton-js-docs/docs/reference/api/

const bbbHost = process.env.BBB_URL;
const bbbSecret = process.env.BBB_SECRET;

module.exports = {
	bbb: {
		api: bbb.api(bbbHost, bbbSecret),
		http: bbb.http,
	},
};