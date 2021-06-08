const { query, dateFormat, isMobile } = require('../util/query')
const title = '欧昊集团';
module.exports = async (ctx, next) => {
    const mobile = isMobile(ctx.request.get('user-agent'))
    const { id, type } = ctx.params
    const SQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS <> "0" and a.banner_id='${id}'`
    try {
        const data = await query(SQL)
        if (data.length > 0) {
            const newsType = data[0].type.includes('group') ? 'group' : 'subcompany'
            const postData = data.map(item => ({ ...item, publish_time: dateFormat(item.publish_time) }))
            await ctx.render(mobile ? './mobile/newDetail' : 'newDetail', { title, filePath: 'newDetail', newInfo: postData[0] || [], type: newsType })
        } else {
            await ctx.render(mobile ? './mobile/newDetail' : 'newDetail', { title, filePath: 'newDetail', newInfo: [], type: 'group' })
        }
    } catch (error) {
        console.log(error)
        await ctx.render(mobile ? './mobile/newDetail' : 'newDetail', { title, filePath: 'newDetail', newInfo: [], type })
    }
}