import { assert } from 'chai';
import crypto from 'crypto';

import { ApiManager, BundleQueuesManager, Cursor, CursorsManager, generateAdapterForBundleQueuesManager } from 'ancient-cursor';
import { Channel, ChannelsManager } from 'ancient-channels';

import { Peer } from '../lib/index';

export default function () {
    it('Simple test', (done) => {
        /* Cursors Manager */
        var cursorsManager = new CursorsManager(Cursor);
        var bundleQueuesManager = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cursorsManager).adapters);

        /* Channels Manager */
        var channelsManager = new ChannelsManager(Channel,
            function onConnected(channel) {},
            function onDisconnected(channel) {},
            function gotPackage(channel, pkg) {}
        );

        /* API Manager */
        var apiManager = new ApiManager(
            function adapterFindApi(apiQuery) {
                return new Promise((resolve) => resolve({
                    receiveQuery(channel, query, cursorId, sendBundles) {
                        setTimeout(() => {
                            sendBundles(channel, {
                                cursor: cursorId,
                                type: 'set',
                                path: query.path,
                                value: apiQuery.data
                            });
                        }, 50);
                    }
                }));
            }
        );

        /* Peers */
        var peer_1 = new Peer(apiManager, bundleQueuesManager, channelsManager, cursorsManager);
        var peer_2 = peer_1.new(apiManager, bundleQueuesManager, channelsManager, cursorsManager);
        
        apiManager._adapterSend = apiManager.adapterSend;
        
        /* Communication channel */
        var channel = peer_1.connect(peer_2);

        /* Variables */
        var api = { data: crypto.randomBytes(20).toString('hex') };
        var query = { path: 'a.b.c' };

        /* Cursor */
        var cursor = peer_1.exec(channel, api, query);

        /* Receiving data */
        cursor.on(null, () => {
            assert.equal(cursor.get(query.path), api.data);
            done();
        });
    });
    it('Multiple bundles', (done) => {
        /* Cursors Manager */
        var cursorsManager = new CursorsManager(Cursor);
        var bundleQueuesManager = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cursorsManager).adapters);

        /* Channels Manager */
        var channelsManager = new ChannelsManager(Channel,
            function onConnected(channel) {},
            function onDisconnected(channel) {},
            function gotPackage(channel, pkg) {}
        );

        /* API Manager */
        var apiManager = new ApiManager(
            function adapterFindApi(apiQuery) {
                return new Promise((resolve) => resolve({
                    receiveQuery(channel, query, cursorId, sendBundles) {
                        setTimeout(() => {
                            sendBundles(channel, {
                                cursor: cursorId,
                                type: 'set',
                                path: 'a',
                                value: a,
                            }, {
                                cursor: cursorId,
                                type: 'set',
                                path: 'b',
                                value: b,
                            });
                        }, 50);
                    }
                }));
            }
        );

        /* Peers */
        var peer_1 = new Peer(apiManager, bundleQueuesManager, channelsManager, cursorsManager);
        var peer_2 = peer_1.new(apiManager, bundleQueuesManager, channelsManager, cursorsManager);

        /* Communication channel */
        var channel = peer_1.connect(peer_2);

        /* Variables */
        var a = crypto.randomBytes(20).toString('hex');
        var b = crypto.randomBytes(20).toString('hex');

        /* Cursor */
        var cursor = peer_1.exec(channel, null, null);

        /* Receiving data */
        var counter = 0;
        cursor.on(null, () => {
            counter++;
            if (counter == 1) {
                assert.deepEqual(cursor.get(), { a });  
            } else if (counter == 2) {
                assert.deepEqual(cursor.get(), { a, b });
                done();
            }
        });
    });
}