'use strict';

var Lab = require('lab');
var Code = require('code');
var Hapi = require('hapi');

var lab = exports.lab = Lab.script();
var it = lab.it;
var expect = Code.expect;



lab.experiment('With right settings', function () {
	var server = new Hapi.Server();

	lab.before(function (done) {
		server.connection();

		server.register({
			register: require('../'),
			options: {dir: 'test/routes'}
		}, function (err) {
			expect(err).to.not.exist();

			done();
		});
	});

	it('Adds all the routes in the routes folder to the server', function (done) {
		server.inject({
			method: 'GET',
			url: '/1'
		}, function (response) {
			expect(response.statusCode, 'status code').to.equal(200);
			expect(response.result, 'result').to.equal('Hello 1');

			server.inject({
				method: 'GET',
				url: '/2'
			}, function (response) {
				expect(response.statusCode, 'status code').to.equal(200);
				expect(response.result, 'result').to.equal('Hello 2');

				done();
			});
		});
	});

	it('Returns a 404 on invalid route', function (done) {
		server.inject({
			method: 'GET',
			url: '/404'
		}, function (response) {
			expect(response.statusCode, 'status code').to.equal(404);

			done();
		});
	});
});

lab.experiment('With wrong settings', function () {
	var server = new Hapi.Server();

	it('Returns an error on invalid dir option', function (done) {
		server.connection();

		server.register({
			register: require('../'),
			options: {dir: 'test/invalid'}
		}, function (err) {
			expect(err).to.exist();

			done();
		});
	});
});
