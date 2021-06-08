const { query, urlFormat, isMobile } = require('../util/query')
const moment = require('moment')
const title = '欧昊集团';
module.exports = async (ctx, next) => {
    "use strict";
    const mobile = isMobile(ctx.request.get('user-agent'))
    const SQL = `SELECT * FROM banner WHERE status=1 and is_banner=1 and use_space=${mobile ? '2' : '1'}`
    const newsSQL = "SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%group%' ORDER BY a.publish_time desc LIMIT 0, 3"
    const childNewsSQL = 'SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE "%subcompany%" ORDER BY a.publish_time desc LIMIT 0, 3'
    const partygovernmentSQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%partygovernment%' ORDER BY a.publish_time desc LIMIT 0, 3`
    const publicserviceSQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%publicservice%' ORDER BY a.publish_time desc LIMIT 0, 3`
    try {
        const banners = await query(SQL)
        const news = await query(newsSQL)
        const postBanners = banners.map(item => ({ ...item, pic_url: urlFormat(item.pic_url) }))
        const postNews = news.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY-MM-DD"), cover_pic_url: urlFormat(item.cover_pic_url), mobile_cover_pic_url: urlFormat(item.mobile_cover_pic_url) }))
        if (mobile) {
            const partygovernment = await query(partygovernmentSQL)
            const publicservice = await query(publicserviceSQL)
            const postPartygovernmentData = partygovernment.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY-MM-DD"), mobile_cover_pic_url: urlFormat(item.mobile_cover_pic_url) }))
            const postpublicserviceData = publicservice.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY-MM-DD"), mobile_cover_pic_url: urlFormat(item.mobile_cover_pic_url) }))
            await ctx.render('./mobile/index', { title, filePath: 'index', banners: postBanners, news: postNews, party: postPartygovernmentData, public: postpublicserviceData })
        } else {
            const childNews = await query(childNewsSQL)
            const postChildNews = childNews.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY-MM-DD") }))
            await ctx.render(mobile ? './mobile/index' : 'index', { title, filePath: 'index', banners: postBanners, news: postNews, childNews: postChildNews })
        }
    } catch (error) {
        console.log("home:Error", error)
        if (mobile) {
            await ctx.render(mobile ? './mobile/index' : 'index', { title, filePath: 'index', banners: [], news: [], party: [], public: [] })
        } else {
            await ctx.render(mobile ? './mobile/index' : 'index', { title, filePath: 'index', banners: [], news: [], childNews: [] })
        }
    }
}