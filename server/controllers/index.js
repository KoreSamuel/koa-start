module.exports = async ctx => {
    const title = 'this is home';
    await ctx.render('index', {
        title
    });
};