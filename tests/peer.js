"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const chai_1 = require("chai");
const peer_1 = require("../lib/peer");
function default_1() {
    describe('Peer:', () => {
        it('connect() / peer.exec() / cursor.exec() / channel.destroy()', () => {
            const peer1 = new peer_1.Peer();
            const peer2 = new peer_1.Peer();
            const channelId = peer1.connect(peer2);
            const cursor = peer1.exec(channelId, null, 1);
            chai_1.assert.equal(cursor.data, 1);
            cursor.exec(_.extend({}, cursor.query, { query: 2 }));
            chai_1.assert.equal(cursor.data, 2);
            peer1.channelsManager.nodes[channelId].destroy();
            cursor.exec(_.extend({}, cursor.query, { query: 3 }));
            chai_1.assert.equal(cursor.data, 2);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=peer.js.map