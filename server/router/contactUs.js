const title = '欧昊集团';
module.exports = async (ctx, next) => {
    await ctx.render('contactUs', { title, filePath: 'contactUs' })
}