# koa-load-routes
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/github/gbahamondez/koa-load-routes/badge.svg?branch=master)](https://coveralls.io/github/gbahamondez/koa-load-routes?branch=master)
> [koa@2.x](https://github.com/koajs/koa/tree/v2.x) routes loader from file or directory using [koa-router](https://github.com/alexmingoia/koa-router) module

### Warning
**Node.js 4.0** and **koa@2.x** or latest are requireds  to use this module.


## Installation

```sh
$ npm install --save koa-load-routes
```

## Usage

Loading sync from file or directory
#### app.js
```js
const Koa = require('koa');
const loader = require('koa-load-routes');

/* If path is directory, loader will read files from dir
 * recursive and load routes in each file.
 */
var app = loader(new Koa(), {
  path  : '/routes.js',
  args  : [200, {name : 'somename'}]
});

app.listen(3000, function() {
  console.log('server started at http://127.0.0.1:3000/');
});

```

#### routes.js (support generator functions even on koa@2.x)
```js
'use strict';

module.exports = function ($status, $body) {

  this.get('/', function *(next) {
    yield next;
    this.status = $status;
    this.body = $body;
  })

  this.get('/hello', function (ctx, next) {
    ctx.body = 'Hello world';
    return next();
  });

};
```

Async way
```js
const Koa = require('koa');
const loader = require('koa-load-routes');

var loadPromise = loader(new Koa(), {
  async : true,
  path  : '/routes.js',
  args  : [200, {name : 'somename'}]
});

loadPromise
  .then(function(app) {
    app.listen(3000, function() {
      console.log('server started at http://127.0.0.1:3000/');
    });
  })
  .catch(function(err) {
    console.log(err.stack || err);
  });
```

## License

MIT © [Gonzalo Bahamondez](https://github.com/gbahamondez/)


[npm-image]: https://badge.fury.io/js/koa-load-routes.svg
[npm-url]: https://npmjs.org/package/koa-load-routes
[travis-image]: https://travis-ci.org/gbahamondez/koa-load-routes.svg?branch=master
[travis-url]: https://travis-ci.org/gbahamondez/koa-load-routes
[daviddm-image]: https://david-dm.org/gbahamondez/koa-load-routes.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gbahamondez/koa-load-routes