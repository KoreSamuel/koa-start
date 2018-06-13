const router = require('koa-router')();

const home  = require('./home');
const api   = require('./api');
const admin = require('./admin');
const work  = require('./work');

router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());
router.use('/admin', admin.routes(), admin.allowedMethods());
router.use('/work', work.routes(), work.allowedMethods());

module.exports = router;