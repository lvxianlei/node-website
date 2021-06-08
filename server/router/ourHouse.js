const { query, isMobile, urlFormat } = require('../util/query')
const title = '欧昊集团';
const ossURL = 'https://ouhao-website.oss-cn-beijing.aliyuncs.com/'
const moment = require('moment')
module.exports = async (ctx, next) => {
    const mobile = isMobile(ctx.request.get('user-agent'))
    const groupInfoSQL = "SELECT * FROM group_info WHERE status=1"
    const executiveSQL = "SELECT * FROM executive WHERE status=1 order by pos"
    const bigEventSQL = "SELECT * FROM big_event WHERE status=1 order by publish_time desc"
    try {
        const groupInfo = await query(groupInfoSQL)
        const bigEvent = await query(bigEventSQL)
        const postGroupInfo = groupInfo.map(item => ({
            ...item,
            create_time: moment(item.publish_time).format("YYYY-MM-DD"),
            pic_url: urlFormat(item.pic_url),
            mobile_pic_url: urlFormat(item.mobile_pic_url),
        }))
        const formatBigEvent = bigEvent.map(item => ({
            ...item,
            create_time: moment(item.create_time).format("YYYY-MM-DD"),
            publish_time: moment(item.publish_time).format("YYYY-MM-DD"),
        }))
        const postBigEventGroupByYear = new Map();
        for (var i = 0; i < formatBigEvent.length; i++) {
            var o = formatBigEvent[i];
            var year = o.publish_time.substring(0, 4);
            var bigEventArray = postBigEventGroupByYear.get(year);
            if (!bigEventArray) {
                bigEventArray = new Array();
                postBigEventGroupByYear.set(year, bigEventArray);
            }
            bigEventArray.push(o);
        }
        if (mobile) {
            await ctx.render('./mobile/ourHouse', { title, filePath: 'ourHouse', groupInfo: postGroupInfo[0] || [], bigEvent: postBigEventGroupByYear })
        } else {
            const executive = await query(executiveSQL)
            const postExecutive = executive.map(item => ({ ...item, pic_url: ossURL + item.pic_url }))
            await ctx.render('ourHouse', { title, filePath: 'ourHouse', executive: postExecutive, groupInfo: postGroupInfo[0] || [], bigEvent: postBigEventGroupByYear })
        }
    } catch (error) {
        if (mobile) {
            await ctx.render('ourHouse', { title, filePath: 'ourHouse', groupInfo: [], bigEvent: [] })
        } else {
            await ctx.render('ourHouse', { title, filePath: 'ourHouse', executive: [], groupInfo: [], bigEvent: [] })
        }
    }
}