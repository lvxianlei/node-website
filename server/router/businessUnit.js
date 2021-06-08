const { query, urlFormat } = require('../util/query')
const title = '欧昊集团';
module.exports = async (ctx, next) => {
    const allTypesSQL = `SELECT * FROM business_plate WHERE status = 1 ORDER BY pos`
    try {
        const allTypes = await query(allTypesSQL)
        const postAllTypes = allTypes.map(item => ({ ...item, mobile_pic_url: urlFormat(item.mobile_pic_url) }))
        await ctx.render('./mobile/businessUnit', { title, filePath: 'businessUnit', allTypes: postAllTypes })
    } catch (error) {
        await ctx.render('./mobile/businessUnit', { title, filePath: 'businessUnit', allTypes: [] })
    }
}