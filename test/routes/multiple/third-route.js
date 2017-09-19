module.exports = function () {

  this.get('/third-route-gen', async (ctx, next) => {
    await next;
    ctx.body = 'hello world from gen';
  });

  this.get('/third-route-fn', function (ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });
};
