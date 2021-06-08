const { query, dateFormat, urlFormat, isMobile } = require('../util/query')
const title = '欧昊集团';
module.exports.news = async (ctx, next) => {
    const mobile = isMobile(ctx.request.get('user-agent'))
    const groupSQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%${ctx.params.type}%' ORDER BY a.publish_time desc LIMIT 0, ${mobile ? '10' : '3'}`
    try {
        const data = await query(groupSQL)
        const postData = data.map(item => ({ ...item, publish_time: dateFormat(item.publish_time), cover_pic_url: urlFormat(item.cover_pic_url) }))
        await ctx.render(mobile ? './mobile/news' : 'news', { title, filePath: 'news', news: postData, type: ctx.params.type })
    } catch (error) {
        await ctx.render(mobile ? './mobile/news' : 'news', { title, filePath: 'news', news: [], type: ctx.params.type })
    }
}

module.exports.postPage = async (ctx, next) => {
    const { current, type, limit = 3 } = ctx.request.body
    console.log(limit, '------------')
    if (current <= 0 || limit <= 0) {
        ctx.body = []
        return
    }
    const groupSQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%${type}%' ORDER BY a.publish_time desc LIMIT ${(current - 1) * limit}, ${limit}`
    try {
        const data = await query(groupSQL)
        const postData = data.map(item => ({ ...item, publish_time: dateFormat(item.publish_time), cover_pic_url: urlFormat(item.cover_pic_url) }))
        ctx.body = postData
    } catch (error) {
        ctx.body = []
    }
}