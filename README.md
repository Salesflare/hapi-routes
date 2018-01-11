# Hapi Routes [![Build Status](https://travis-ci.org/Salesflare/hapi-routes.svg)](https://travis-ci.org/Salesflare/hapi-routes)
hapi plugin for registering routes

## What
Hapi Routes allows you to put all your routing logic in different files in a specified folder.
This allows you to have a clear overview of your routes.

## How
### server.js
```javascript
const server = new Hapi.server();

await server.register({
  plugin: require('hapi-routes'),
  options: {
    dir: `${__dirname}/test/routes/*`,
  },
});
```

`options` take the following arguments:
```
{
  dir: String,  // (Required): Relative path where to search for route files.
                               Requires a globable path: 'routes/*', 'routes/**/*.js', etc
  test: RegExp, // (Optional): Regular expression for matching files, defaults to /\.(js)$/
}
```
In the example the routes are located in `test/routes` relative to the `server.js` module.

Hapi Routes requires that your route files have a `routes` method exported:

### test/routes/example.js
```javascript
const routes = [{
  method: 'GET',
  path: '/',
  handler: (request, reply) => reply('Hello world'),
}];

exports.routes = server => server.route(routes);
```
