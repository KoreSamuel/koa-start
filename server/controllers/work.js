module.exports = {
    async indexPage(ctx) {
        if (ctx.session && ctx.session.isLogin && ctx.session.userName) {
            const title = 'work page';
            await ctx.render('work', {
                title
            })
        } else {
            ctx.redirect('/error')
        }
    }
}