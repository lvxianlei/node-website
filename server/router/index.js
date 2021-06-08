const Router = require('koa-router')
const router = new Router;
const home = require('./home')
const business = require('./business')
const businessUnit = require('./businessUnit')
const newDetail = require('./newDetail')
const { news, postPage } = require('./news')
const ourHouse = require('./ourHouse')
const contactUs = require('./contactUs')
const leader = require('./leader')
const responsibility = require('./responsibility')
const { joinUs, joinUsDetail, postJoinUsPage } = require('./joinUs')

router.get('/', home)

router.get('/contactUs', contactUs)

router.get('/leader', leader)

router.get('/business/:type', business)

router.get('/businessUnit', businessUnit)

router.get('/responsibility', responsibility)

router.get('/joinUs', joinUs)

router.get('/joinUs/:id', joinUsDetail)

router.get('/ourHouse', ourHouse)

router.get('/news/:type', news)

router.post('/news/pages', postPage)

router.post('/joinUs/pages', postJoinUsPage)

router.get('/news/:type/:id', newDetail)


router.get('/ourHouse', ourHouse)


module.exports = router