const { query, urlFormat } = require('../util/query')
const title = '欧昊集团';
module.exports = async (ctx, next) => {
    "use strict";
    const executiveSQL = "SELECT * FROM executive WHERE status=1 order by pos"
    try {
        const executive = await query(executiveSQL)
        const postExecutive = executive.map(item => ({ ...item, mobile_pic_url: urlFormat(item.mobile_pic_url) }))
        await ctx.render('./mobile/leader', { title, filePath: 'leader', executive: postExecutive })
    } catch (error) {
        console.log(error)
        await ctx.render('./mobile/leader', { title, filePath: 'leader', executive: [] })
    }
}