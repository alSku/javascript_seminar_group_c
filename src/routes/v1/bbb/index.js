const router = require('express-promise-router')();

const route = '/bbb';

router.use(route, require('./administration'));
router.use(route, require('./monitoring'));

router.get(route, async (req, res, next) => {
	await res.sendStatus(200);
});

module.exports = router;
