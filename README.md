# Hapi Routes [![Build Status](https://travis-ci.org/Salesflare/hapi-routes.svg)](https://travis-ci.org/Salesflare/hapi-routes)
Hapi plugin for registering routes

## What
Hapi Routes alows you to put all your routing logic in different files in a specified folder.
This allows you to have a clear overview of your routes. 

## How

```javascript
var server = new Hapi.Server();

server.connection();

server.register({
  register: require('hapi-routes'),
  options: {dir: 'test/routes'}
}, function (err) {
  // continue application
});
```

The `options` take 1 argument atm and that is `dir` which is a relative path starting from the root of your project.
In the example the `test` folder is directly beneath the `hapi-routes` folder, which is the root of this project.

Hapi Routes requires that your route files have a `routes` method exported.
```javascript
var routes = [
{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    return reply('Hello world');
    }
  }
];

exports.routes = function (server) {
  server.route(routes);
};
```