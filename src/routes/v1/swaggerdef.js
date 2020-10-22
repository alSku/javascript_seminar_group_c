const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDef = {
	openapi: '3.0.0',
	info: {
		title: 'javascript_seminar_meeting',
		version: '0.0.0',
	},
	servers: [
		{
			url: `https://localhost:4200/bbbbridge/api/v1/bbb`,
		},
	],
	apis: [
		'./src/routes/v1/*.js',
		'./src/routes/v1/bbb/*.js',
	],
};

const options = {
	definition: swaggerDef,
	// Path to the API docs
	apis: [
		'./routes/v1/*.js',
		'./routes/v1/bbb/*.js',
	],
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerDef;
