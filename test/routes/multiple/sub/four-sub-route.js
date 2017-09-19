module.exports = function () {

  this.get('/sub/four-sub-route-gen', async (ctx, next) => {
    await next;
    this.body = 'hello world from gen';
  });

  this.get('/sub/four-sub-route-fn', function (ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });

};
