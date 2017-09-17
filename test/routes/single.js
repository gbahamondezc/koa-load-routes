module.exports = function ($status, $body) {

  this.get('/route-gen', async (ctx, next) => {
    await next;
    if ($status) {
      ctx.status = $status;
    }
    if ($body) {
      ctx.body = $body;
    }
    else {
      ctx.body = 'hello world';
    }
  });

  this.get('/route-fn', (ctx, next) => {
    ctx.body = 'hello world from normal';
    return next();
  });
};
