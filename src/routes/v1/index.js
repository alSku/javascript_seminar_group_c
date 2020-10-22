import bodyParser from 'body-parser';
import Router from 'express-promise-router';

import { isEmpty } from '~/utils';

// routers
import { bbbRouter } from './bbb';

const rootRouter = Router();

const subRoute = '/bbbbridge';
const api_url = '/api/v1';

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// todo: add guard route here

//home
rootRouter.get('/', async (req, res) => {
	console.log(req.query);
	res.json(req.query);
});

rootRouter.post('/', urlencodedParser, async (req, res, next) => {

	if (!req.body)
		return res.sendStatus(400);

	if (isEmpty(req.body))
		next();
	else {
		await res.status(500).json(req.body);
	}
});

rootRouter.post('/', jsonParser, async (req, res, next) => {

	if (!req.body)
		return res.sendStatus(400);

	await res.status(418).json(req.body);
});

rootRouter.use(subRoute + api_url, bbbRouter);

export { rootRouter };

// /**
//  * @swagger
//  * tags:
//  *  - name: default
//  *    description: the default group
//  */
//
// /**
//  * @swagger
//  *
//  * /:
//  *  get:
//  *    tags:
//  *    - default
//  *    description: status code 200
//  *    responses:
//  *      200:
//  *        description: always
//  */
//
// /**
//  * @swagger
//  *
//  * /:
//  *  post:
//  *    tags:
//  *    - default
//  *    description: status code 200
//  *    responses:
//  *      200:
//  *        description: always
//  */
