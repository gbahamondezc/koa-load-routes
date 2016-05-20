module.exports = function ($status, $body) {

  this.get('/route-gen', function *(next) {
    yield next;
    if ($status) {
      this.status = $status;
    }
    if ($body) {
      this.body = $body;
    } else {
      this.body = 'hello world';
    }
  });

  this.get('/route-fn', function(ctx, next) {
    ctx.body = 'hello world from normal';
    return next();
  });

  // this.get('/some', async (ctx, next) => {
  //   await next();
  // });

};
