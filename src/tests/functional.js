import { assert } from 'chai';
import crypto from 'crypto';
import sinon from 'sinon';

import { ApiManager, BundleQueuesManager } from 'ancient-cursor';
import { Manager } from 'ancient-channels';
import { Peer } from '../lib/index';

/**
 * @description Generating a random string.
 */
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
            var apiManager = null;
            var channelManager = null;
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
            it('Create cursor');
            it('API processing');
            it('Query processing');
            it('Callback processing');
        });
    });
}