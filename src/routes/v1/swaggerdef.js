const swaggerJSDoc = require('swagger-jsdoc');

// https://github.com/Surnet/swagger-jsdoc/blob/master/docs/GETTING-STARTED.md

const options = {
	definition: {
		openapi: '3.0.0', // Specification (optional, defaults to swagger: '2.0')
		info: {
			title: 'javascript_seminar_meeting', // Title (required)
			version: '0.0.0', // Version (required)
		},
	},
	// Path to the API docs
	apis: ['./routes/v1/index.js'],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);


module.exports = {
	openapi: '3.0.0',
	info: {
		title: 'javascript_seminar_meeting', // Title (required)
		version: '0.0.0', // Version (required)
	},
	apis: ['./src/routes/v1/index.js'],
}