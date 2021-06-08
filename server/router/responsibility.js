const { query, dateFormat, urlFormat } = require('../util/query')
const title = '欧昊集团';
const limit = 3;
module.exports = async (ctx, next) => {
    const partygovernmentSQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%partygovernment%' ORDER BY a.publish_time desc LIMIT 0, 3`
    const partygovernmentPagesSQL = `SELECT count(*) FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%partygovernment%'`
    const publicserviceSQL = `SELECT b.*,a.* FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%publicservice%' ORDER BY a.publish_time desc LIMIT 0, 3`
    const publicservicePagesSQL = `SELECT count(*) FROM article a INNER JOIN banner b ON a.banner_id = b.id WHERE b.STATUS = 1 and a.type LIKE '%publicservice%'`
    try {
        const partygovernment = await query(partygovernmentSQL)
        const partygovernmentPages = await query(partygovernmentPagesSQL)
        const publicservice = await query(publicserviceSQL)
        const publicservicePages = await query(publicservicePagesSQL)
        const postPartygovernmentData = partygovernment.map(item => ({ ...item, publish_time: dateFormat(item.publish_time), cover_pic_url: urlFormat(item.cover_pic_url) }))
        const postpublicserviceData = publicservice.map(item => ({ ...item, publish_time: dateFormat(item.publish_time), cover_pic_url: urlFormat(item.cover_pic_url) }))
        await ctx.render('responsibility', {
            title,
            filePath: 'responsibility',
            partygovernment: {
                pages: Math.ceil(partygovernmentPages[0]['count(*)'] / limit),
                list: postPartygovernmentData
            },
            publicservice: {
                pages: Math.ceil(publicservicePages[0]['count(*)'] / limit),
                list: postpublicserviceData
            }
        })
    } catch (error) {
        await ctx.render('responsibility', {
            title,
            filePath: 'responsibility',
            partygovernment: {
                pages: 1,
                list: []
            },
            publicservice: {
                pages: 1,
                list: []
            }
        })
    }
}