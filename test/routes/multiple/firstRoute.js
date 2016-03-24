module.exports = function ($someInjection) {

  this.get('/first-route-gen', function*(next) {
    this.body = 'hello world from gen';
  });

  this.get('/first-route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
  });

  // this.get('/some', async (ctx, next) => {
  //   await next();
  // });

};