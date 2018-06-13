const router = require('koa-router')();
const controller = require('./../controllers/work');

const routers = router.get('/', controller.indexPage);

module.exports = routers;