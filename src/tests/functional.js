import { assert } from 'chai';
import crypto from 'crypto';
import sinon from 'sinon';

import { Manager } from 'ancient-channels';
import { Peer } from '../lib/index';
import {
    Cursor,
    ApiManager,
    CursorsManager,
    BundleQueuesManager,
    generateAdapterForBundleQueuesManager
} from 'ancient-cursor';

function generatorString() {
    return crypto.randomBytes(32).toString('hex');
}

export default function () {
    describe('Functional:', () => {
        describe('send():', () => {
            var channelManager = null;
            var channel = null;
            var peer = null;

            beforeEach(() => {
                channelManager = new Manager(null, null, null);
                peer = new Peer(null, null, null, channelManager);
                channel = channelManager.new(sinon.spy());
            });

            it('Send query', () => {
                var query = generatorString();
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
            var bundleQueuesManager = null;
            var channelManager = null;
            var apiManager = null;
            var channel = null;
            var peer = null;

            beforeEach(() => {
                bundleQueuesManager = new BundleQueuesManager();
                channelManager = new Manager(null, null, null);
                apiManager = new ApiManager(null, null);

                peer = new Peer(apiManager, null, bundleQueuesManager, channelManager);
                channel = channelManager.new((channel, pkg) => {
                    channel.handlerIncomingPacket(pkg);
                });
            });

            it('Query is received', () => {
                apiManager.receiveQuery = sinon.spy();
                var query = generatorString();
                peer.sendQuery(channel, query);
                assert.isTrue(apiManager.receiveQuery.calledWith(query));
            });

            it('Bundle is received', () => {
                bundleQueuesManager.executeBundle = sinon.spy();
                var bundle = generatorString();
                peer.sendBundle(channel, bundle);
                assert.isTrue(bundleQueuesManager.executeBundle.calledWith(bundle));
            });
        });

        describe('exec():', () => {
            /* Cursor part */
            var cursorsManager = null;
            var adapterBQM = null;
            var bundleQueuesManager = null;

            /* Channel part */
            var channelManager = null;
            var channel = null;

            /* API part */
            var apiManager = null;

            /* Peer part */
            var query = null;
            var peer = null;
            var apiQuery = null;

            beforeEach(() => {
                /* Generating of the cursor part */
                cursorsManager = new CursorsManager(Cursor);
                adapterBQM = generateAdapterForBundleQueuesManager(cursorsManager);
                bundleQueuesManager = new BundleQueuesManager(adapterBQM.adapter);

                /* Generation of the channel part */
                channelManager = new Manager(null, null, null);
                channel = channelManager.new((channel, pkg) => {
                    channel.handlerIncomingPacket(pkg);
                });

                /* Generation of the API part */
                apiManager = new ApiManager(null, null);
                apiQuery = { api: generatorString() };
                query = { query: generatorString() };

                /* Generation of the peer */
                peer = new Peer(apiManager, cursorsManager, bundleQueuesManager, channelManager);
            });

            it('Create a cursor', () => {
                channel.gotPackage = sinon.spy();
                var cursor = peer.exec(channel, apiQuery, query, false);
                assert.isNull(cursor);

                cursor = peer.exec(channel, apiQuery, query, true);
                assert.equal(cursor.get('channel.id'), channel.id);
                assert.equal(cursor.get('apiQuery'), apiQuery);
                assert.equal(cursor.get('query'), query);
            });

            it('Sending data', () => {
                channel.send = sinon.spy();
                peer.exec(channel, apiQuery, query, false);
                assert.isTrue(channel.send.called);
            });
        });
    });
}