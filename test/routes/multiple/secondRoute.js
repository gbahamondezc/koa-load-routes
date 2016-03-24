module.exports = function () {

  this.get('/second-route-gen', function*(next) {
    yield next;
    this.body = 'hello world from gen';
  });

  this.get('/second-route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });

  // this.get('/some', async (ctx, next) => {
  //   await next();
  // });

};
