module.exports = function () {

  this.get('/first-route-gen', async (ctx, next) => {
    await next;
    ctx.body = 'hello world from gen';
  });

  this.get('/first-route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });
};
