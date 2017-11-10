import { assert } from 'chai';
import crypto from 'crypto';
import sinon from 'sinon';

import { Channel, ChannelsManager } from 'ancient-channels';
import { Peer } from '../lib/index';
import {
    ApiManager,
    BundleQueuesManager,
    Cursor,
    CursorsManager,
    generateAdapterForBundleQueuesManager
} from 'ancient-cursor';

function generatorString() {
    return crypto.randomBytes(32).toString('hex');
}

export default function () {
    describe('Functional:', () => {
        describe('send():', () => {
            var channel = null;
            var channelsManager = null;
            var peer = null;

            beforeEach(() => {
                channelsManager = new ChannelsManager(Channel, null, null, null);
                peer = new Peer(null, null, channelsManager, null);
                channel = channelsManager.new(sinon.spy());
            });

            it('Send query', () => {
                var query = [generatorString()];
                peer.sendQuery(channel, query);
                assert.isTrue(channel.sendPackage.called);
            });

            it('Send bundle', () => {
                var bundle = generatorString();
                peer.sendBundle(channel, bundle);
                assert.isTrue(channel.sendPackage.called);
            });
        });

        describe('received():', () => {
            var apiManager = null;
            var bundleQueuesManager = null;
            var channel = null;
            var channelsManager = null;
            var peer = null;
            var query = null;

            beforeEach(() => {
                /* Channel part */
                channelsManager = new ChannelsManager(Channel, null, null, sinon.spy());
                channel = channelsManager.new((channel, pkg) => {
                    channel.got(pkg);
                });

                /* Bundle part */
                bundleQueuesManager = new BundleQueuesManager();
                bundleQueuesManager.executeBundle = sinon.spy();

                /* API part */
                apiManager = new ApiManager(null, null);
                apiManager.receiveQuery = sinon.spy();

                /* Peer part */
                peer = new Peer(apiManager, bundleQueuesManager, channelsManager, null);
                channel.gotPackage = (channel, pkg) => {
                    peer.gotPackage(channel, pkg);
                };

                query = {
                    api: generatorString(),
                    cursorId: generatorString(),
                    query: generatorString()
                };
            });

            it('Query is received', () => {
                peer.sendQuery(channel, query);
                var args = apiManager.receiveQuery.args.shift();
                assert.equal(args[1], query.api);
                assert.equal(args[2], query.query);
                assert.equal(args[3], query.cursorId);
            });

            it('Bundle is received', () => {
                peer.sendBundle(channel, query);
                assert.isTrue(bundleQueuesManager.executeBundle.calledWith(query));
            });
        });

        describe('exec():', () => {
            /* Cursor part */
            var adapterBQM = null;
            var bundleQueuesManager = null;
            var cursor = null;
            var cursorsManager = null;

            /* Channel part */
            var channelsManager = null;
            var channel = null;

            /* API part */
            var apiManager = null;

            /* Peer part */
            var peer = null;
            var data = null;

            beforeEach(() => {
                /* Generating of the cursor part */
                cursorsManager = new CursorsManager(Cursor);
                adapterBQM = generateAdapterForBundleQueuesManager(cursorsManager);
                bundleQueuesManager = new BundleQueuesManager(adapterBQM.adapter);

                /* Generation of the channel part */
                channelsManager = new ChannelsManager(Channel, null, null, null);
                channel = channelsManager.new(sinon.spy());

                /* Generation of the API part */
                apiManager = new ApiManager(null, null);
                data = generatorString();

                /* Generation of the peer */
                peer = new Peer(apiManager, bundleQueuesManager, channelsManager, cursorsManager);
            });

            it('Create a cursor', () => {
                cursor = peer.exec(channel, { data }, { data }, false);
                assert.isNull(cursor);
                cursor = peer.exec(channel, { data }, { data }, true);
                assert.isObject(cursor);
            });

            it('Sending data', () => {
                peer.exec(channel, { data }, { data }, false);
                assert.isTrue(channel.sendPackage.called);
            });
        });
    });
}