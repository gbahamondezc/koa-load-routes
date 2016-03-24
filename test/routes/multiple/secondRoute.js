module.exports = function ($someInjection) {

  this.get('/second-route-gen', function*(next) {
    this.body = 'hello world from gen';
  });

  this.get('/second-route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
  });

  // this.get('/some', async (ctx, next) => {
  //   await next();
  // });

};