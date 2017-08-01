# koa-load-routes
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage Status](https://coveralls.io/repos/github/gbahamondez/koa-load-routes/badge.svg?branch=master)](https://coveralls.io/github/gbahamondez/koa-load-routes?branch=master)

[koa@next](https://github.com/koajs/koa/tree/v2.x) middleware to load routes from files and directories using [koa-router@next](https://github.com/alexmingoia/koa-router) module


### Warning
**Node.js 8.0** and **koa@2.0** or latest are requireds  to use this module.


## Installation

```sh
$ npm install --save koa-load-routes
```

## Usage


### Options

path
firstMiddleware
base
args

- *String* **path**
 - Path from where the module will try to load the routes, if is a file,  it will read the routes defined just inside of the file, otherwise, if is a directory, will read all .js files in the directory and load the routes inside each one.

- *Function|AsyncFunction* **firstMiddleware**
  - Middleware will be attached to each route loaded, can be a generator function or a normal function, this middleware will be attached previous to each route, useful for authentication middleware.

- *String* **base**
  - Adds the "base" string at the start of each  loaded route url.

- *Array* **args**
  - Arguments to be pased inside the route main function, each array elements are passed as a independent argument (see examples below).


Loading sync from file or directory
#### app.js
```js
'use strict';

const Koa = require('koa');
const loader = require('koa-load-routes');

var app = new Koa();

/* If path is a directory, loader will read files inside
 * to load routes in each file.
 */

app.use(loader({
  path  : '/routes.js',
  args  : [200, {name : 'somename'}],
  // base : 'api'
}));

app.listen(3000, function() {
  console.log('server started at http://127.0.0.1:3000/');
});

```

#### routes.js (support generator functions even on koa@2.x)
```js
'use strict';

module.exports = function ($status, $body) {

  this.get('/', async (ctx, next) => {
    await next;
    this.status = $status;
    this.body = $body;
  })

  this.get('/hello', function (ctx, next) {
    ctx.body = 'Hello world';
    return next();
  });

  // Routes chain
  this.get('/hello2', function(ctx, next) {
    ctx.body = "hello world 2";
  })
  .get('/hello3', function *(next) {
    this.body = "hello world 3";
  });

  // Multiple middlewares
  this.get('/multiple', function(ctx, next) {
    console.log('im the first one');
    return next();
  },
  (ctx, next) => {
	  this.body = "yey!";
  });
};
```


## License

MIT © [Gonzalo Bahamondez](https://github.com/gbahamondez/)


[npm-image]: https://badge.fury.io/js/koa-load-routes.svg
[npm-url]: https://npmjs.org/package/koa-load-routes
[travis-image]: https://travis-ci.org/gbahamondezc/koa-load-routes.svg?branch=master
[travis-url]: https://travis-ci.org/gbahamondezc/koa-load-routes
[daviddm-image]: https://david-dm.org/gbahamondezc/koa-load-routes.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/gbahamondezc/koa-load-routes
