const { query, isMobile } = require('../util/query')
const moment = require('moment')
const title = '欧昊集团';
const limit = 5
module.exports.joinUs = async (ctx, next) => {
    const mobile = isMobile(ctx.request.get('user-agent'))
    const groupInfoSQL = `SELECT * FROM recruitment WHERE status = 1 LIMIT 0, ${limit}`
    try {
        const work = await query(groupInfoSQL)
        const workList = work.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY.MM.DD") }))
        await ctx.render(mobile ? './mobile/joinUs' : 'joinUs', { title, filePath: 'joinUs', workList: workList })
    } catch (error) {
        await ctx.render(mobile ? './mobile/joinUs' : 'joinUs', { title, filePath: 'joinUs', workList: [] })
    }
}

module.exports.postJoinUsPage = async (ctx, next) => {
    const { current, type } = ctx.request.body
    if (current <= 0) {
        ctx.body = []
        return
    }
    const joinUsPageSQL = `SELECT * FROM recruitment WHERE status = 1 LIMIT ${(current - 1) * limit},${limit}`
    try {
        const work = await query(joinUsPageSQL)
        const workList = work.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY.MM.DD") }))
        ctx.body = workList
    } catch (error) {
        ctx.body = []
    }
}

module.exports.joinUsDetail = async (ctx, next) => {
    const workSQL = `SELECT * FROM recruitment WHERE status=1 AND id = '${ctx.params.id}'`
    try {
        const workItem = await query(workSQL)
        const postWorkItem = workItem.map(item => ({ ...item, publish_time: moment(item.publish_time).format("YYYY.MM.DD") }))
        await ctx.render('joinUsDetail', { title, filePath: 'joinUsDetail', workItem: postWorkItem[0] })
    } catch (error) {
        await ctx.render('joinUsDetail', { title, filePath: 'joinUsDetail', workItem: {} })
    }
}