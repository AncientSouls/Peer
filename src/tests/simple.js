import { Channel, ChannelsManager } from 'ancient-channels';
import { Peer } from '../lib/index';
import {
    ApiManager,
    BundleQueuesManager,
    Cursor,
    CursorsManager,
    generateAdapterForBundleQueuesManager
}
from 'ancient-cursor';

export default function () {
    it('Simple test', (done) => {
        /* General manager of cursors */
        var cursorsManager = new CursorsManager(Cursor);

        /* Adapters for the cursor manager */
        var bundleQueuesManager = new BundleQueuesManager(...generateAdapterForBundleQueuesManager(cursorsManager).adapters);

        /* First channel manager */
        var channelsManager_1 = new ChannelsManager(
            Channel,
            function onConnected(channel) {},
            function onDisconnected(channel) {},
            function gotPackage(channel, pkg) {
                peer_1.got(channel, pkg);
            }
        );

        /* Second channel manager */
        var channelsManager_2 = new ChannelsManager(
            Channel,
            function onConnected(channel) {
                channel.connect(true);
            },
            function onDisconnected(channel) {},
            function gotPackage(channel, pkg) {
                peer_2.got(channel, pkg);
            }
        );

        /* First channel */
        var channel_1 = channelsManager_1.new(
            function sendPackage(channel, pkg) {
                channel_2.got(pkg);
            }
        );

        /* Second channel */
        var channel_2 = channelsManager_2.new(
            function sendPackage(channel, pkg) {
                channel_1.got(pkg);
            }
        );

        /* Synchronization of channels */
        channel_1.connect(true);

        /* API Manager */
        var apiManager = new ApiManager(
            function adapterFindApi(apiQuery) {
                return new Promise((resolve) => resolve({
                    receiveQuery(channel, query, cursorId, sendBundles) {
                        var i = 1;
                        var timerId = setInterval(() => {
                            if (i >= 5) {
                                clearInterval(timerId);
                            }

                            var bundles = {
                                cursor: cursorId,
                                type: 'set',
                                path: query.path,
                                value: { timer: i++ }
                            };

                            sendBundles(channel, bundles);
                        }, 150);
                    }
                }));
            }
        );

        /* First peer */
        var peer_1 = new Peer(
            apiManager,
            bundleQueuesManager,
            channelsManager_1,
            cursorsManager
        );

        /* Second peer */
        var peer_2 = new Peer(
            apiManager,
            bundleQueuesManager,
            channelsManager_2,
            cursorsManager
        );

        /* Create API and query */
        var query = { path: 'a.b.c' };
        var api = null;

        /* Create a cursor */
        var cursor = peer_1.exec(channel_1, api, query);

        /* Tracking changes */
        cursor.on(null, () => {
            if (cursor.get(query.path).timer >= 5) {
                done();
            }
        });
    });
}