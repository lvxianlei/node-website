const { query, urlFormat, isMobile } = require('../util/query')
const title = '欧昊集团';
module.exports = async (ctx, next) => {
    const mobile = isMobile(ctx.request.get('user-agent'))
    const { type } = ctx.params
    const showTypeSQL = `SELECT show_type FROM business_plate WHERE type = "${type}"`
    const allTypesSQL = `SELECT * FROM business_plate WHERE status = 1  ORDER BY pos`
    const businessSQL = `SELECT b.*, a.show_type FROM business_plate a, plate_picture b WHERE a.type = "${type}" AND a.id = b.business_plate_id AND a.status = 1 AND b.status = 1 ORDER BY b.pos`
    const platePartSQL = `SELECT b.*, a.show_type FROM business_plate a, plate_sub_part b WHERE a.type = "${type}" AND a.id = b.business_plate_id AND a.status = 1 AND b.status = 1 ORDER BY b.pos`
    try {
        const showType = await query(showTypeSQL)
        const business = await query(businessSQL)
        const platePart = await query(platePartSQL)
        const postBusiness = business.map(item => ({
            ...item,
            background_pic_url: urlFormat(item.background_pic_url),
            mobile_background_pic_url: urlFormat(item.mobile_background_pic_url),
            mask_logo_url: urlFormat(item.mask_logo_url),
            background_href_pic_url: urlFormat(item.background_href_pic_url),
            mask_bottom_pic_url: urlFormat(item.mask_bottom_pic_url),
            mask_logo_url: urlFormat(item.mask_logo_url),
            background_logo_url: urlFormat(item.background_logo_url),
        }))
        const postPlatePart = platePart.map(item => ({
            ...item,
            pic_url: urlFormat(item.pic_url),
            mobile_pic_url: urlFormat(item.mobile_pic_url)
        }))
        if (mobile) {
            if (type === 'roomPin') {
                await ctx.render('./mobile/roomPin', { title, filePath: 'roomPin', type, showType: showType[0].show_type, business: postBusiness, platePart: postPlatePart })
            } else {
                await ctx.render('./mobile/business', { title, filePath: 'business', type, showType: showType[0].show_type, business: postBusiness, platePart: postPlatePart })
            }
        } else {
            const allTypes = await query(allTypesSQL)
            await ctx.render('business', { title, filePath: 'business', type, showType: showType[0].show_type, allTypes, business: postBusiness, platePart: postPlatePart })
        }
    } catch (error) {
        if (mobile) {
            await ctx.render('./mobile/business', { title, filePath: 'business', type, showType: 1, business: [], platePart: [] })
        } else {
            await ctx.render('business', { title, filePath: 'business', type, showType: 1, allTypes: [], business: [], platePart: [] })
        }
    }
}