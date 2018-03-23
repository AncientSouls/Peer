"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const create_local_transport_1 = require("ancient-channels/lib/create-local-transport");
const peer_1 = require("../lib/peer");
function default_1() {
    describe('Peer:', () => {
        it('connect() / peer.exec() / cursor.exec() / channel.destroy()', () => {
            const peer1 = new peer_1.Peer();
            const peer2 = new peer_1.Peer();
            const localChannel = new peer1.channelsManager.Node();
            peer1.channelsManager.add(localChannel);
            const remoteChannel = new peer1.channelsManager.Node();
            peer2.channelsManager.add(remoteChannel);
            create_local_transport_1.default(localChannel, remoteChannel);
            const channelId = localChannel.id;
            const cursor = new peer1.cursorsManager.Node();
            peer1.cursorsManager.add(cursor);
            cursor.exec({ channelId, apiQuery: null, query: 1 });
            chai_1.assert.equal(cursor.data, 1);
            cursor.exec(_.extend({}, cursor.query, { query: 2 }));
            chai_1.assert.equal(cursor.data, 2);
            peer1.channelsManager.list.nodes[channelId].destroy();
            cursor.exec(_.extend({}, cursor.query, { query: 3 }));
            chai_1.assert.equal(cursor.data, 2);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=peer.js.map