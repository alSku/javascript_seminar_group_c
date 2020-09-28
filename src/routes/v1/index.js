const router = require('express-promise-router')(); // The developer is always right
const bodyParser = require('body-parser');

const api_url = '/api/v1';
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

// todo: add guard route here

router.get('/', async (req, res, next) => {
	res.sendStatus(200);
	next();
});

router.post('/', urlencodedParser, async (req, res, next) => {

	if (!req.body)
		return res.sendStatus(400);

	console.log(req.body);
	await res.status(418).json(req.body);
});

router.use(api_url, require('./bbb'));

module.exports = router;