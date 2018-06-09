const path       = require('path');
const Koa        = require('koa');
const convert    = require('koa-convert');
const views      = require('koa-views');
const koaStatic  = require('koa-static');
const bodyParser = require('koa-bodyparser');
const koaLogger  = require('koa-logger');
const session    = require('koa-session-minimal');
const MysqlStore = require('koa-mysql-session');

const config  = require('./../config');
const routers = require('./routers/index');

const app = new Koa();

// session config
const sesseionMysqlConfig = {
    user    : config.database.USERNAME,
    password: config.database.PASSWORD,
    database: config.database.DATABASE,
    host    : config.database.HOST
};

// config session middleware
app.use(session({
    key  : 'USER_ID',
    store: new MysqlStore(sesseionMysqlConfig)
}));

// config logger middleware
app.use(koaLogger());

// config body parser middleware
app.use(bodyParser());

// config static source middleware
app.use(convert(koaStatic(
    path.join(__dirname, './../static')
)));

// config server template render middleware
app.use(views(path.join(__dirname, './views'), {
    extension: 'ejs'
}));

// init router middleware
app.use(routers.routes()).use(routers.allowedMethods());

// start
app.listen(config.port, () => {
    console.log('the server is starting at port ' + config.port);
});