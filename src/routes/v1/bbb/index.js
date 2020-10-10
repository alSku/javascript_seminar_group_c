import Router from 'express-promise-router';

// routers
import { administrationRouter } from './administration';
import { monitoringRouter } from './monitoring';

const bbbRouter = Router();
const route = '/bbb';

bbbRouter.use(route, administrationRouter);
bbbRouter.use(route, monitoringRouter);

bbbRouter.get(route, async (req, res, next) => {
	await res.sendStatus(200);
});

export { bbbRouter };
