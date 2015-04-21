'use strict';

var routes = [
    {
        method: '*',
        path: '/2',
        handler: function (request, reply) {

            return reply('Hello 2');
        }
    }
];

var labels = [];

exports.routes = function (server) {

    server.select(labels).route(routes);
};
