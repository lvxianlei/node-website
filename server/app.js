const path = require('path');
const Koa = require('koa');
const staticFiles = require('koa-static');
const bodyparser = require('koa-bodyparser');
const app = new Koa();
const views = require('koa-views');
const router = require('./router');
const moment = require('moment');
const port = process.env.NODE_ENV === 'development' ? 4000 : 8080
app.use(views(path.join(__dirname, './../template'), { extension: 'ejs' }));
app.use(staticFiles(path.join(__dirname, './../static')));
app.use(bodyparser());
app.use(async (ctx, next) => {
    try {
        await next()
        if (!ctx.body) {  // 没有资源
            ctx.status = 404;
            ctx.body = "not found"
        }
    } catch (e) {
        // 如果后面的代码报错 返回500
        ctx.status = 500;
        ctx.body = "server error"
    }
})
app.use(router.routes());
app.listen(port, () => console.log(moment(new Date()).format('YYYY-MM-DD HH:mm:ss')));