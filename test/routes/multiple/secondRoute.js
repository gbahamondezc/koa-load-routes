module.exports = function () {
  this.get('/second-route-gen', async (ctx, next) => {
    await next;
    ctx.body = 'hello world from gen';
  });

  this.get('/second-route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });
};
