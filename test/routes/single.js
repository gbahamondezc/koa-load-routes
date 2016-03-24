module.exports = function ($someInjection) {

  this.get('/route-gen', function *(next) {
    yield next;
    if ($someInjection) {
      this.status = $someInjection;
    }
    this.body = 'hello world from gen';
  });

  this.get('/route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });

  // this.get('/some', async (ctx, next) => {
  //   await next();
  // });

};
