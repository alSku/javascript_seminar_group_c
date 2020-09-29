const bodyParser = require('body-parser');
const router = require('express-promise-router')(); // The developer is always right

const { isEmpty } = rootRequire('utils');

const subroute = '/bbbbridge';
const api_url = '/api/v1';

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
	extended: false,
});

// todo: add guard route here

router.get('/', async (req, res) => {
	console.log(req.query);
	res.json(req.query);
});

router.post('/', urlencodedParser, async (req, res, next) => {

	if (!req.body)
		return res.sendStatus(400);

	if (isEmpty(req.body))
		next();
	else {
		await res.status(500).json(req.body);
	}
});

router.post('/', jsonParser, async (req, res, next) => {

	if (!req.body)
		return res.sendStatus(400);

	await res.status(418).json(req.body);
});

router.use(subroute + api_url, require('./bbb'));

module.exports = router;

/**
 * @swagger
 * tags:
 *  - name: default
 *    description: the default group
 */

/**
 * @swagger
 *
 * /:
 *  get:
 *    tags:
 *    - default
 *    description: status code 200
 *    responses:
 *      200:
 *        description: always
 */

/**
 * @swagger
 *
 * /:
 *  post:
 *    tags:
 *    - default
 *    description: status code 200
 *    responses:
 *      200:
 *        description: always
 */