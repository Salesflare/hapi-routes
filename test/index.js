'use strict';

const Lab = require('@hapi/lab');
const Hapi = require('@hapi/hapi');
const Path = require('path');

const lab = exports.lab = Lab.script();
const { it } = lab;
const { expect, fail } = Lab.assertions;

const testRoutePath = Path.join(__dirname, 'routes/*');
const testRouteNestedPath = Path.join(__dirname, 'routes/**/*');

lab.experiment('With right settings', () => {

    it('Sets up with right config', () => {

        const server = new Hapi.server();

        expect(async () => {

            await server.register({
                plugin: require('../'),
                options: {
                    dir: testRoutePath
                }
            });
        }).to.not.throw();
    });

    it('Adds all the routes in the routes folder to the server', async () => {

        const server = new Hapi.server();

        await server.register({
            plugin: require('../'),
            options: {
                dir: testRoutePath
            }
        });

        expect(server.table().length).to.equal(2);
    });

    it('Adds all the routes in the globbed routes folder to the server (options: glob)', async () => {

        const server = new Hapi.server();

        await server.register({
            plugin: require('../'),
            options: {
                dir: testRouteNestedPath
            }
        });

        expect(server.table().length).to.equal(4);
    });

    it('Does not add anything when RegExp matches no files', async () => {

        const server = new Hapi.server();

        await server.register({
            plugin: require('../'),
            options: {
                dir: testRoutePath,
                test: /hello world/
            }
        });

        expect(server.table().length).to.equal(0);
    });

    it('Returns a 404 on invalid route', async () => {

        const server = new Hapi.server();

        await server.register({
            plugin: require('../'),
            options: {
                dir: testRoutePath
            }
        });

        const response = await server.inject({
            method: 'GET',
            url: '/404'
        });

        expect(response.statusCode, 'status code').to.equal(404);
    });
});

lab.experiment('With wrong settings', () => {

    it('Returns an error on invalid dir option', async () => {

        const server = new Hapi.server();

        try {
            await server.register({
                plugin: require('../'),
                options: {
                    dir: Path.join(__dirname, 'invalid')
                }
            });
        }
        catch (err) {
            expect(err).to.exist();
            expect(err.message).to.include(Path.join(__dirname, 'invalid'));
            return;
        }

        fail('Should have thrown an error');
    });
});
