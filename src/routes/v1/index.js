const router = require('express-promise-router')(); // The Developer is always right

router.use('/', async function (req, res) {
	return Promise.reject('First!');
});

module.exports = router;